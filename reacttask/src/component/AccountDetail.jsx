import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AccountDetail = () => {
    const {id} = useParams()
    // console.log(id)
    const redirect = useNavigate()
    let AddAccountset = {accountno:'',fullname:'',city:'',state:'',address:''}
    let [account,setaccount] = useState({...AddAccountset})

    //Edit
    let getDtaUsingId = async()=>{
        try{
           let res = await axios.get(`http://localhost:1000/account/${id}`)
           setaccount(res.data)
       }
       catch(err){toast.error(err.message)}
    }
    useEffect(()=>{
        if(id){getDtaUsingId()}
        else{setaccount({...AddAccountset})}
    },[id])

              
    let handleSubmit = async(e)=>{
        e.preventDefault()
        if(!id){ //Add
                //post data to json file
            try{
                 await axios.post("http://localhost:1000/account",{...account,"id":Date.now()})
                 toast.success(" Add Account Details ")
                 redirect('/viewaccount')
               }
             catch(err){toast.error(err.message)}
             }
             else{ //update
                try{
                    await axios.put(`http://localhost:1000/account/${id}`,{...account,"id":Date.now()})
                    toast.success("Updated Account Details")
                    redirect('/viewaccount')
                  }
                catch(err){toast.error(err.message)}
             }
        }

  return (
    <div className='container fluid col-4' >
            <h1 className='text-center'>{id ? "Edit" : Add} Account Details Page</h1><br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-group">
                    <label>Account No</label>
                    <input className="form-control" type='number'  placeholder='Enter Account Number'
                      value={account.accountno} onChange={(e)=>setaccount({...account,accountno:e.target.value})} /> 
                </div>

                <div className="mb-3 form-group">
                    <label >Full Name</label>
                    <input className="form-control"  placeholder='Enter Full Name'
                    value={account.fullname} onChange={(e)=>setaccount({...account,fullname:e.target.value})} /> 
                    </div>


                <div className="mb-3 form-group">
                    <label>City</label>
                    <input  className="form-control"  placeholder='Enter Your City'
                    value={account.city} onChange={(e)=>setaccount({...account,city:e.target.value})} /> 
                    </div>


                <div className="mb-3 form-group">
                    <label >State</label>
                    <input className="form-control"  placeholder='Enter Your State'
                    value={account.state} onChange={(e)=>setaccount({...account,state:e.target.value})} /> 
                    </div>

                <div className="mb-3 form-group">
                    <label >Address</label>
                    <input className="form-control"  placeholder='Enter Your Address'
                    value={account.address} onChange={(e)=>setaccount({...account,address:e.target.value})} /> 
                    </div>


                <div class="d-grid gap-2 d-md-block">
                    <button type="submit" className='btn btn-success btn-lg me-4 '>{id? "Udate" : "Submit"}</button>
                    <button type="submit" className='btn btn-danger btn-lg'>View Account </button>
                </div>

            </form>

    </div>
  )
}

export default AccountDetail
