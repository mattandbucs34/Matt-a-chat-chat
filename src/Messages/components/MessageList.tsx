import _ from 'lodash';
import React from 'react';
import { useMessagesState } from '../MessagesContext';
import Message from './Message';

function MessageList() {
  const { messageList } = useMessagesState();
  function renderMessages() {
    return (
      _.map(messageList, (message) => {
        return (
          <Message key={message.id} message={message} />
        )
      })
    )
  }

  return (
    <div>
      {renderMessages()}
    </div>
  )
}

export default MessageList;