import React from 'react'
import { useUserDispatch } from '../User/UserContext'

const SignInScreen = () => {
  const { signIn } = useUserDispatch();
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  )
}

export default SignInScreen
