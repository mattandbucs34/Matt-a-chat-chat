import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface IUserStateContext {
  user: User | null;
}

export interface IUserDispatchContext {
  handleSignOut(): Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
  signIn(): Promise<void>;
}