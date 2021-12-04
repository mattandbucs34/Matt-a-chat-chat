import { onChildAdded, onChildRemoved } from 'firebase/database';
import _ from 'lodash';
import { useEffect } from 'react';
import AddNewRoom from './components/AddNewRoom';
import RoomListButton from './components/RoomListButton';
import { room } from './models/IRoom';
import { useRoomDispatch, useRoomState } from './RoomContext';

const RoomList = () => {
  const { roomList, roomsRef } = useRoomState();
  const { setRoomList } = useRoomDispatch();

  useEffect(() => {
    let list: room[] = roomList;
    onChildAdded(roomsRef, data => {
      const newRoom = data.val();
      newRoom.id = data.key;
      if(!_.some(list, newRoom)) {
        list = _.concat(list, newRoom);
        setRoomList(list);
      }
    })

    onChildRemoved(roomsRef, data => {
      list = list.filter(room => room.id !== data.key);
      setRoomList(list);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsRef])

  return (
    <div>
      <AddNewRoom />
      {roomList.length > 0 && <RoomListButton /> }
    </div>
  )
}

export default RoomList;