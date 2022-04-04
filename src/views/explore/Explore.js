/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import ExploreTimelines from './ExploreTimelines'
import ExploreBookmarks from './ExploreBookmarks'

const Explore = () => {
  const [index, setIndex] = useState(1);
  return (<>
    <CNav variant="tabs" style={{ marginBottom: '20px' }}>
      <CNavItem style={{ cursor: 'pointer' }}>
        {index == 0 ? <CNavLink style={{ cursor: 'pointer' }} active onClick={() => setIndex(0)}>Explore Bookmarks</CNavLink> : <CNavLink style={{ cursor: 'pointer', color: '#005b54' }} onClick={() => setIndex(0)}>Explore Bookmarks</CNavLink>}
      </CNavItem>
      <CNavItem style={{ cursor: 'pointer' }}>
        {index == 1 ? <CNavLink style={{ cursor: 'pointer' }} active onClick={() => setIndex(1)}>Explore Timelines</CNavLink> : <CNavLink style={{ cursor: 'pointer', color: '#005b54' }} onClick={() => setIndex(1)}>Explore Timelines</CNavLink>}
      </CNavItem>
    </CNav>
    {console.log(index)}
    {index == 0 ? (<><ExploreBookmarks /></>) : (<><ExploreTimelines /></>)}
  </>);
}

export default Explore;