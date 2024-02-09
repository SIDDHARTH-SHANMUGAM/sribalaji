import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import axios from 'axios';

function Navbar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const [isLogout, setIsLogOut] =useState(false)
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [count, setCount] = useState(0);

  let menuicon
  let menu
  let menumask
  let menumask2
  let logoutModel
  let adminList

  const handleLogout = ()=>{
    sessionStorage.removeItem('user');
    navigate('/');
  }
  
  useEffect(() => {
      fetchData();
  }, []);

  async function fetchData() {
    try {
      const UserId = user.UserId;
      const res = await axios.post('http://localhost:3001/msg/getCount', {
        UserId : UserId
      });
      if(res.data.message==='got')
      {
        setCount(res.data.count)
      }
    } catch (error) {
      console.error('Error fetching Count data:', error);
    } 
  }


  if(isLogout)
  {
    logoutModel =<div className='logout'>
      <div className='logoutContainer drop-down'>
        <div className='message'>
          <img className='point' src='/illustrations/Warning.svg' alt='' />
          <h2>Are you sure to Logout</h2>
        </div>
          <button onClick={handleLogout}>Confirm</button>
          <div></div>
          <button onClick={()=> setIsLogOut(false)}>Cancel</button>
        </div>
      </div>
    menumask2= <div className='menuMask' onClick={()=> setIsLogOut(false)}></div>
  }


  if(user&&showMenu)
  {
    menuicon = <img className='point' src='/svg/cross.svg' alt='' onClick={()=> {setShowMenu(false); setIsLogOut(false);}} />
    menu = 
    <div className='navItems drop-right'>
      <div className='item' onClick={() => {navigate('/'); setShowMenu(false); setIsLogOut(false)}}>
        <img src='/svg/home.svg' alt='' />
        <h4>Home</h4>
      </div>
      <div className='item' onClick={() => {navigate('/profile'); setShowMenu(false); setIsLogOut(false)}}>
        <img src='/svg/profile.svg' alt='' />
        <h4>Profile</h4>
      </div>
      {/* <div className='item' onClick={() => {navigate('/history'); setShowMenu(false); setIsLogOut(false)}}>
        <img src='/svg/activity.svg' alt='' />
        <h4>History</h4>
      </div> */}
      <div className='item' onClick={() => {navigate('/allNotification'); setShowMenu(false); setIsLogOut(false)}}>
        <img style={{width:'35px', paddingLeft:'15px'}} src='/svg/noti.svg'  alt='' />
        <h4 style={{position:'relative', left:'-8px'}}>Notification</h4>
      </div>
      {/* <div className='item'>
        <img src='/svg/setting.svg' alt='' />
        <h4>Setting</h4>
      </div> */}
      {
        user&&user.isAdmin&&
          <div className='item' onClick={() => {navigate('/admin'); setShowMenu(false); setIsLogOut(false)}}>
            <img src='/svg/admin.svg' alt='' />
            <h4>Admin</h4>
          </div>
       }
       <div className='item' onClick={()=> setIsLogOut(true)}>
        <img src='/svg/logout.svg'alt='' />
        <h4>Logout</h4>
       </div>
      {adminList}
    </div>
    menumask= <div className='menuMask' onClick={()=> setShowMenu(!showMenu)}></div>
  }
  else
  {
    menuicon = <img className='point' src='/svg/menubar.svg' alt='' onClick={()=> setShowMenu(!showMenu)} />
  }
  const gotoNoti= async()=>{
    navigate('/notification');
    
  }

  return (
    <div>
      <div className='navContainer drop-down'>
            <div className='beforeLogo'>
              {menuicon}
            </div>
            <div className='logo'>
              <img src='/svg/sbLogo.svg' alt=''/>
              <h1>Sri Balaji</h1>
            </div>
            <div className='afterLogo'>
              {
                user&&
                <div onClick={gotoNoti}>
                  <img className='point' src='/svg/noti.svg' alt=''/>
                  {count!==0&&<p className='count'>{count}</p>}
                </div>
              }
              {
                !user&&
                <div className='point log' onClick={() => navigate('/login')}>
                  <img src='/svg/profile.svg' alt=''/>
                  <h2 > Login </h2>
                </div>
              }
            </div>
      </div>
      {logoutModel}
      {menu}
      {menumask}
      {menumask2}
    </div>
  )
}

export default Navbar