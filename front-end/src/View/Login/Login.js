import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Login.css';

function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3001/user/login", {
        mobile, password
      })
      .then(res=>{
        if(res.data.message==="Exist"){
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
          navigate('/');
        }
        else if(res.data.message==="not Exist")
        {
          setError("Mobile Number Not Exist, Make sure Correct Mobile Number");
        }
        else if(res.data.message==="Password is Wrong")
        {
          setError("Password is Wrong");
        }
      })
      .catch(e =>{
        setError(e.toString())
      })
    }
    catch(e){
      console.log(e);
    }
  };

  const check = (val)=>{
    if(!val)
    {
      setError("");
    }
    else if(val.match('[^0-9]'))
    {
      setError("Mobile number must be in numbers");
    }
    else if(val.length!==10)
    {
      setError("Mobile Number should be in 10 digits")
    }
    else
    {
      setError("");
    }
  }

  const gottoSignin = ()=>{
    navigate('/signin');
  }
    
  return (
    <div className='loginContainer'>
        <form onSubmit={handleLogin} className='drop-left' >
          <img src='/illustrations/login.svg' className='drop-down' alt=''/>
          <div className='ipContainer drop-up'>
            <div>
            <h1>LogIn</h1>
          </div>
            <div className='ip'>
              <input
                type="text"
                value={mobile}
                onChange={(e) => {setMobile(e.target.value); check(e.target.value)}}
              />
              <span>Mobile</span>
            </div>
            <div className='ip'>
              <input
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
              />
              <span>Password</span>
            </div>
            {error===""&&password&&mobile
              &&
              <div>
                <button type="submit">Log In</button>
              </div>
            }
            <div className='gotobrother'>
              <p>Create New Account</p>
              <button onClick={gottoSignin}>signIn</button>
            </div>
          </div>
          <div>
        </div>
      </form>
      {
        error&&
        <div className='errorBox drop-in'>
          <img src='/illustrations/char.svg' alt=''/>
          <p>{error}</p>
        </div>
      }
    </div>
  );
}


export default Login;