import { useUserDispatch } from './UserContext';

const UserMGR = () => {
  const { handleSignOut } = useUserDispatch();
  
  return (
    <div>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  )
}

export default UserMGR;

