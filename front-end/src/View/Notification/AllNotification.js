import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import './Notification.css'

function AllNotification() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [message, setMessage] = useState('');


  useEffect(() => {
      fetchData();
  },[]);

  async function fetchData() {
    try {
      const UserId = user.UserId;
      const res = await axios.post('http://localhost:3001/msg/getMessage', {
        UserId : UserId
      });
      if(res.data.message==='got')
      {
        setMessage(res.data.msgs)
        console.log(res.data.msgs)
     
      }
    } catch (error) {
      console.error('Error fetching Message data:', error);
    } 

    try{
      const UserId = user.UserId;
        const res = await axios.post('http://localhost:3001/msg/updateSeen', {
          UserId : UserId
        });
      }
      catch(e)
      {
        console.log(e);
      }

  }
  // async function markAsRead (){

  // }
  return (
    <div className='messageContainer'>
      <Navbar/>
      <div className='flex'>
        {
          message&&message.map((msg) => (
            <Msg key={msg._id} msg={msg} />
          ))
        }
        
      </div>
    </div>
  )
}

function Msg ({msg}){
  return (
    <div className='space drop-left'>
      <div className='msgContainer'>
        <img src='/svg/sbLogo.svg'></img>
        <p>{msg.message}</p>
      </div>
    </div>
  )
}

export default AllNotification
