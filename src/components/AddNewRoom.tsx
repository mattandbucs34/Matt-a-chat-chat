import React from 'react';
import RoomListLogic from '../RoomList/RoomListLogic';
import Button from './Button';
import TextInput from './TextInput';

type AddNewRoomType = {
  roomName: string;
  updateRoomName(value: string): void;
}

const AddNewRoom = (props: AddNewRoomType) => {
  const { roomName, updateRoomName} = props;
  const { addNewRoom } = RoomListLogic()
  const buttonText: string = "Add New Room";
  return (
    <div>
      <TextInput value={roomName} handleTextChange={updateRoomName} />
      <Button buttonText={buttonText} handleButtonClick={addNewRoom} />
    </div>
  )
}

export default AddNewRoom
