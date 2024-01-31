import React, { useState } from 'react'
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import axios from 'axios'

function Profile() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [firstName, setFirstName] = useState(user.firstName);
  const [address, setAddress]= useState(user.address);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.mobile);
  const [photo, setImage] = useState('')
  const [editProfile, setEditProfile] = useState(false);
  const [changePhoto , setChangePhoto] = useState(false);
  function handleImage(e)
  {
    setImage(e.target.files[0])
  }
  async function submit(e){
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('UserId', user.UserId);

      await axios.post("http://localhost:3001/uploadImage", formData).then((res)=>{
        if(res.data.message==='done')
        {
           sessionStorage.setItem('user', JSON.stringify(res.data.user))
           window.location.reload()
        }
      })
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const UserId = user.UserId;
    await axios.post('http://localhost:3001/updateUser', { UserId, firstName, lastName, address, mobile}).then((res)=>{
      if(res.data.message==='updated')
      {
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        window.location.reload()
      }
    })
    .catch((er)=>{
      console.log(er);
    })
  }
  function formatDate (inputDate){
        
        const dateObject = new Date(inputDate);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObject.getUTCFullYear();
    return `${day}-${month}-${year}`;
    };

    let boxinEdit;
    let box;

    if(editProfile)
    {
      boxinEdit=
      <Container style={{height: '450px'}}>
        <ImgContainer>
          <img src={user.imageUrl} alt='sorry' />
          {!changePhoto&&<button onClick={()=>setChangePhoto(true)}>Change photo</button>}
          
          {changePhoto&&
          <div className='img'>
            <input  
                type='file' 
                accept='image/*' 
                onChange={handleImage}
              />
            <button type='submit' onClick={ submit }>confirm</button>
          </div>
            }
        </ImgContainer>
        <Content>
          {!changePhoto&&<Answers>
            <form onSubmit={handleSubmit} >
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
                <button type="submit">Update</button>
              </div>
            </form>
          </Answers>}
        </Content>
      </Container>

    }
    if(!editProfile)
    {
      box=
      <Container>
        <ImgContainer>
          <img src={user.imageUrl} alt='sorry' />
          <button onClick={()=>setEditProfile(true)}>Edit profile</button>
        </ImgContainer>
        <Content>
          <Label>
            <p>User Id</p>
            <p>Name</p>
            <p>Mobile</p>
            <p>Address</p>
            <p>profile created</p>
          </Label>
          <Answers>
            <p>{user.UserId}</p>
            <p>{user.firstName+" "+user.lastName}</p>
            <p>{user.mobile}</p>
            <p>{user.address}</p>
            <p>{formatDate(user.createdAt)}</p>
          </Answers>
        </Content>
      </Container>
    }

  return (
    <ProfileContaier>
      <Navbar/>
      {boxinEdit}
      {box}
    </ProfileContaier>
  )
}

const ProfileContaier = styled.div`
  background-color: #53e3a752;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
	top: 0;
	left: 0;
  
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

const Container = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 450px;
  background-color: white;
  box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
  border-radius: 10px;

`;

const ImgContainer = styled.div`
  position: relative;
  top: -10px;
  display: flex;
  align-items: center;
  img{
    position: relative;
    left: -20px;
    height: 100px;
    width: 100px;
    border: 2px solid #53e3a6;
    border-radius: 20px;
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
  }
  .img{
    display: flex;
    flex-direction: column;
    width: 100px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  position: relative;
  left: 0px;
  padding: 10px;


`;

const Answers = styled.div`
  position: relative;
  left: 20px;
  padding: 11px;

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
export default Profile
