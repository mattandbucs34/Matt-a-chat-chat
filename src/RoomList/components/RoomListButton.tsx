import React from 'react';
import _ from 'lodash';
import { room } from '../../models/IRoom'

type RoomListButtonType = {
  rooms: Array<room>
}

const RoomListButton = ({rooms}: RoomListButtonType) => {
  function displayRooms() {
    return (
      _.map(rooms, (room) => {
        return (
          <div key={room.id}>
            {room.name}
          </div>
        )
      })
    )
  }

  return (
    <React.Fragment>
      {rooms.length > 0 && displayRooms()}
    </React.Fragment>
  )
}

export default RoomListButton;