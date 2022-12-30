import React from 'react'
import PublicIcon from '@mui/icons-material/Public'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const menuItems = [
  {
    icon: <PublicIcon />,
    text: 'NavBar.Welcome',
    path: '/welcome',
    name: 'Welcome'
  },
  {
    icon: <LibraryBooksIcon />,
    text: 'NavBar.Books',
    path: '/books',
    name: 'Books'
  }
]

export default menuItems
