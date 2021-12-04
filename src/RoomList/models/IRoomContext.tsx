import { DatabaseReference } from "firebase/database";
import React, { PropsWithChildren } from "react";
import { room } from "./IRoom";

export type RoomContextType = {
  children: PropsWithChildren<any>,
  roomsRef: DatabaseReference
}

export interface IRoomStateContext {
  activeRoom: room;
  roomList: Array<room>;
  roomName: string;
  roomsRef: DatabaseReference;
}

export interface IRoomDispatchContext {
  addNewRoom(e: React.FormEvent): void;
  editRoomName(e: React.ChangeEvent<HTMLInputElement>, id: string): Promise<void>;
  handleNameChange(name: string): void;
  populateRooms(): Promise<room[]>;
  removeRoom(e: React.MouseEvent<HTMLDivElement>, id: string): void;
  setActiveRoom: React.Dispatch<React.SetStateAction<room>>;
  setRoomList: React.Dispatch<React.SetStateAction<room[]>>
}