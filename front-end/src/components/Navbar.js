import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const [isLogout, setIsLogOut] =useState(false)
    const user = JSON.parse(sessionStorage.getItem('user'));

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


  if(isLogout)
  {
    logoutModel =<AlertContainer>
        <MessageContainer>
          <img src='/svg/emergence.svg' alt='' />
          <h2>Are you sure to Logout</h2>
        </MessageContainer>
        <Buttons>
            <button onClick={handleLogout}>Confirm</button>
            <div></div>
            <button onClick={()=> setIsLogOut(false)}>Cancel</button>
        </Buttons>
    </AlertContainer>
    menumask2= <MenuMask2 onClick={()=> setIsLogOut(false)}></MenuMask2>
  }


  if(user&&showMenu)
  {
    menuicon = <img src='/svg/cross.svg' alt='' onClick={()=> setShowMenu(false)} />
    menu = 
    <Menu>
      <Div>
        <MenuBar>
            {menuicon}
        </MenuBar>
      </Div>
      <List onClick={() => {navigate('/home'); setShowMenu(false)}}>
        <img src='/svg/home.svg' alt='' />
        <h4>Home</h4>
      </List>
      <List onClick={() => {navigate('/profile'); setShowMenu(false); }}>
        <img src='/svg/profile.svg' alt='' />
        <h4>Profile</h4>
      </List>
      <List onClick={() => {navigate('/history'); setShowMenu(false);}}>
        <img src='/svg/activity.svg' alt='' />
        <h4>History</h4>
      </List>
      <List>
        <img src='/svg/setting.svg' alt='' />
        <h4>Setting</h4>
      </List>
      {user&&user.isAdmin&&<List onClick={() => {navigate('/admin'); setShowMenu(false);}}>
         <img src='/svg/admin.svg' alt='' />
         <h4>Admin</h4>
       </List>}
       <List onClick={()=> setIsLogOut(true)}>
        <img src='/svg/logout.svg'alt='' />
        <h4>Logout</h4>
       </List>
      {adminList}
    </Menu>
      
    menumask= <MenuMask onClick={()=> setShowMenu(!showMenu)}></MenuMask>

  }
  else
  {
    menuicon = <img src='/svg/menubar.svg' alt='' onClick={()=> setShowMenu(!showMenu)} />
  }


  return (
    <MainContainer>
      <Container>
        <MenuBar>
          {menuicon}
        </MenuBar>
        <Logo>
          <img src='/svg/sbLogo.svg' alt=''/>
          <h2>Sri Balaji Finance</h2>
        </Logo>
        <RightConatainer>
          <img src='/svg/noti.svg' alt=''/>
          {!user&&<Login onClick={() => navigate('/')}>
              <h2>
              Login
              </h2>
          </Login>}
        </RightConatainer>
      </Container>
      <MenuContainer>
        {menu}
        {menumask}
        {menumask2}
        {logoutModel}
      </MenuContainer>
    </MainContainer>
  )
}
const MainContainer = styled.div`
    width: 100%;
`;

const Container = styled.div`
    width: 100%;
    height: 90px;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(top bottom right left, #50a3a2 0%, #53e3a6 100%);


    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);


    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @media only screen and (max-width: 550px)
    {
        height: 120px;
        flex-direction: row;
    }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  img{
    height: 90px;
  }
  @media only screen and (max-width: 600px)
    {
        width: 200px;
    }
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: 40px;
  width : 70px;
  position: relative;
  top: 20px;
  border-radius: 20px;
  h2{
    font-size: 18px;
  }

  :hover{
    font-size: 19px;
    border-radius: 40px;
  }
  


`;

const RightConatainer =styled.div`
  display: flex;
  align-ietms: center;
  position: relative;
  right: 20px;
  
  img{
    height: 70px;
    padding-top: 20px;

  }
  :hover{
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
    width: 100%;
`;

const Div = styled.div`
    padding : 10px;
`;

const Menu = styled.div`
    position : fixed;
    z-index: 6;
    top: 0px;
    height: 100%;
    width: 45%;
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);

    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 550px)
    {
        width: 250px;
    }

`;

const List =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

   img{
    height: 40px;
    padding : 10px;
   }
   h4{
    font-size: 20px;
   }
   :hover{
      font-size: 21px;
      cursor: pointer;
   }
`;


const MenuMask = styled.div`
    top: 0px;
    position : fixed;
    height: 100%;
    width: 100%;
    background-color: #22211f7e;
    z-index: 5;
`;
const MenuMask2 = styled.div`
    top: 0px;
    position : fixed;
    height: 100%;
    width: 100%;
    background-color: #22211f7e;
    z-index: 7;
`;


const MenuBar = styled.div`
  img{
      padding-top: 5px;
      padding-left: 10px;
      width: 30px;
      :hover{
          width:31px;
          cursor: pointer;
      }
  }
`;

const AlertContainer = styled.div`
    position: absolute;
    width: 300px;
    height: 200px;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(top bottom right left, #50a3a2 0%, #53e3a6 100%);
    top: 200px;
    left: 37%;
    z-index: 10;
    border: 2px solid #53e3a6;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
    img{
      height: 20px;
    }

    @media only screen and (max-width: 600px)
    {
        left: 17%;
    }
    @media only screen and (max-width: 750px) and (min-width: 601px )
    {
        left: 23%;
    }
`;
const MessageContainer =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    img{
      height: 40px;
      position: relative;
      top: -40px;
      left: -20px;
      border: 2px solid #53e3a6;
      border-radius: 50%;
      padding : 5px;
    }

    h2{
      position: relative;
      left: -20px;
      font-size: 20px;
    }
`;
const Buttons =styled.div`
    display: flex;
    
    justify-content: space-between;
    align-items: center;

    div{
      width: 40px;
    }
   button{
    height: 40px;
    background-color: #40ec66e4;
    border: 1px solid #53e3a6;
    border-radius: 20px;
   }
   :hover{
    cursor : pointer;
    
   }
`;
export default Navbar