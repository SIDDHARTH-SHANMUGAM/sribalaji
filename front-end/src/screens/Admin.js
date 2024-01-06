import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import Loans from '../components/AllLoans';
import MakeBill from '../components/MakeBill';
import AllBills from '../components/AllBills';


function Admin() {

  const [showAllLoans, setShowAllLoans] = useState(false);
  const [showAllBills, setShowAllBills] = useState(false);
  const [showMakeBills, setShowMakeBills] = useState(false);
  let allloansmask;
  let allbillsmask;
  let makebillmask;

  if(showAllLoans)
  {
    allloansmask = <Loans/>
  }
  if(showAllBills)
  {
    allbillsmask = <AllBills/>
  }
  if(showMakeBills)
  {
    makebillmask = <MakeBill/>
  }

  return (
    <AdminContainer>
      <Navbar/>
      <ListConatiner>
        <Cards className={showMakeBills?'active':''} onClick={()=> {
          setShowMakeBills(true);
          setShowAllLoans(false);
          setShowAllBills(false);
          }}>
          <p>Make bills</p>
        </Cards>
        <Cards className={showAllLoans?'active':''} onClick={()=> {
          setShowAllLoans(true);
          setShowAllBills(false);
          setShowMakeBills(false);
          }}>
          <p>All Loans</p>
        </Cards>
        <Cards className={showAllBills?'active':''} onClick={()=> {
          setShowAllLoans(false);
          setShowAllBills(true);
          setShowMakeBills(false);
          }}>
          <p>All Bills</p>
        </Cards>
        <Cards >
          <p>Today</p>
        </Cards>
        <Cards  >
          <p>This weak</p>
        </Cards>
      </ListConatiner>
      <Displayer>
        {allloansmask}
        {allbillsmask}
        {makebillmask}
      </Displayer>
    </AdminContainer>
  )
}

const AdminContainer = styled.div`
    width : 100%;
    height : auto ;
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