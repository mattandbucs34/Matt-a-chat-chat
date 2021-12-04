import React from 'react'
import { useRoomState } from '../../RoomList/RoomContext';
import { useMessagesDispatch, useMessagesState } from '../MessagesContext'

const SendMessageContainer = () => {
  const { activeRoom } = useRoomState();
  const { message } = useMessagesState();
  const { handleMessageChange, sendMessage } = useMessagesDispatch();

  function callSendMessage(e: React.KeyboardEvent) {
    if(e.key === "Enter" && e.ctrlKey) {
      sendMessage(e as any, activeRoom);
    }
  }

  return (
    <div onKeyDown={(e: React.KeyboardEvent) => callSendMessage(e)}>
      <textarea value={message} onChange={handleMessageChange}></textarea>
      <button onClick={(e: React.MouseEvent) => sendMessage(e, activeRoom)}>Send</button>
    </div>
  )
}

export default SendMessageContainer
