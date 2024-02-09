import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Bill from '../Bill/Bill';

function AllBills() {
  const [bills, setBills] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      await axios.get('http://localhost:3001/bill/getBill').then(res=>{
        if(res.data.message==='got')
        {
          setBills(res.data.bills); 
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
            <h2>Loan Type</h2>
            <h2>Loan No</h2>
            <h2>Name</h2>
            <h2>Transaction Type</h2>
            <h2>Pay/Rec Amt</h2>
            <h2>Dues</h2>
        </div>
      {
        bills && bills.map((bill) => (
          <BillCard key={bill._id} bill={bill}  />
        ))
      }
   </div>
  )
}

 function BillCard({ bill }) {
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [view, setView] = useState(false);

  const formatDate = (date) => {
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
  };

  async function fetchData() {
    try {
      const res = await axios.post('http://localhost:3001/user/getUser', {
        message: 'id',
        value: bill.UserId,
      });
      if (res.data.message === 'userfound') {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    if (bill.date) {
      const formattedDate = formatDate(bill.date);
      setDate(formattedDate);
    }
    fetchData();
  }, [bill.date]);

  const handleView = () => {
    console.log(view);
    setView(!view);
  };

  const content = view ? <Bill bill={bill} user={user} /> : null;

  return (
    <div className='billCardContainer' onClick={handleView}>
      {bill && user && (
        <div className='values'>
          <p>{date && date}</p>
          <p>{bill.billNo}</p>
          <p>{bill.loanType}</p>
          <p>{bill.loanNo}</p>
          <p>{user.firstName + ' ' + user.lastName}</p>
          <p>{bill.isPayment ? 'Payment' : 'Loan'}</p>
          <p>{bill.paidAmount}</p>
          <p>{bill.paidDues}</p>
        </div>
      )}
      {content}
    </div>
  );
}

export default AllBills
