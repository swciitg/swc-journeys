/* eslint-disable prettier/prettier */
import React from 'react'
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { post } from '../utilities/util'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CForm,
  CFormInput,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormFloating,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBookmark, cilPlus, cilFork, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { logoNegative } from 'src/assets/brand/logo-negative';

const bookmarkApiURL = "bookmarksection/bookmarkApi/";
const timelineApiURL = 'timelines/timelines/'
const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [keyword, setKeyword] = useState("")
  const history = useHistory();
  const [posting,setPosting] = useState(false);
  const addBookmark = () => {
    const data = { url_field: document.getElementById('bookmarkUrlInput').value };
    setPosting(true)
    console.log(document.getElementById('bookmarkUrlInput').value)
    post(bookmarkApiURL, data).then(() => {
      console.log("added new bookmark")
      setPosting(false)
      window.location.reload();
    }
    );
  }

  const addTimeline = () => {
    setPosting(true)
    console.log(document.getElementById('TimelineNameInput').value)
    const data = {name: document.getElementById('TimelineNameInput').value};
    post(timelineApiURL, data).then(() => {
      console.log("added new timeline")
      setPosting(false)
      window.location.reload();
    });

  }
 const AddBookmarkButton = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div id="firstBtn" onClick={() => setVisible(!visible)} style={{ cursor:"pointer", position:"relative", marginRight:"30px",}}>
        <CIcon icon={cilBookmark} size="xxl" />
        <CIcon style={{position:"absolute", color:"#005b54",top:"-13px", left:"20px", marginBottom:"30px"}} icon={cilPlus} size="lg" />
      </div>
      <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add New Bookmark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Save your favorite website as a bookmark by entering its URL in the box below.
        </CModalBody>
        <CFormFloating style={{margin:"20px"}}>
          <CFormInput
            type="email"
            id="bookmarkUrlInput"
            placeholder="name@example.com"
          />
          <CFormLabel htmlFor="bookmarkUrlInput">Enter URL Here</CFormLabel>
        </CFormFloating>
        <CModalFooter>
          <CButton color='secondary' onClick={() => setVisible(false)}>
            Close
          </CButton>
          {posting?(<CSpinner className='spinner'/>):(<CButton className='greenbtn' onClick={addBookmark} >{'Save Bookmark'}</CButton>)}
        </CModalFooter>
      </CModal>
    </>
  )
}
const AddTimelineButton = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div id="secondBtn" onClick={() => setVisible(!visible)} style={{ cursor:"pointer", position:"relative", marginRight:"30px",}}>
        <CIcon icon={cilFork} size="xxl" />
        <CIcon style={{position:"absolute", color:"#005b54",top:"-13px", left:"20px", marginBottom:"30px"}} icon={cilPlus} size="lg" />
      </div>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Start New Timeline</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Enter the name of the new timeline you wish to create. Then add some bookmarks to it.
        </CModalBody>
        <CFormFloating style={{margin:"20px"}}>
          <CFormInput
            type="email"
            id="TimelineNameInput"
            placeholder="name@example.com"
          />
          <CFormLabel htmlFor="TimelineNameInput">Enter Name Here</CFormLabel>
        </CFormFloating>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          {posting?(<CSpinner className='spinner'/>):(<CButton className = 'greenbtn' onClick={addTimeline} color="primary">{'Save Timeline'}</CButton>)}
        </CModalFooter>
      </CModal>
    </>
  )
}
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid >

        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto" >
          <CNavItem>
          </CNavItem>
          <CNavItem>
            
          </CNavItem>
          <CNavItem>
          
          </CNavItem>
        </CHeaderNav>
        {AddBookmarkButton()}
        {AddTimelineButton()}
        <CForm className="d-flex">
            <CFormInput style={{marginTop: "8px", height: "38px", border:"2px solid #4f5d73"}} id="searchKey"type="search" className="me-2" placeholder="Search Bookmarks" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} />
            <CNavLink to="/search" component={NavLink} activeClassName="active">
            <CButton className='searchbtn' type="submit" color='success' variant="outline">
              Search
            </CButton>
            </CNavLink>
          </CForm>
        <CHeaderNav className="ms-3" >
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer >
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
