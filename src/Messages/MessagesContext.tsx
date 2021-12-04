import { child, equalTo, onChildAdded, orderByChild, push, query, update } from "firebase/database";
import _ from "lodash";
import React, { Context, createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { room } from "../RoomList/models/IRoom";
import { IMessage } from "./models/IMessages";
import { IMessagesDispatchContext, IMessagesStateContext, MessageContextPropType } from "./models/IMessagesContext";

const MessagesStateContext: Context<IMessagesStateContext | undefined> = createContext<IMessagesStateContext | undefined>(undefined);
const MessagesDispatchContext: Context<IMessagesDispatchContext | undefined> = createContext<IMessagesDispatchContext | undefined>(undefined);

function MessagesContextProvider({children, messagesDBRef}: MessageContextPropType) {
  const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
  const [messageList, setMessageList]: [IMessage[], Dispatch<SetStateAction<IMessage[]>>] = useState<IMessage[]>([]);

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
  }

  async function getMessages(room: room) {
    let list: Array<IMessage> = []
    onChildAdded(query(messagesDBRef, orderByChild('roomId'), equalTo(room.id)), async data => {
      const room = data.val();
      list = _.concat(list, room);
      setMessageList(list);
    })
  }

  async function sendMessage(e: React.MouseEvent, room: room) {
    e.preventDefault();
    if(message.length > 0) {
      const newMessage: IMessage = {
        id: '',
        content: message,
        roomId: room.id,
        sentAt: Date.now(),
        username: 'Guest'
      }
      const data = await push(messagesDBRef, newMessage);
      await update(child(messagesDBRef, data.key as string), {id: data.key});
      await getMessages(room);
      setMessage('');
    }
  }


  const MessagesState: IMessagesStateContext = {
    message,
    messageList
  }

  const MessagesDispatch: IMessagesDispatchContext = {
    getMessages,
    handleMessageChange,
    sendMessage
  }
  
  return (
    <MessagesDispatchContext.Provider value={MessagesDispatch}>
      <MessagesStateContext.Provider value={MessagesState}>
        {children}
      </MessagesStateContext.Provider>
    </MessagesDispatchContext.Provider>
  )
}

function useMessagesState() {
  const ctx = useContext(MessagesStateContext);
  if(ctx === undefined) {
    throw new Error('useMessagesState must be used within a MessagesContextProvider');
  }
  return ctx;
}

function useMessagesDispatch() {
  const ctx = useContext(MessagesDispatchContext);
  if(ctx === undefined) {
    throw new Error('useMessagesDispatch must be used within a MessagesContextProvider');
  }
  return ctx;
}

export {MessagesContextProvider, useMessagesDispatch, useMessagesState}