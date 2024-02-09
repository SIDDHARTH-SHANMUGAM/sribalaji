import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../../Navbar/Navbar';
import Loans from '../AllLoans/AllLoans';
import MakeBill from '../MakeBill/MakeBill';
import AllBills from '../RecentBills/AllBills';
import ThisWeek from '../ThisWeek/ThisWeek';
import TodayList from '../TodayList/TodayList';


function Admin() {

  const [showAllLoans, setShowAllLoans] = useState(false);
  const [showAllBills, setShowAllBills] = useState(false);
  const [showMakeBills, setShowMakeBills] = useState(false);
  const [showThisWeek, setShowThisWeek] = useState(false);
  const [showToday, setShowToday] = useState(false);
  let allLoansmask;

  if(showAllLoans)
  {
    allLoansmask = <Loans/>
  }
  if(showAllBills)
  {
    allLoansmask = <AllBills/>
  }
  if(showMakeBills)
  {
    allLoansmask = <MakeBill/>
  }
  if(showThisWeek)
  {
    allLoansmask =<ThisWeek/>
  }
  if(showToday)
  {
    allLoansmask =<TodayList/>
  }

  return (
    <AdminContainer >
      <Navbar/>
      <ListConatiner className='drop-down2'>
        <Cards className={showMakeBills?'active':''} onClick={()=> {
          setShowMakeBills(true);
          setShowAllLoans(false);
          setShowAllBills(false);
          setShowThisWeek(false);
          setShowToday(false);
          }}>
          <p>Make bills</p>
        </Cards>
        <Cards className={showAllLoans?'active':''} onClick={()=> {
          setShowAllLoans(true);
          setShowAllBills(false);
          setShowMakeBills(false);
          setShowThisWeek(false);
          setShowToday(false);
          }}>
          <p>All Loans</p>
        </Cards>
        <Cards className={showAllBills?'active':''} onClick={()=> {
          setShowAllLoans(false);
          setShowAllBills(true);
          setShowMakeBills(false);
          setShowThisWeek(false);
          setShowToday(false);
          }}>
          <p> Bills</p>
        </Cards>
        <Cards className={showToday?'active':''} onClick={()=> {
          setShowAllLoans(false);
          setShowAllBills(false);
          setShowMakeBills(false);
          setShowThisWeek(false);
          setShowToday(true);
          }}>
          <p>24 hours</p>
        </Cards>
        <Cards className={showThisWeek?'active':''} onClick={()=> {
          setShowAllLoans(false);
          setShowAllBills(false);
          setShowMakeBills(false);
          setShowThisWeek(true);
          setShowToday(false);
          }}>
          <p>This weak</p>
        </Cards>
      </ListConatiner>
      <Displayer>
        {allLoansmask}
      </Displayer>
    </AdminContainer>
  )
}

const AdminContainer = styled.div`
    width : 100%;
    height : 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #53e3a752;
    padding-bottom: 200px;
    

`;

const ListConatiner = styled.div`
  position : absolute;
  top: 100px;
  width: 100%;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(top bottom right left, #50a3a2 0%, #53e3a6 100%);

  display: flex;
  
  @media only screen and (max-width: 550px)
  {
      top: 140px;
  }

.active {
  background : #40ec66e4 ;
  border-radius: 5px;
  box-shadow: 5px 0px 5px 2px rgba(0, 0, 0, 0.368);
}
  

`;

const Cards = styled.div`
  height: 50px;
  width: 87%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  :hover{
    cursor: pointer;
  }
`;


const Displayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0px;
  left:0px;
`;

export default Admin