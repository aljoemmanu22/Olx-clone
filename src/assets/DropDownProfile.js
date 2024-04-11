import React, {useContext} from 'react'
import './DropDownProfile.css'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../store/FirebaseContext';

function DropDownProfile() {
    const { user, setUser } = useContext(AuthContext);
    const Firebase = useContext(FirebaseContext);
    const auth = getAuth(Firebase);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await signOut(auth);
          setUser(null); // Set the user to null in the context
          navigate('/login'); // Redirect to the login page
        } catch (error) {
          console.error('Error logging out:', error.code, error.message);
        }
      };
  return (
    <div className='flex flex-col dropDownProfile'>
        <ul className='flex flex-col gap-4 list-none'>
            <li>Profile</li>
            <li>Settings</li>
            <li style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
        </ul> 
    </div>
  )
}

export default DropDownProfile
