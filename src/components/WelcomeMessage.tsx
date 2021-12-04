import React from 'react'
import { useUserState } from '../User/UserContext';

const WelcomeMessage = () => {
  const { user } = useUserState();
  return (
    <div>
      <span>Welcome {user && user.displayName}!</span>
    </div>
  )
}

export default WelcomeMessage
