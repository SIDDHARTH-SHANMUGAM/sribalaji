import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import { Due, DueWithoutPay } from './LoanCard';

function Payment() {
    
    const [payLoanNo, setPayLoanNo] = useState('');
    const [loanType, setLoanType] = useState('monthly');
    const [mobile, setMobile] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage ] = useState('');
    const [guarantor, setGuarantor] = useState('');
    const [guarantorName, setGuarantorUserName] = useState('');
    const [guarantorMobile, setGuarantorMobile] = useState('');
    const [guarantorId, setGuarantorUserId] = useState('');
    const [guarantorAddress, setGuarantorAddress] = useState('');
    const [loan, setLoan] = useState('');
    const [user, setUser] = useState('');
    const [payDues, setPayDues] = useState([]);
    const [showBill, setShowBill] = useState(false);



    const handleLoanNo = async(e)=>{
        setPayLoanNo(e.target.value)
        setMessage('')
        setUserId('')
        setMobile('')
        setUserName('')
        setAddress('')
        setGuarantorMobile('')
        setGuarantorUserName('');
        setGuarantorAddress('')
        setGuarantorUserId('')

        if(e.target.value)
        {
            await axios.post('http://localhost:3001/getLoan', {
                message:'monthly', loanNo: e.target.value
            }).then(async res=>{
                if(res.data.message==='got')
                {
                    const loan = res.data.loan;
                    setUserId(loan.UserId);
                    setGuarantorUserId(loan.guarantorId)
                    if(loan)
                    {
                        setLoan(loan);
                        await axios.post('http://localhost:3001/getUser', {message: 'id', value: loan.UserId})
                        .then(res=>{
                            if(res.data.message==='userfound')
                            {
                                const user= res.data.user;
                                setUser(user);
                                setMobile(user.mobile)
                                setUserName(user.firstName+" "+user.lastName);
                                setAddress(user.address)
                            }
                            else if(res.data.message==='usernotfound'){
                                setMessage('user Not found');
                            }
                        })
                        await axios.post('http://localhost:3001/getUser', {message: 'id', value: loan.guarantorId})
                        .then(res=>{
                            if(res.data.message==='userfound')
                            {
                                const user= res.data.user;
                                setGuarantor(user);
                                setGuarantorMobile(user.mobile)
                                setGuarantorUserName(user.firstName+" "+user.lastName);
                                setGuarantorAddress(user.address)
                            }
                            else if(res.data.message==='usernotfound'){
                                setMessage('Guarantor Not found');
                            }
                        })
                    }

                }
                else
                {
                    setMessage('Loan Not found');
                }
            }).catch(err =>{
                console.log(err);
            })
        }
    }

    const paidDues =(monthData)=>{
        if (payDues.indexOf(monthData) === -1) {
            setPayDues([...payDues, monthData]);
        }
    }

    const handleBill =async ()=>{
        if(payDues)
        {
            await axios.post('http://localhost:3001/handleBill',{
                loanId : loan.loanNo , paidDues: payDues
            }).then((res)=>{
                if(res.data.message==='done')
                {
                    setLoan(res.data.loan);
                    setShowBill(true);
                }
            })
        }
    }

    let billMask ;
    if(showBill)
        billMask = <Bill loan={loan} user={user}/>
    
  return (
        <>
            <div>
                <label>Loan Type</label>
                <select
                    value={loanType}
                    onChange={(e)=>{
                        const state = e.target.value
                        setLoanType(state)
                    }}
                >
                    <option value="monthly" defaultValue={''}>Monthly Loan</option>
                    <option value="yearly">Yearly Loan</option>
                    <option value="emergency">Emergency Loan</option>
                    <option value="int">INT</option>
                </select>
            </div>
            <div>
                <label>Laon No</label>
                <input
                    type="text"
                    value={payLoanNo}
                    onChange={handleLoanNo}
                    required
                />
            </div>
            <ProfileCards>
                    {userId&&<>
                    <User>
                        {user.imageUrl&&<img src={user.imageUrl} alt='sorry' />}
                        <Per>
                            <input
                                type="text"
                                value={userId}
                                readOnly
                            />
                            <span>User Id</span>
                        </Per>
                        <Per>
                            <input
                                type="text"
                                value={userName}
                                readOnly
                            />
                            <span>User Name</span>
                        </Per>
                        <Per>
                            <input
                                type="text"
                                value={mobile}
                                readOnly
                            />
                            <span>User Mobile</span>
                        </Per>
                        <Per>
                            <input
                                type="text"
                                value={address}
                                readOnly
                            />
                            <span>User Address</span>
                        </Per>
                    </User>
                    <Guarantor>
                    {guarantor.imageUrl&&<img src={guarantor.imageUrl} alt='sorry' />}
                    <Per>
                        <input
                            type="text"
                            value={guarantorId}
                            readOnly
                        />
                        <span>Guarantor Id</span>
                    </Per>
                    <Per>
                        <input
                            type="text"
                            value={guarantorName}
                            readOnly
                        />
                        <span>Guarantor Name</span>
                    </Per>
                    <Per>
                        <input
                            type="text"
                            value={guarantorMobile}
                            readOnly
                        />
                        <span>Guarantor Mobile</span>
                    </Per>
                    <Per>
                        <input
                            type="text"
                            value={guarantorAddress}
                            readOnly
                        />
                        <span>Guarantor Address</span>
                    </Per>
                </Guarantor>
            </>}
        </ProfileCards>
        {!showBill&&userName&&<DuesContainer>
            {loan.dues && Object.values(loan.dues).map((monthData) => (
                <Due key={monthData._id} monthData={monthData} getPaidDues= {paidDues}/>
            ))}
        </DuesContainer>}
        {message&&message}

        {!showBill&&userName&&<button onClick={handleBill}>Get Bill</button>}
        {billMask}
    </>
  )
}
function Bill({loan, user})
{
    console.log(user, loan);

    return <BillContainer>
        <p>loanNo: {loan.loanNo}</p>
        <p>User Id: {user.UserId}</p>
        {loan.dues && Object.values(loan.dues).map((monthData) => (
                <DueWithoutPay key={monthData._id} monthData={monthData}/>
            ))}
    </BillContainer>
}

const Per = styled.div`
    input{
        width: 100%;
        border: 1px solid #53e3a6;
        border-radius: 3px;
        outline: none;
        height: 28px;
    }
    span{
        color: white;
        position: relative;
        top: -43px;
        font-size: 12px;
        text-transform: uppercase; 
        background-color: #53e3a6;
        padding: 2px;
        border-radius: 2px;
    }
`;

const User =styled.div`
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
    border-radius: 10px;
    width: 320px;
`;
const BillContainer = styled.div`
    top: 0px;
    right: 0px;
    heigth: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Guarantor = styled.div`
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
    border-radius: 10px;
    width: 320px;
`;
const DuesContainer = styled.div`
    display: flex;
    flex-direction:  column;
    width: auto;
`;
const ProfileCards = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: space-around;

    img{
    position: relative;
    left: 50px;
    height: 100px;
    width: 100px;
    border: 2px solid #53e3a6;
    border-radius: 20px;
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
  }
`;
export default Payment



