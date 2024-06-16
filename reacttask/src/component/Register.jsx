import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const redirect = useNavigate()
    let initialState = {username:'',email:'',password:'',cpassword:''}
    let [user,setuser] =useState({...initialState})
    let [errors,seterrors]=useState({})


                    //   From Validation code
    let validation=(user)=>{
        let myerrors={}
          //username
        let pexpu = /^[a-zA-Z]+$/
        if(user.username==''){
            myerrors.unameerr = 'Username is Required'
        }
        else if(!pexpu.test(user.username)){
            myerrors.unameerr = "Alphabets only" 
        }
         
          //email
        let pexpemail=/^([A-Za-z0-9\@\#\$\%\&\*\-\.\^]+)\@([\w]+)\.([A-Za-z]{3})$/
        if(user.email==''){
         myerrors.emailerr="Email is required"
        }
        else if(!pexpemail.test(user.email)){
          myerrors.emailerr=" at least 1 upper case,at least 1 is lower cse,at least 1 is spacial symbol,at least 1 is digit"
        }

          //password
        let pexppass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\+|-|.]).{8,12}$/
        if(user.password==''){
         myerrors.passworderr="Password is required"
        }
        else if(!pexppass.test(user.password)){
           myerrors.passworderr=" at least 1 upper case,at least 1 is lower cse,at least 1 is spacial symbol,at least 1 is digit"
        }

          //cpassword
        if(user.cpassword==''){
            myerrors.cpassworderr = 'Confirm Password is Required'
        }
        else if(!pexppass.test(user.cpassword)){
            myerrors.cpassworderr=" at least 1 upper case,at least 1 is lower cse,at least 1 is spacial symbol,at least 1 is digit"
         }
         
        return myerrors
  }

    let handleSubmit = async(e)=>{
        e.preventDefault()
        
             //post data to json file
      try{
             await axios.post("http://localhost:1000/register",{...user,"id":Date.now()})
             toast.success("Register Successfully")
             redirect('/login')
      }
   catch(err){toast.error(err.message)}
         
        // alert(JSON.stringify(user))
        let myerrors = validation(user)  //from error object
        if(Object.keys(myerrors).length==0){
            // alert(JSON.stringify(user)) 
        }
        else{seterrors(myerrors)}
    }
  return (
    <div className='container fluid col-4' >
            <h1 className='text-center'>Register Page</h1><br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-group">
                    <label >User Name</label>
                    <input className="form-control"  placeholder='Enter User Name' 
                    value={user.username} onChange={(e)=>setuser({...user,username:e.target.value})} />
                </div>
                {errors.unameerr && <span className='text-danger'>{errors.unameerr}</span>}

                <div className="mb-3 form-group">
                    <label >Email</label>
                    <input type="email" className="form-control"  placeholder='Enter Email'
                    value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})} />
                </div>
                {errors.emailerr && <span className='text-danger'>{errors.emailerr}</span>}


                <div className="mb-3 form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  placeholder='Enter Password'
                    value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} />
                </div>
                {errors.passworderr && <span className='text-danger'>{errors.passworderr}</span>}


                <div className="mb-3 form-group">
                    <label > Confirm Password</label>
                    <input type="password" className="form-control"  placeholder='Enter Confirm Password'
                    value={user.cpassword}  onChange={(e)=>setuser({...user,cpassword:e.target.value})}/>
                </div>
                {errors.cpassworderr && <span className='text-danger'>{errors.cpassworderr}</span>}


                <div className="d-grid gap-2 col-2 mx-auto">
                    <button type="submit" className='btn btn-success'>Register</button>
                </div>
            </form>
            
            <p className="mt-3 text-center">Already an Account?? <Link to='/login'>Login</Link></p>

    </div>
  )
}

export default Register
