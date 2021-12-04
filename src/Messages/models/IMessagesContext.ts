import { DatabaseReference } from "firebase/database";
import React, { PropsWithChildren } from "react";
import { room } from '../../RoomList/models/IRoom';
import { IMessage } from "./IMessages";

export type MessageContextPropType = {
  children: PropsWithChildren<any>,
  messagesDBRef: DatabaseReference
}

export interface IMessagesStateContext {
  message: string;
  messageList: Array<IMessage>;
}

export interface IMessagesDispatchContext {
  getMessages(room: room): void;
  handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  sendMessage(e: React.MouseEvent, room: room): Promise<void>;
}