import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, onChildAdded, ref } from 'firebase/database'
import { Header } from './components/Header';
import { room } from './models/IRoom';
import { Footer } from './components/Footer';
import RoomList from './RoomList/RoomList';

const config = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  databaseURL: "https://blocchat-mattyj.firebaseio.com/",
  // databaseURL: process.env.DATABASE_URL,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`
}

const initialRoom: room = {
  id: "",
  name: "Room 1"
}
const userId: number = 0;

const appDB: FirebaseApp = initializeApp(config);
const db: Database = getDatabase(appDB);
const roomsRef: DatabaseReference = ref(db, 'rooms');

function App() {
  const [activeRoom, setActiveRoom]: [room, Dispatch<SetStateAction<room>>] = useState<room>(initialRoom);
  const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
  const [roomList, setRoomList]: [room[], Dispatch<SetStateAction<room[]>>] = useState<room[]>([]);

  useEffect(() => {
    async function loadData() {
      await getRooms();
    }
    loadData();
    setIsLoading(false);
  }, []);

  async function getRooms() {
    const rooms: room[] = [];
    onChildAdded(roomsRef, data => {
      const newRoom = data.val();
      newRoom.id = data.key as string;
      rooms.push(newRoom);
    });
    setRoomList(rooms);
  }

  if(isLoading) {
    return <></>
  }else {
    return (
      <div className="App">
        <Header />
        <RoomList rooms={roomList} />
        <Footer />
      </div>
    );
  }

}

export default App;
