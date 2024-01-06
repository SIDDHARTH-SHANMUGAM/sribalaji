import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LoanCard from './LoanCard';

function AllLoans() {

  const [loans, setLoans] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.post('http://localhost:3001/getAllLoans',{message:'all',UserId:''}).then(res=>{
        if(res.data.message==='got')
        {
          setLoans(res.data.loans);
        }
      })
    }
    fetchData();
  },[])
  return (
   <LoansConatainer>
      <Heading>
            <h2>Date</h2>
            <h2>Bill NO</h2>
            <h2>Ml NO</h2>
            <h2>User Id</h2>
            <h2>Name</h2>
            <h2>Address</h2>
            <h2>mobile</h2>
            <h2>Loan Amount</h2>
            <h2>balance</h2>
        </Heading>
      {
        loans && loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))
      }
   </LoansConatainer>
  )
}
const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    h2{
        font-size: 14px;
        width: 100px;
    }
    
`;

const LoansConatainer = styled.div`
   padding: 20px;
    z-index: 2;
    position: absolute;
    top: 90px;
    left: 0px;
    right: 0px;

`;

export default AllLoans
