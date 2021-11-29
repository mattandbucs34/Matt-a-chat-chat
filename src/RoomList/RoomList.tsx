import React from 'react'
import AddNewRoom from '../components/AddNewRoom';
import { room } from '../models/IRoom';
import RoomListButton from './components/RoomListButton';
import RoomListLogic from './RoomListLogic';

type RoomListType = {
  rooms: Array<room>
}

const RoomList = (props: RoomListType) => {
  const { rooms } = props;
  const { roomName, handleNameChange} = RoomListLogic();
  return (
    <div>
      <AddNewRoom roomName={roomName} updateRoomName={handleNameChange} />
      <RoomListButton rooms={rooms} />
    </div>
  )
}

export default RoomList;