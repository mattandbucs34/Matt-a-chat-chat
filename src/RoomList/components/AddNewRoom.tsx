import React from 'react';
import { useRoomDispatch, useRoomState } from '../RoomContext';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const AddNewRoom = () => {
  const { roomName } = useRoomState();
  const { addNewRoom, handleNameChange } = useRoomDispatch();
  const buttonText: string = "Add New Room";

  return (
    <form onSubmit={(e: React.FormEvent) => addNewRoom(e)}>
      <TextInput value={roomName} handleTextChange={handleNameChange} />
      <Button buttonText={buttonText} />
    </form>
  )
}

export default AddNewRoom
