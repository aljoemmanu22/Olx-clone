import React, {useContext, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import DropDownProfile from '../../assets/DropDownProfile';

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const Firebase = useContext(FirebaseContext);
  const auth = getAuth(Firebase);
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false)

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
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow ></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <>
            <div className='language'>
              <span>{`Hi ${user.displayName}  |`}</span>
              <Arrow isOpen={openProfile} onClick={() => setOpenProfile(!openProfile)}>
              </Arrow>
            </div>
            </>
          ) : (
            <span onClick={()=>navigate('/login')} style={{ cursor: 'pointer' }}>Login</span>
          )}
        </div>

        <div onClick={()=>navigate('/create')} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span style={{ cursor: 'pointer' }}>SELL</span>
          </div>
        </div>
      </div>
      {
        openProfile && <DropDownProfile />
      }
      
    </div>
  );
}

export default Header;
