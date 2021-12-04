import React, { Dispatch, SetStateAction, useState } from 'react';
import _ from 'lodash';
import { useRoomDispatch, useRoomState } from '../RoomContext';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { room } from '../models/IRoom';
import { useMessagesDispatch } from '../../Messages/MessagesContext';

const RoomListButton = () => {
  const { activeRoom, roomList } = useRoomState();
  const { editRoomName, removeRoom, setActiveRoom } = useRoomDispatch();
  const { getMessages } = useMessagesDispatch();
  const [readOnlyId, setReadOnlyId]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');

  function clickRoomBtn(e: React.MouseEvent<HTMLDivElement>, room: room) {
    e.stopPropagation();
    if(!_.isEqual(activeRoom, room)) {
      setActiveRoom(room);
      getMessages(room);
    }
  }
  
  function displayRooms() {
    return (
      _.map(roomList, (room) => {
        return (
          <div key={room.id} onClick={(e: React.MouseEvent<HTMLDivElement>) => clickRoomBtn(e, room)}>
            <input
              type="text"
              value={room.name}
              readOnly={room.id !== readOnlyId}
              // disabled={room.id !== readOnlyId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => editRoomName(e, room.id)} 
            />
            <div onClick={(e: React.MouseEvent) => {e.preventDefault(); setReadOnlyId(room.id)}}><FaPen /></div>
            <div onClick={(e: React.MouseEvent<HTMLDivElement>) => {removeRoom(e, room.id)}}><FaRegTrashAlt/></div>
          </div>
        )
      })
    )
  }

  return (
    <React.Fragment>
      {displayRooms()}
    </React.Fragment>
  )
}

export default RoomListButton;