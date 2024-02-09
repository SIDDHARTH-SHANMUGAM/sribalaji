import React from 'react'
import './Bill.css'
function Bill({bill, user}) {
  const formatDate = (date) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
   return `${day}/${month}/${year}`;
  };
  return (
    <div className='billContainer'>
      <div className='flex'>
      <div className='upper'>
        <div>
          <p>Date :</p>
          <p>{formatDate(bill.date)}</p>
        </div>
        <div>
          <p>Bill No :</p>
          <p>{bill.billNo}</p>
        </div>
        <div>
          <p>Loan Type :</p>
          <p>{bill.loanType}</p>
        </div>
      </div>
      <div style={{padding: '10px'}}></div>
      <div className='profileContainer'>
          {user.UserId&&<>
          <div className='profileCard'> 
              <div className='imgContainer'>
                  {user.imageUrl&&<img src={user.imageUrl} alt='sorry' />}
              </div>
              <div>
                  <input
                      type="text"
                      value={user.UserId}
                      readOnly
                  />
                  <span>User Id</span>
              </div>
              <div>
                  <input
                      type="text"
                      value={user.firstName+' '+user.lastName}
                      readOnly
                  />
                  <span>User Name</span>
              </div>
              <div>
                  <input
                      type="text"
                      value={user.mobile}
                      readOnly
                  />
                  <span>User Mobile</span>
              </div>
              <div>
                  <input
                      type="text"
                      value={user.address}
                      readOnly
                  />
                  <span>User Address</span>
              </div>
          </div>
          </>}
          <div style={{width: '40px'}}></div>
          <div className='profileCard'>
            <p> <h4 >Transaction Type:</h4> {bill.isPayment?"Payment":"Loan"}</p>
            {
              bill.isPayment&&
              <>
              <p> <h4 >Paid Amount:</h4> {bill.paidAmount}</p>
              <p> <h4 >Dues Paid:</h4> {bill.paidDues}</p>
              </>
            }
            {
              !bill.isPayment&&
              <>
              <p> <h4 >Recieved Amount:</h4> {bill.receivedAmount}</p>
              </>
            }
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default Bill
