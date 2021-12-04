import React from 'react';
import { IMessage } from '../models/IMessages';

type MessagePropType = {
  message: IMessage;
}

function Message({message}: MessagePropType) {
  return (
    <div>
      {message.content}
    </div>
  )
};

export default Message;