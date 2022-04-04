/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { get, del } from '../utilities/util'
import {
  CWidgetStatsB,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {

  cilBookmark,
  cilExternalLink,

} from '@coreui/icons'

const colorList = ['#65C3A1', '#4BAA87', '#32906E']
var j = 0;
const TimelineCard = ({ time }) => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(2)
  const apiURL = 'timelines/timelines/bookmarks/' + time.id.toString() + '/?page=' + page.toString();
  const [visible, setVisible] = useState(false)
  const [bookmarks, setBookmarks] = useState(null)

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

  return (
    <>
      <CCol xs={12} sm={6} lg={3} onClick={() => setVisible(!visible)}>
        <CWidgetStatsB style={{
          cursor: "pointer", backgroundColor:
            colorList[(j++) % 3]
        }}
          className="mb-4"
          inverse
          value={time.name}
          title={`Created by @${time.author}`}
          progress={{ value: 100 }}
          text={time.bookmarks.length == 1 ? `Contains ${time.bookmarks.length} bookmark` : `Contains ${time.bookmarks.length} bookmarks`}
        />
        <CModal size="xl" alignment="center" visible={visible} onClose={() => setVisible(false)} style={{ color: "white" }}>
          <CModalHeader style={{ backgroundColor: colorList[(j - 1) % 3], color: "white" }}>
            <CModalTitle style={{ color: "white" }}>{time.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {time.description}
          </CModalBody>
          <CModalBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead style={{ backgroundColor: "#ECF8F3" }}>
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilBookmark} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Bookmark</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Created At</CTableHeaderCell>
                  <CTableHeaderCell>Visit Bookmark</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bookmarks && bookmarks.map((book, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={book.image_field} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{book.title_name}</div>
                      <div className="small text-medium-emphasis">
                        Created by @{time.author}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">

                        <div className="float-end">
                          <small className="text-medium-emphasis">{book.date.substring(0, 10)}</small>
                        </div>
                      </div>

                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <a href={book.url_field} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
                        <CIcon size="sm" icon={cilExternalLink} />
                      </a>
                    </CTableDataCell>

                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CPagination align='center' size='sm' aria-label="Page navigation example" style={{ marginTop: '20px' }} className="justify-content-center">
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
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </>
  )
};

TimelineCard.propTypes = {
  time: PropTypes.object.isRequired
};

export default TimelineCard;
