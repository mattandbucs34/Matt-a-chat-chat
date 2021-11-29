import { Dispatch, SetStateAction, useState } from "react";

export default function RoomListLogic() {
  const [roomName, setRoomName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
  
  const handleNameChange = (name: string) => {
    setRoomName(name);
  }

  const addNewRoom = () => {

  }

  return {
    roomName,
    addNewRoom,
    handleNameChange
  }
}
