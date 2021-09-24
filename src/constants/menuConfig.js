import React from 'react'
// import Dashboard from '@material-ui/icons/Dashboard'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import Conference from '@material-ui/icons/AccessibleForward';
import MyConference from '@material-ui/icons/Accessible';

const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <Conference />, text: 'NavBar.Conferences', path: '/conferences',name: 'Conferences' },
  { icon: <MyConference />, text: 'NavBar.MyConferences', path: '/myConferences',name: 'MyConferences' }
]

export default menuItems
