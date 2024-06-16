import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const redirect = useNavigate()
    let [user,setuser] = useState({email:'',password:''})
    let [errors,seterrors]=useState({})


                     //   From Validation code
    let validation=(user)=>{
        let myerrors={}
        let pexpemail=/^([A-Za-z0-9\@\#\$\%\&\*\-\.\^]+)\@([\w]+)\.([A-Za-z]{3})$/
        if(user.email==''){
         myerrors.emailerr="Email is required"
        }
        else if(!pexpemail.test(user.email)){
          myerrors.emailerr=" at least 1 upper case,at least 1 is lower cse,at least 1 is spacial symbol,at least 1 is digit"
        }

        let pexppass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\+|-|.]).{8,12}$/
        if(user.password==''){
         myerrors.passworderr="Password is required"
        }
        else if(!pexppass.test(user.password)){
           myerrors.passworderr=" at least 1 upper case,at least 1 is lower cse,at least 1 is spacial symbol,at least 1 is digit"
        }
        return myerrors
  }

  let handleSubmit = async(e)=>{
    e.preventDefault()
    // alert(JSON.stringify(user))

               //post data to json file
      try{
        //    await axios.post("http://localhost:1000/users",{...user,"id":Date.now()})
        //    toast.success("Login Successfully")
        // let res = await axios.get(`http://localhost:1000/users?email=${user.email}`)
        let res = await axios.get(`http://localhost:1000/users?email=${user.email}`);
        console.log(res.data[0])
        if(res.data[0].password == user.password){
            toast.success("login successfull")
            redirect('/accountdetail')
        }
        else toast.error("Invalid credentials")
      }
      catch(err){toast.error("Invalid credentials")}

    let myerrors = validation(user)
    if(Object.keys(myerrors).length==0){
        // alert(JSON.stringify(user)) 
    }
    else{seterrors(myerrors)}
}

    return (
        <div className='container fluid col-4' >
            <h1 className='text-center'>Login Page</h1><br />
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3 form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder='Enter Email' 
                    value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})} />
                </div>
                {errors.emailerr && <span className='text-danger'>{errors.emailerr}</span>}


                <div className="mb-3 form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder='Enter Password' 
                    value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})}/>
                </div>
                {errors.passworderr && <span className='text-danger'>{errors.passworderr}</span>}


                <div className="d-grid gap-2 col-2 mx-auto">
                    <button type="submit" className='btn btn-success'>Login</button>
                </div>
            </form>
            <p className="mt-3 text-center">Create an Account?? <Link to='/register'>SignUp</Link></p>
        </div>
    );
};

export default Login;
