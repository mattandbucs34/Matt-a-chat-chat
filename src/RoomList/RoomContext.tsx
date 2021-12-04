import { DataSnapshot, get, set, push, child, remove, update, DatabaseReference } from "firebase/database";
import _ from "lodash";
import React, { Context, createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { room } from "./models/IRoom";
import { IRoomDispatchContext, IRoomStateContext, RoomContextType } from "./models/IRoomContext";

const RoomStateContext: Context<IRoomStateContext | undefined> = createContext<IRoomStateContext | undefined>(undefined);
const RoomDispatchContext: Context<IRoomDispatchContext | undefined> = createContext<IRoomDispatchContext | undefined>(undefined);

const initialRoom: room = {
  id: "",
  name: "Room 1"
}
// const userId: number = 0;

function RoomContextProvider({children, roomsRef}: RoomContextType) {
  const [activeRoom, setActiveRoom]: [room, Dispatch<SetStateAction<room>>] = useState<room>(initialRoom);
  const [roomList, setRoomList]: [room[], Dispatch<SetStateAction<room[]>>] = useState<room[]>([]);
  const [roomName, setRoomName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
  
  const handleNameChange = (name: string) => {
    setRoomName(name);
  }

  async function populateRooms() {
    let list: room[] = roomList;
    const res: DataSnapshot = await get(roomsRef);
    const rooms = res.val();
    _.forIn(rooms, (value, key) => {
      const newRoom = {id: key, name: value.name};
      if(!_.some(roomList, newRoom)) {
        list.push(newRoom);
      }
    })
    console.log(list);
    // setRoomList(list);
    return list;
  }

  async function addNewRoom(e: React.FormEvent) {
    e.preventDefault();
    const newRoomRef: DatabaseReference = push(roomsRef);
    const newRoom: room = {id: newRoomRef.key as string, name: roomName}
    set(newRoomRef, {
      ...newRoom
    })
    // await populateRooms();
    // setRoomList(roomList.concat(newRoom));
    setRoomName('');
    setActiveRoom(newRoom);
  }

  async function removeRoom(e: React.MouseEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await remove(child(roomsRef, id));
    // await populateRooms();
  }

  async function editRoomName(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    await update(child(roomsRef, id), {name: e.target.value});
    // await populateRooms();
  }

  const RoomState: IRoomStateContext = {
    activeRoom,
    roomList,
    roomName,
    roomsRef
  }

  const RoomDispatch: IRoomDispatchContext = {
    addNewRoom,
    editRoomName,
    handleNameChange,
    populateRooms,
    removeRoom,
    setActiveRoom,
    setRoomList
  }

  return (
    <RoomDispatchContext.Provider value={RoomDispatch}>
      <RoomStateContext.Provider value={RoomState} >
        {children}
      </RoomStateContext.Provider>
    </RoomDispatchContext.Provider>
  )
}

function useRoomState() {
  const ctx = useContext(RoomStateContext);
  if(ctx === undefined) {
    throw new Error('useRoomState must be used within a RoomContextProvider');
  }
  return ctx;
}

function useRoomDispatch() {
  const ctx = useContext(RoomDispatchContext);
  if(ctx === undefined) {
    throw new Error('useRoomDispatch must be used within a RoomContextProvider');
  }
  return ctx;
}

export {RoomContextProvider, useRoomDispatch, useRoomState}