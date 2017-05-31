import React from 'react'
import { Link } from 'react-router'
import { BookGenre, Button } from '../../../../common'

const DraftRow = ({ draft = {}, deleteResource }) => {
  const onDelete = () => deleteResource(draft._id)
  return (
    <tr>
      <td>
        {draft.name}
      </td>
      <td>
        <BookGenre genre={draft.genreId} />
      </td>
      <td>
        <h4 className="label label-danger md-whiteframe-z1">
          <i className="fa fa-pencil" style={{ marginRight: '5px' }} />
          Brouillon
        </h4>
      </td>
      <td>
        {draft.synopsis}
      </td>
      <td>
        <Link to={`/app/write/book/${draft._id}`}>
          <Button className="md-whiteframe-z1">Editer</Button>
        </Link>
      </td>
      <td>
        <Button className="fa fa-close md-whiteframe-z1" domProps={{ onClick: onDelete }} />
      </td>
    </tr>
  )
}

export default DraftRow