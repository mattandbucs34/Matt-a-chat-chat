import './App.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref } from 'firebase/database';
import { RoomContextProvider } from './RoomList/RoomContext';
import { MessagesContextProvider } from './Messages/MessagesContext';
import { useUserState } from './User/UserContext';
import Main from './components/Main';
import SignInScreen from './components/SignInScreen';

const config = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`
}

const app: FirebaseApp = initializeApp(config);
const db: Database = getDatabase(app);
const roomsRef: DatabaseReference = ref(db, 'rooms');
const msgRef: DatabaseReference = ref(db, 'Messages');

function App() {
  const { user } = useUserState();
  const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
  // const listen = useCallback(
  //   onChildAdded(roomsRef, data => {
  //     console.log(data.val());
  // }) , [roomsRef])

  useEffect(() => {
    setIsLoading(false);
  }, []);

  

  if(isLoading) {
    return <></>
  }else {
    return (
      <RoomContextProvider roomsRef={roomsRef}>
        <MessagesContextProvider messagesDBRef={msgRef}>
          <div className="App">
            {!user && <SignInScreen />}
            {user && <Main />}
          </div>
        </MessagesContextProvider>
      </RoomContextProvider>
    )
  }
}

export default App;
