/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { get } from '../../utilities/util'
import {
  CRow,
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import BookmarkCard from '../../components/BookmarkCard'

const Favorites = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(2)
  const apiURL = "bookmarksection/bookmarkApi/favorites/?page=" + page.toString();
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    get(apiURL).then(res => {
      setBookmarks(res.results);
      setCount(Math.floor(res.count / 12) + 1);
    })
  }, [apiURL]);

  var pages = []

  for (var i = 1; i <= count; i++) {
    pages.push(i);
  }
  return (<>

    {bookmarks != null ? (<><CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 4 }}>
      {bookmarks && bookmarks.map((book, index) => (
        <div key={book.id} style={{ marginTop: '35px' }}>
          <BookmarkCard book={book} />
        </div>
      ))}
    </CRow>
      <CPagination aria-label="Page navigation example" style={{ marginTop: '20px' }}>
        <div >
          {page <= 1 ? (<CPaginationItem aria-label="Previous" disabled>
            <span aria-hidden="true" >&laquo;</span>
          </CPaginationItem>) : (<CPaginationItem aria-label="Previous" onClick={() => setPage(page - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>)}
        </div>
        {pages && pages.map((i, index) => (
          <div key={i} >
            {i == page ? (<CPaginationItem style={{ backgroundColor: "#005b54", color: "white" }}>{i}</CPaginationItem>) : (<CPaginationItem onClick={() => setPage(i)}>{i}</CPaginationItem>)}
          </div>
        ))}
        <div >
          {
            page >= count ? (<CPaginationItem aria-label="Next" disabled>
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>) : (<CPaginationItem aria-label="Next" onClick={() => setPage(page + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>)
          }
        </div>
      </CPagination>
    </>) : <CSpinner className='spinner' />}
  </>);
}

export default Favorites;