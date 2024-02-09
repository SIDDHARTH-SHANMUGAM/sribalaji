import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../Navbar/Navbar';

function History() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [loansAsBorrower, setLoansAsBorrower] = useState('');
    const [loansAsGaurantor, setLoansAsGaurantor] = useState('');
    useEffect( ()=>
    {
        async function fetchData()
        {
            await axios.post('http://localhost:3001/monthlyLoan/getAllLoans', {message:'getAsBorrower', UserId: user.UserId}).then(res=>{
                if(res.data.message==='got')
                {
                    setLoansAsBorrower(res.data.loans);
                }
            })
        }
        fetchData();
    },[])
    useEffect( ()=>
    {
        async function fetchData()
        {
            await axios.post('http://localhost:3001/monthlyLoan/getAllLoans', {message:'getAsGaurantor', UserId: user.UserId}).then(res=>{
                if(res.data.message==='got')
                {
                    setLoansAsGaurantor(res.data.loans);
                }
            })
        }
        fetchData();
    },[])

    console.log( loansAsGaurantor);
  return (
    <HistoryContainer>
        <Navbar/>
    </HistoryContainer>
  )
}

const HistoryContainer = styled.div`

`;

export default History
