import React from 'react'
import Messages from '../Messages/Messages'
import RoomList from '../RoomList/RoomList'
import { Footer } from './Footer'
import { Header } from './Header'
import Sidebar from './Sidebar'
import UserMGR from '../User/User'

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Sidebar>
        <UserMGR />
        <RoomList  />
      </Sidebar>
      <Messages />
      <Footer />
    </React.Fragment>
  )
}

export default Main
