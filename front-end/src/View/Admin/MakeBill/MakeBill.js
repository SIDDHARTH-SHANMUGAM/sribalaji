import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState , useRef} from 'react'
import Payment from './Payment';
import './MakeBill.css'
import Bill from '../Bill/Bill';

// import { useReactToPrint } from 'react-to-print';

function MakeBill() {
    const [payOrReceive, setPayOrReceive] = useState('payment');
    const [billNo, setBillNo] = useState('');
    const [loanNo, setLoanNo] = useState('');
    const [loanType, setLoanType] = useState('monthly');
    const [mobile, setMobile] = useState('');
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [UserId, setUserId] = useState('');
    const [address, setaddress] = useState('');
    const [guarantorName, setGuarantorUserName] = useState('');
    const [guarantor, setGuarantor] = useState('');
    const [guarantorMobile, setGuarantorMobile] = useState('');
    const [guarantorId, setGuarantorUserId] = useState('');
    const [guarantorAddress, setGuarantorAddress] = useState('');
    const [amount, setAmount ] =useState('');
    const [message, setMessage ] = useState('');
    const [bill, setBill ] = useState('');
    const [view, setView] = useState(false);
    let pay;


    const handleSubmit = async (e) => {
        e.preventDefault();  

        try {
            await axios.post('http://localhost:3001/monthlyLoan/addLoan', {
            billNo,
            loanNo,
            UserId,
            guarantorId,
            amount
            }).then(
                async (res)=>{
                    console.log(res);
                    if(res.data.message==='loanAdded')
                    {
                        await axios.post('http://localhost:3001/counter/increament', { reqId: 'billId' }).then( async()=>{
                            const isPayment =false;
                            const receivedAmount= amount;
                            const paidAmount=0;
                            const paidDues='5Dues';
                            await axios.post('http://localhost:3001/bill/addBill', {
                                billNo, loanType, UserId, loanNo, isPayment, receivedAmount, paidAmount, paidDues
                            }).then(async (res)=>{
                                console.log(res)
                                if(res.data.message==='billAdded')
                                {
                                    await axios.post('http://localhost:3001/counter/increament', { reqId: 'mlLoanId' })
                                    setBill(res.data.bill);
                                    setView(true);
                                }
                            })
                        })
                    }
                }
            );
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const content = view ? <div className='billCC'><Bill bill={bill} user={user} /></div> : null;
    useEffect( ()=>
    {
        async function get(){
            await axios.post('http://localhost:3001/counter/getCounter',{reqId:'billId'})
            .then(res =>{
                setBillNo(res.data+1)
            })
            if(payOrReceive!=='payment'&&loanType==='monthly')
            {
                await axios.post('http://localhost:3001/counter/getCounter',{reqId:'mlLoanId'})
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
            await axios.post('http://localhost:3001/user/getUser', {message: 'id', value: e.target.value})
            .then(res=>{
                if(res.data.message==='userfound')
                {
                    const user = res.data.user;
                    setUser(user);
                    setMobile(user.mobile)
                    setUserName(user.firstName+' '+user.lastName);
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
            await axios.post('http://localhost:3001/user/getUser', {message: 'id', value: e.target.value})
            .then(res=>{
                if(res.data.message==='userfound')
                {
                    const user = res.data.user;
                    setGuarantor(user);
                    setGuarantorMobile(user.mobile)
                    setGuarantorUserName(user.firstName+' '+user.lastName);
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
            await axios.post('http://localhost:3001/user/getUser', {message: 'mobile', value: e.target.value})
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
            await axios.post('http://localhost:3001/user/getUser', {message: 'mobile', value: e.target.value})
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
        pay=<div className='formItems'>
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
        <div className='profileContainer'>
            <div className='profileCard'>
                <div className='imgContainer'>
                    {user.imageUrl&&<img src={user.imageUrl} alt='sorry' />}
                </div>
                <div>
                    <input
                        type="text"
                        value={UserId}
                        onChange={handUserId}
                        required
                    />
                    <span>User Id</span>
                </div>
                <div>
                    <input
                        type="text"
                        value={mobile}
                        onChange={handUserMobile}
                        required
                    />
                    <span>User Mobile</span>
                </div>
                {userName&&<>
                <div>
                    <input
                        type="text"
                        value={userName}
                        readOnly
                    />
                    <span>User Name</span>
                </div>
                <div>
                    <input
                        type="text"
                        value={address}
                        readOnly
                    />
                    <span>User Address</span>
                </div>
                </>
                }
            </div>
            <div className='profileCard'>
                <div className='imgContainer'>
                    {guarantor.imageUrl&&<img src={guarantor.imageUrl} alt='sorry' />}

                </div>
                <div>
                    <input
                        type="text"
                        value={guarantorId}
                        onChange={handGuarantorId}
                        required
                    />
                    <span>Guarantor Id</span>
                </div>
                <div>
                    <input
                        type="text"
                        value={guarantorMobile}
                        onChange={handGuarantorMobile}
                        required
                    />
                    <span>Guarantor Mobile</span>
                </div>
                {guarantorName&&<>
                    <div>
                        <input
                            type="text"
                            value={guarantorName}
                            readOnly
                        />
                        <span>Guarantor Name</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={guarantorAddress}
                            readOnly
                        />
                        <span>Guarantor Address</span>
                    </div>

                </>}
            </div>
        </div>
            <div>
                <input
                    type="text"
                    value={loanNo}
                    readOnly
                />
                <span>Laon No</span>
            </div>
            <div>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e)=>{setAmount(e.target.value)}}
                        required
                    />
                    <span>Amount</span>
                </div>
                <div className='interest'>
                    <input
                        type="text"
                        value={'3.6'}
                        readOnly
                        
                    />
                    <span>Intrest rate</span>
                </div>

        <button type="submit">Submit</button>
        </div>
    }

    const formatDate = () => {
        const formattedDate = new Date();
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const year = formattedDate.getFullYear();

        return `${day}/${month}/${year}`;
    };
    

//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
//         <button onClick={handlePrint}>Print this out!</button>     
// <div ref={componentRef}>

  return (
    <div className='makeBill'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='upperDiv'>
                    <div>
                        <p>Today: {formatDate()}</p>
                    </div>
                    <div>
                        <p>Bill: {billNo}</p>
                    </div>
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
                </div>
                {pay}
            </form>
        {
            content
        }
        </div>
        {message&&<p className='errorBox'>{message}</p>}
    </div>
  )
}

export default MakeBill