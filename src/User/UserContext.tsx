import { GoogleAuthProvider, getAuth, signInWithPopup, User, signOut } from "firebase/auth";
import { Context, createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { IUserDispatchContext, IUserStateContext } from "./models/IUserContext";

const UserStateContext: Context<IUserStateContext | undefined> = createContext<IUserStateContext | undefined>(undefined);
const UserDispatchContext: Context<IUserDispatchContext | undefined> = createContext<IUserDispatchContext | undefined>(undefined);

const UserContextProvider = ({children}: PropsWithChildren<any>) => {
  const [user, setUser]: [User | null, Dispatch<SetStateAction<User | null>>] = useState<User | null>(null);

  async function signIn() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const userResult: User = result.user;
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      setUser(userResult);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  }

  const UserState: IUserStateContext = {
    user
  }

  const UserDispatch: IUserDispatchContext = {
    handleSignOut,
    setUser,
    signIn
  }

  return (
    <UserDispatchContext.Provider value={UserDispatch} >
      <UserStateContext.Provider value={UserState} >
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  )
}

function useUserState() {
  const ctx = useContext(UserStateContext);
  if(ctx === undefined) {
    throw new Error("useUserState must be used within a UserContextProvider");
  }
  return ctx;
}

function useUserDispatch() {
  const ctx = useContext(UserDispatchContext);
  if(ctx === undefined) {
    throw new Error("useUserDispatch must be used within a UserContextProvider");
  }
  return ctx;
}

export {UserContextProvider, useUserDispatch, useUserState}