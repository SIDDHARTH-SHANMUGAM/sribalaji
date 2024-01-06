import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import addNotification from 'react-push-notification';

function Login() {
  const [firstName, setFirstName] = useState('');
  const [address, setAddress]= useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginOrSignin, setLoginOrSignin] = useState('login');
  const navigate = useNavigate();
  let loginMask;

  const notify =({message})=>{
    addNotification({
      title: 'error',
      message: message,
      duration: 4000,
      native: true,


    })
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault()
    
  try{
      await axios.post("http://localhost:3001/signup", {
        firstName,lastName, mobile, address, password
      })
      .then(res=>{
        if(res.data.message === "mobile is already Exist"){
          notify({message: " mobile is already Exist"})
        }
        else if(res.data.message==="signedIn")
        {
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
          navigate('/home');
        }
      })
    }
    catch(e){
      notify({message: e});
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3001/", {
        mobile, password
      })
      .then(res=>{
        if(res.data.message==="Exist"){
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
          navigate('/home');
        }
        else if(res.data.message==="not Exist")
        {
          notify({message: "Incorrect Mobile Number"});
        }
        else if(res.data.message==="Password is Wrong")
        {
          notify({message: "Incorrect Password"});
        }
      })
      .catch(e=>{
        notify({message: e})
      })
    }
    catch(e){
      console.log(e);
    }
  };

  if(loginOrSignin==='login')
  {
    loginMask = <>
        <Form className='white'>
          <Title style={{color:'#53e3a6'}}>
            <h1>Login</h1>
          </Title>

        <form onSubmit={handleLogin} >
          <div>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <span>Mobile</span>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </div>
        <div className='empty'></div>
          <button type="submit">Log in</button>
        <div className='empty'></div>
        <div className='empty'></div>
      </form>
    </Form>
    <NonForm>
        <Title style={{color: 'white', }}>
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login</p>
          <p>with your personal info</p>
        </Title>
        <p>do no have account? <button onClick={()=>setLoginOrSignin('signin')}>signin </button></p>
      </NonForm>
      </>
  }
  if(loginOrSignin ==='signin'){
    loginMask = <>
      <NonForm>
        <Title style={{color: 'white', }}>
          <h1>Welcome to Sri Balaji!</h1>
          <p>Enter your personal details and start</p>
          <p>journey with us</p>
        </Title>
        <p>have account? <button onClick={()=> setLoginOrSignin('login')}>login</button></p>
      </NonForm>
      <Form className='white'>
        <Title style={{color:'#53e3a6'}}>
          <h1>Create Account</h1>
        </Title>
        <form onSubmit={handleSubmit} >
          <div className='empty'/>
          <div className='empty'/>
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <span>First Name</span>
          </div>
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <span>Last Name</span>
          </div>
          <div>
            <input
              type="text"
              inputMode='none'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <span>Mobile</span>
          </div>
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span>Address</span>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div className='empty'/>
      </Form>
      </>
  }
  return (
    <Container>
      <Division>
        {loginMask}

      </Division>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.943);
  
`;


const Division = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
  height: 500px;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(top bottom right left, #50a3a2 0%, #53e3a6 100%);
  border-radius: 10px;
  box-shadow: 5px 0px 5px 2px rgba(0, 0, 0, 0.368);

  .white{
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    button{
      height: 40px;
      width: 100px;
      background-color: #40ec66e4;
      border: 1px solid #53e3a6;
      border-radius: 20px;
      color:white;
      font-size: 16px;
      box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
    }
   }

   @media only screen and (max-width: 550px)
  {
      top: 120px;
  }

  
`;

const Form = styled.div`
  .empty{
  height: 10px;
  }

  div{
    padding: 5px;
    input{
      width: 100%;
      border: 1px solid #53e3a6;
      border-radius: 3px;
      outline: none;
      height: 28px;
    }
    span{
      position: relative;
      top: -24px;
      left: 10px;
      pointer-events: none;
      text-transform: uppercase;
      font-size: 12px;
    }

    input:active{
      border-radius: 5px;
      border: 2px solid #53e3a6;
    }

    input:valid ~ span,
    input:focus ~ span{
      color: white;
      position: relative;
      top: -43px;
      font-size: 12px;
      background-color: #53e3a6;
      padding: 2px;
      border-radius: 2px;
    }
      
  }
`;
const Title = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 50px;
  align-items: center;
  justify-content: center;
  
`;
const NonForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  button{
    height: 40px;
    width: 100px;
    background-color: #40ec66e4;
    border: 1px solid #53e3a6;
    border-radius: 20px;
    color:white;
    font-size: 16px;
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
   }
`;


export default Login;