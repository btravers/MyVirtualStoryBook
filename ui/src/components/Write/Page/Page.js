import React from 'react'
import { Content } from '../../App'
import styles from './styles.scss'
import PageInformation from './PageInformation'

const Page = ({query, page, updateResource}) => {
    const { bookId } = query
    return !page ? null :
    (
     <Content title="Edition de page" >
       <div className={ styles.row }>
         <PageInformation page={ page } updateResource={ updateResource } />
         <PageEffect bookId={ bookId } page={ page } updateResource={ updateResource }/>
      </div>
    </Content>
  )
}

export default Page
