import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoanCard from '../../components/LoanCard';

function AllLoans() {

  const [loans, setLoans] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.post('http://localhost:3001/monthlyLoan/getAllLoans',{message:'all',UserId:''}).then(res=>{
        if(res.data.message==='got')
        {
          setLoans(res.data.loans);
        }
      })
    }
    fetchData();
  },[])
  return (
   <div className='thisWeekContainer'>
      <div className='titles'>
            <h2>Date</h2>
            <h2>Bill NO</h2>
            <h2>Ml NO</h2>
            <h2>User Id</h2>
            <h2>Name</h2>
            <h2>Address</h2>
            <h2>mobile</h2>
            <h2>Loan Amount</h2>
            <h2>balance</h2>
        </div>
      {
        loans && loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))
      }
   </div>
  )
}
export default AllLoans
