import axios from 'axios';
import React, { useEffect, useState , useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Payment from './Payment';
import { useReactToPrint } from 'react-to-print';

function MakeBill() {
    const [payOrReceive, setPayOrReceive] = useState('payment');
    const [billNo, setBillNo] = useState('');
    const [loanNo, setLoanNo] = useState('');
    const [loanType, setLoanType] = useState('monthly');
    const [mobile, setMobile] = useState('');
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [address, setaddress] = useState('');
    const [guarantorName, setGuarantorUserName] = useState('');
    const [guarantor, setGuarantor] = useState('');
    const [guarantorMobile, setGuarantorMobile] = useState('');
    const [guarantorId, setGuarantorUserId] = useState('');
    const [guarantorAddress, setGuarantorAddress] = useState('');
    const [amount, setAmount ] =useState('');
    const [message, setMessage ] = useState('');
    let monthlyLoan;
    let pay;
    let rec;
    const navigate= useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();  

        try {

            await axios.post('http://localhost:3001/addLoan', {
            billNo,
            loanNo,
            userId,
            guarantorId,
            amount
            }).then(
                async (res)=>{
                    if(res.data.message==='loanAdded')
                    {
                        await axios.post('http://localhost:3001/confirmIncremented', { reqId: 'billId' }).then( async()=>{
                            await axios.post('http://localhost:3001/confirmIncremented', { reqId: 'mlLoanId' }).then(async() =>{
                                navigate('/admin');
                            })
                        })
                    }
                }
            );

        } catch (error) {
            console.error('An error occurred:', error);
        }
};

    useEffect( ()=>
    {
        async function get(){
            await axios.post('http://localhost:3001/getId',{reqId:'billId'})
            .then(res =>{
                setBillNo(res.data+1)
            })
            if(payOrReceive!=='payment'&&loanType==='monthly')
            {
                await axios.post('http://localhost:3001/getId',{reqId:'mlLoanId'})
                .then(res =>{
                    setLoanNo(res.data+1)
                })
            }
        }
        get();
    })

    const handUserId = async(e)=>{
        setUserId(e.target.value);
        setUser('')
        setMessage('')
        setMobile('')
        setUserName('')
        setaddress('')
        const x =e.target.value;
        if(x.toString().length===9)
        {
            await axios.post('http://localhost:3001/getUser', {message: 'id', value: e.target.value})
            .then(res=>{
                if(res.data.message==='userfound')
                {
                    const user = res.data.user;
                    setUser(user);
                    setMobile(user.mobile)
                    setUserName(user.firstName+user.lastName);
                    setaddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setMessage('user Not found');
                }
            })
        }
        else if(x.toString().length>9)
        {
            setMessage('Id is Only 9 digit');
        }
    }
    const handGuarantorId = async(e)=>{
        setGuarantorUserId(e.target.value);
        setGuarantor('')
        setMessage('')
        setGuarantorMobile('')
        setGuarantorUserName('')
        setGuarantorAddress('')
        const x =e.target.value;
        if(x.toString().length===9)
        {
            await axios.post('http://localhost:3001/getUser', {message: 'id', value: e.target.value})
            .then(res=>{
                if(res.data.message==='userfound')
                {
                    const user = res.data.user;
                    setGuarantor(user);
                    setGuarantorMobile(user.mobile)
                    setGuarantorUserName(user.firstName+user.lastName);
                    setGuarantorAddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setMessage('Guarator Not found');
                }
            })
        }
        else if(x.toString().length>9)
        {
            setMessage('Id is Only 9 digit');
        }
    }

    const handUserMobile = async(e)=>{
        setMobile(e.target.value)
        setUser('')
        setMessage('');
        setUserId('');
        setUserName('');
        setaddress('');
        const x =e.target.value;
        if(x.toString().length===10)
        {
            await axios.post('http://localhost:3001/getUser', {message: 'mobile', value: e.target.value})
            .then(res=>{
                if(res.data.message==='userfound')
                {
                    const user= res.data.user;
                    setUser(user)
                    setUserId(user.UserId)
                    setUserName(user.firstName+' '+user.lastName);
                    setaddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setMessage('user Not found');
                }
            })
        }else if(x.toString().length>10)
        {
            setMessage('Mobile number is Only 10 digit');
        }

    }
    const handGuarantorMobile = async(e)=>{
        setGuarantorMobile(e.target.value)
        setMessage('');
        setGuarantor('')
        setGuarantorAddress('');
        setGuarantorUserName('');
        setGuarantorUserId('');
        const x =e.target.value;
        if(x.toString().length===10)
        {
            await axios.post('http://localhost:3001/getUser', {message: 'mobile', value: e.target.value})
            .then(res=>{
                if(res.data.message==='userfound')
                {
                    const user= res.data.user;
                    setGuarantor(user)
                    setGuarantorUserId(user.UserId)
                    setGuarantorUserName(user.firstName+' '+user.lastName);
                    setGuarantorAddress(user.address)
                }
                else if(res.data.message==='usernotfound'){
                    setMessage('user Not found');
                }
            })
        }else if(x.toString().length>10)
        {
            setMessage('Mobile number is Only 10 digit');
        }

    }
   

    if(payOrReceive==='payment')
    {
        pay=<Payment/>
    }
    if(payOrReceive==='receive')
    {
         if(loanType==='monthly')
        {
            monthlyLoan= <>
                <Temp>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e)=>{setAmount(e.target.value)}}
                        required
                    />
                    <span>Amount</span>
                </Temp>
                <Per>
                    <input
                        type="text"
                        value={'3.6'}
                        readOnly
                    />
                    <span>Intrest rate</span>
                </Per>
            </>
        }
        
        rec=<>
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
        <ProfileCards>
            <User>
                {user.imageUrl&&<img src={user.imageUrl} alt='sorry' />}
                <Temp>
                    <input
                        type="text"
                        value={userId}
                        onChange={handUserId}
                        required
                    />
                    <span>User Id</span>
                </Temp>
                <Temp>
                    <input
                        type="text"
                        value={mobile}
                        onChange={handUserMobile}
                        required
                    />
                    <span>User Mobile</span>
                </Temp>
                {userName&&<>
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
                        value={address}
                        readOnly
                    />
                    <span>User Address</span>
                </Per>
                </>
                }
            </User>
            <Guarantor>
                {guarantor.imageUrl&&<img src={guarantor.imageUrl} alt='sorry' />}
                <Temp>
                    <input
                        type="text"
                        value={guarantorId}
                        onChange={handGuarantorId}
                        required
                    />
                    <span>Guarantor Id</span>
                </Temp>
                <Temp>
                    <input
                        type="text"
                        value={guarantorMobile}
                        onChange={handGuarantorMobile}
                        required
                    />
                    <span>Guarantor Mobile</span>
                </Temp>
                {guarantorName&&<>
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
                            value={guarantorAddress}
                            readOnly
                        />
                        <span>Guarantor Address</span>
                    </Per>
                </>}
            </Guarantor>
        </ProfileCards>
            <Per>
                <input
                    type="text"
                    value={loanNo}
                    readOnly
                />
                <span>Laon No</span>
            </Per>
            {monthlyLoan}

        <button type="submit">Submit</button>
        </>
    }

    const formatDate = () => {
        const formattedDate = new Date();
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const year = formattedDate.getFullYear();

        return `${day}/${month}/${year}`;
    };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <BillsContainer ref={componentRef}>
        {/* <button onClick={handlePrint}>Print this out!</button>      */}
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <Header>
                    <Today>
                        <p>Today: {formatDate()}</p>
                    </Today>
                    <BillNo>
                        <p>Bill: {billNo}</p>
                    </BillNo>
                    <div>
                        <select
                            value={payOrReceive}
                            onChange={(e)=>{
                                const state = e.target.value
                                setPayOrReceive(state)
                            }}
                        >
                            <option value="payment" defaultValue={''}>Payment</option>
                            <option value="receive">Receive</option>
                        </select>
                    </div>
                </Header>
                {pay}
                {rec}
            </form>
        </FormContainer>
        <MessageContainer>
            {message&&message}
        </MessageContainer>
    </BillsContainer>
  )
}

const Per = styled.div`
    padding: 5px;
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
        left: 12px;
        font-size: 12px;
        background-color: #53e3a6;
        text-transform: uppercase;
        padding: 2px;
        border-radius: 2px;
    }
`;
const Temp = styled.div`
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
`;
const Guarantor = styled.div`
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
    border-radius: 10px;
    width: 320px;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const BillNo = styled.div`
`;

const Today = styled.div`
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
const MessageContainer = styled.div`
    width: auto;
    color: red;
    font-size: 40px;
`;

const BillsContainer = styled.div`
    position: relative;
    top: 100px;
    left: 0px;
    right: 0px;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white; 

    div{
        padding: 10px;
    }

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

const FormContainer = styled.div`
    form{
        display: flex;
        flex-direction: column;
    }
`;

const User =styled.div`
    box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.368);
    border-radius: 10px;
    width: 320px;
`;
export default MakeBill
