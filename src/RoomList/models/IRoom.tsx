import { Database } from "firebase/database";

export type room = {
  id: string,
  name: string
}

export interface IRoomListLogic {
  roomList: room[];
  roomName: string;
  addNewRoom: () => void;
  handleNameChange: (name: string) => void;
  populateRooms: (db: Database) => Promise<void>;
}