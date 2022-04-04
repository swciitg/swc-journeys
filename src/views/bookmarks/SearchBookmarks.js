/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { get } from '../../utilities/util'
import {
  CRow,
} from '@coreui/react'
import BookmarkCard from '../../components/BookmarkCard'

const Bookmarks = () => {
  console.log(document.getElementById("searchKey").value)
  const apiURL = "bookmarksection/bookmarkApi/search/?search=" + document.getElementById("searchKey").value;
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    get(apiURL).then(res => {
      setBookmarks(res.results);
    })
  }, [apiURL]);

  return (<>
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 4 }}>
      {bookmarks && bookmarks.map((book, index) => (
        <div key={book.id} style={{ marginTop: '35px' }}>
          <BookmarkCard book={book} />
        </div>
      ))}
    </CRow>
  </>);
}

export default Bookmarks;