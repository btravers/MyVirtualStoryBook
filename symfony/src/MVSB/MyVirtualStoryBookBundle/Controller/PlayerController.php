<?php

namespace MVSB\MyVirtualStoryBookBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class PlayerController extends MVSBController
{
    /**
     * @Post("/players")
     */
    public function createPlayerAction(Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $playerService = $this->get('mvsb.player.service');
        
        
        $json = $request->getContent();
        $player = $serializer->deserialize($json, 'MVSB\MyVirtualStoryBookBundle\Entity\Player', 'json');
        
        $playerService->addNewPlayer($player);
        
        return new Response('',Response::HTTP_NO_CONTENT);
    }
    
    /**
     * @Get("/players/{username}")
     */
    public function getPlayerByNameAction(Request $request, $username)
    {
        $playerService = $this->get('mvsb.player.service');
        $player = $playerService->getPlayerByUsername($username);

        return $this->serializeAndBuildSONResponse($player,Response::HTTP_OK);
    }
    
    /**
     * @Get("/players/{username}/books")
     */
    public function getPlayerDraftAction(Request $request, $username)
    {
        $playerService = $this->get('mvsb.player.service');
        $books = $playerService->getPlayerBooks($username);

        return $this->serializeAndBuildSONResponse($books,Response::HTTP_OK);
    }
    
    /**
     * @Post("/players/{username}/books")
     */
    public function createNewBookAction(Request $request, $username)
    {
        $playerService = $this->get('mvsb.player.service');
        $player = $playerService->createNewBook($username);

        return $this->serializeAndBuildSONResponse($player,Response::HTTP_CREATED);
    }
}