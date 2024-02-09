import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function LoanCard({ loan }) {
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [isToView, setIsToView] =useState(false);

  let veiwDetail ;
  let mask;

 const formatDate = (date) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
   return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (loan) {
      async function fetchData() {
        try {
          const res = await axios.post('http://localhost:3001/user/getUser', {
            message: 'id',
            value: loan.UserId,
          });
          if (res.data.message === 'userfound') {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      if (loan.date) {
        const formattedDate = formatDate(loan.date);
        setDate(formattedDate);
      }

      fetchData();
    }
  }, [loan]);

  if(isToView)
  {
    veiwDetail = <SingleLoanContainer>
      {Object.values(loan.dues).map((monthData) => (
        <DueWithoutPay key={monthData._id} monthData={monthData} />
        ))}
    </SingleLoanContainer>

    mask= <MenuMask onClick={()=>{setIsToView(false)}}></MenuMask>
  }

  return (
    <LoanCardContainer>
      {loan && user&&(
        <Values onClick={()=>{setIsToView(true)}}>
          <p>{date && date}</p>
          <p>{loan.billNo}</p>
          <p>{loan.loanNo}</p>
          <p>{loan.UserId}</p>
          <p>{user.firstName+' '+user.lastName}</p>
          <p>{user.address}</p>
          <p>{user.mobile}</p>
          <p>{loan.loanAmount}</p>
          <p>{loan.pendingAmount}</p>
          
          
        </Values>
      )}
      {veiwDetail}
      {mask}
    </LoanCardContainer>
  );
}


function Due({monthData, getPaidDues})
{
    const [isClicked, setIsClicked] = useState(true);
    const formatDate = (date) => {
      const day = date.substring(8, 10)
      const month = date.substring(5, 7)
      const year = date.substring(0, 4)
      return `${day}/${month}/${year}`;
    };

  const handlePay = ()=>{
    setIsClicked(false)
     getPaidDues(monthData);
  }

return (
    <DueCon >
      <Temp className={monthData.isPaid?'paid':monthData.isHasOverDue?'overDue':'notPaid'}>
        <p>Due Date : {formatDate(monthData.date)}</p>
        <p >amount pending: {monthData.amount}</p>
        <p>bill No : {monthData.billNo}</p>
        <p>Over Due Amount : {monthData.overDueAmount}</p>
        {!monthData.isPaid && isClicked&& <button onClick={handlePay}>pay</button>}
        {monthData.isPaid && <p>paid On : {formatDate(monthData.paidDate)}</p>}
      </Temp>

    </DueCon>
  );
}
function DueWithoutPay({monthData})
{
  const formatDate = (date) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
   return `${day}/${month}/${year}`;
  };


return (
    <DueCon >
      <Temp className={monthData.isPaid?'paid':monthData.isHasOverDue?'overDue':'notPaid'}>
        <p>Due Date : {formatDate(monthData.date)}</p>
        <p >amount pending {monthData.amount}</p>
        <p>bill No : {monthData.billNo}</p>
        <p>Over Due Amount : {monthData.overDueAmount}</p>
      </Temp>

    </DueCon>
  );
}

const Temp = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
`;
const SingleLoanContainer= styled.div`
  position : absolute;
  top: 0px;
  z-index: 6;
`;

const DueCon= styled.div`

    .paid{
      background-color: green;
    }

    .notPaid{
        background-color: yellow;
    }

    .overDue{
      background-color: red;
    }

`;
const MenuMask = styled.div`
    top: 0px;
    position : fixed;
    height: 100%;
    width: 100%;
    background-color: #22211f7e;
    z-index: 4;
`;

const LoanCardContainer = styled.div`
  position: relative;
  height: 30px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  padding: 10px;
  justify-content: center;
`;

const Values = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  p {
    font-size: 12px;
    width: 100px;
  }
`;

export default LoanCard;

export {Due, DueWithoutPay}
