/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import CIcon from '@coreui/icons-react'
import { post, del } from '../utilities/util'
import {
  cilExternalLink,
  cilBookmark
} from '@coreui/icons'
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardFooter,
  CCardText,
  CCardTitle,
  CCol,
  CSpinner,
} from '@coreui/react'

const bookmarkApiURL = "bookmarksection/bookmarkApi/";

const ExploreBookmarkCard = ({ book }) => {
  const [isBookmark, setIsBookmark] = useState(book.favorite)
  const [posting, setPosting] = useState(false)

  const addToBookmarks = () => {
    const data = { url_field: book.url_field };
    setPosting(true)
    console.log(book.url_field)
    post(bookmarkApiURL, data).then(() => {
      console.log("added new bookmark")
      setIsBookmark(true);
      setPosting(false)
    }
    );
  }

  const removeFromBookmarks = () => {
    del('bookmarksection/bookmarkApi/' + book.id + '/').then(() => {
      console.log("deleted 🤔")
      window.location.reload()
      setIsBookmark(false);
    })
  }

  return (
    <CCol xs>
      <CCard>

        <div className='container' style={{ position: 'relative' }}></div>
        <CCardImage orientation="top" src={book.image_field} style={{ height: '200px', display: 'block' }} />
        {posting ? (<CSpinner size='sm' style={{ position: 'absolute', bottom: 10, right: 10, color: '#005b54' }} />) : (isBookmark ? (
          <CIcon onClick={removeFromBookmarks} icon={cilBookmark} size="lg" style={{ position: 'absolute', bottom: 10, right: 10, color: '#f9b115', cursor: 'pointer', }} />
        ) : (<CIcon onClick={addToBookmarks} icon={cilBookmark} size="lg" style={{ position: 'absolute', bottom: 10, right: 10, color: '#005b54', cursor: 'pointer' }} />
        ))}
        <a href={book.url_field} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
          <CIcon icon={cilExternalLink} size="m" style={{ position: 'absolute', bottom: 10, right: 40, cursor: 'pointer', color: "#005b54" }} />
        </a>
        <CCardBody>
          <CCardTitle style={{
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{book.title_name}</CCardTitle>
          <CCardText style={{
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {book.description}
          </CCardText>
        </CCardBody>
        <CCardFooter style={{ backgroundColor: '#ECF8F3' }}>
          <small className="text-medium-emphasis">Added on {book.date.substring(0, 10)}</small>
        </CCardFooter>
      </CCard>
    </CCol>
  );
};

ExploreBookmarkCard.propTypes = {
  book: PropTypes.object.isRequired
};

export default ExploreBookmarkCard;
