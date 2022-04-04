import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilStar, cilBookmark, cilFork, cilCompass } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Bookmarks',
    to: '/bookmark',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Timelines',
    to: '/timeline',
    icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Favorites',
    to: '/favorites',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Explore',
    to: '/explore',
    icon: <CIcon icon={cilCompass} customClassName="nav-icon" />,
  },
]

export default _nav
