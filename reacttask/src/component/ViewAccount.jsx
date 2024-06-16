import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const ViewAccount = () => {
    let [account,setaccount] = useState([])
    useEffect(()=>{
         getdata()
    },[])

    //Code for get data
    let getdata = async()=>{
       try{
            let res = await axios.get("http://localhost:1000/account")
             setaccount(res.data    )
       }
       catch(err){toast.error(err.message)}
    }

    {/* Delete function */}

  let handleDelete=async(id)=>{
    if(window.confirm("are you sure you want to delete??")){
      try{
           await axios.delete(`http://localhost:1000/account/${id}`)
           toast.success("Account deleted")
           getdata()
      }
      catch(err){toast.error(err.message)}
    }
  }
  
  return (
    <div className='container fluid col-12'>
       <h1>View Account Details</h1>
       <div>
       <table class="table table-bordered">
  <thead>
    <tr>
      <th>id</th>
      <th>Account No.</th>
      <th>FullName</th>
      <th>City</th>
      <th>State</th>
      <th>Address</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {account.length == 0 && <tr><td colSpan={6}>No Account Found</td></tr>}
    {account.map((account,i)=>
    <tr key={account.id}>
      <th>{account.id}</th>
      <td>{account.accountno}</td>
      <td>{account.fullname}</td>
      <td>{account.city}</td>
      <td>{account.state}</td>
      <td>{account.address}</td>
      <td>
          <Link to={`/edit/${account.id}`} type='button' className = 'btn btn-success btn-lg float-end'>Add Account</Link>
          <button type="button" className='btn btn-danger' onClick={()=>handleDelete(account.id)} >Delete</button>
      </td>
    </tr>
    )}
  </tbody>
</table>
       </div>
    </div>
  )
}

export default ViewAccount
