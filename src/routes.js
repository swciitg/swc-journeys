import React from 'react'

const Bookmarks = React.lazy(() => import('./views/bookmarks/Bookmarks'))
const Timelines = React.lazy(() => import('./views/timelines/Timelines'))
const Favorites = React.lazy(() => import('./views/favorites/Favorites'))
const Explore = React.lazy(() => import('./views/explore/Explore'))
const SearchBookmarks = React.lazy(() => import('./views/bookmarks/SearchBookmarks'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/bookmark', name: 'Bookmarks', component: Bookmarks },
  { path: '/timeline', name: 'Timelines', component: Timelines },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/search', name: 'Search', component: SearchBookmarks },
]

export default routes
