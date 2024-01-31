import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signin() {
  const [firstName, setFirstName] = useState('');
  const [address, setAddress]= useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  try{
      await axios.post("http://localhost:3001/signup", {
        firstName,lastName, mobile, address, password
      })
      .then(res=>{
        if(res.data.message === "mobile is already Exist"){
          setError(" mobile is already Exist")
        }
        else if(res.data.message==="signedIn")
        {
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
          navigate('/');
        }
      })
    }
    catch(e){
      setError(e.toString())
    }
  }

  const check = (val, type)=>{
    if(type === 'Name')
    {
      if(val.match('[0-9]+'))
      {
        setError("Name Should not be in numbers");
      }
      else
        setError("");
    }
    else if(type === 'Mobile')
    {
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
    else if(type === "Password")
    {
      if(val.length===0)
        setError("");
      else if(val.length<8)
        setError("Password should contain atleast 8 character,")
      else if(!val.match('[A-Z]+'))
       setError("Password should contain atleast One UpperCase Letter")
      else if(!val.match('[a-z]+'))
       setError("Password should contain atleast One LowerCase Letter")
      else if(!val.match('[0-9]+'))
       setError("Password should contain atleast One number")
      else if(!val.match('[ ~!@#$%^&*()`]+'))
       setError("Password should contain atleast One Special Characters like ~!@#$%^&*()`")
      else
        setError("")
    }
    else if(type === "ConfirmPassword")
    {
      if(password !== val)
        setError("Password and Confirm Pasword are not matching")
      else
        setError("")
    }
  }
  const gotoLogin =()=>{
    navigate('/login');
  }

        
  return (
    <div className='container'>
        <form onSubmit={handleSubmit} className='drop-left' >
          <img src='/illustrations/signin.svg' className='drop-down' alt=''/>
          <div className='ipContainer drop-up'>
          <div>
            <h1>Sign IN</h1>
          </div>
          <div className='ip'>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); check(e.target.value, "Name")}}
            />
            <span>First Name</span>
          </div>
         <div className=''>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value); check(e.target.value, "Name")}}
            />
            <span>Last Name</span>
          </div>
          <div className='drop-in'>
            <input
              type="text"
              value={mobile}
              onChange={(e) => {setMobile(e.target.value); check(e.target.value, "Mobile")}}
            />
            <span>Mobile</span>
          </div>
          <div className='drop-in'>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <span>Address</span>
          </div>
          <div className='drop-in'>
            <input
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value);  check(e.target.value, "Password")}}
            />
            <span>Password</span>
          </div>
          <div className='drop-in'>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value);  check(e.target.value, "ConfirmPassword")}}
            />
            <span>Confirm Password</span>
          </div>
            {
            error===""&&password&&firstName&&lastName&&mobile&&address&&confirmPassword
              &&
              <div>
                <button type="submit">Sign In</button>
              </div>
            }
            <div>
              <p>Already have an Account</p>
              <button onClick={gotoLogin}>Login</button>
            </div>
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


export default Signin;