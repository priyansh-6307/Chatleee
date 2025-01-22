import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import modern from '/modern.png'
import { Link,useNavigate } from 'react-router-dom'


const Signin = ({socket}) => {
const [Values,setValues]=useState({
  Email:"",
  Password:""
  
})
const navigate=useNavigate()

const change=(e)=>{
  const {name,value}=e.target;
  setValues({...Values,[name]:value})
}

const submit=async()=>{
try {
  if(Values.Email===""|| Values.Password===""){
    alert("All fields are Required!!")
  }
  else{
    const response=await axios.post('https://chatleee.onrender.com/api/v1/sign-in',Values) 
   localStorage.setItem("id",response.data.id)
   localStorage.setItem("token",response.data.token)
   localStorage.setItem('username',response.data.username)

    console.log(response)
    navigate("/Account")
  }
} catch (err) {
  console.log(err)
}
}



  return (
    <div  className=" bg-zinc-900 flex justify-center items-center bg-cover w-full h-screen">
    <div className="bg-zinc-900 text-gray-300 px-6 py-6 rounded-lg md:w-[75%] lg:w-2/6 mt-20 mb-20">
  <div className='w-full h-0 flex items-center justify-center'><img className='h-40 flex items-center justify-center '  src={modern} alt="" /></div>

  <div className='secondterm mt-20'>
    <label htmlFor="email">Email <span className="text-red-500">*</span></label>
    <input type="email" name="Email" 
    value={Values.Email} placeholder='joe@gmail.com' onChange={change} className='bg-gray-800 text-gray-500 outline-none p-2 w-full rounded mt-4'  />
  </div>
  <div className='thirdterm mt-2'>
    <label htmlFor="password">Password<span className="text-red-500">*</span></label>
    <input type="Password" name='Password' value={Values.Password}  placeholder='Password' onChange={change} className='bg-gray-800 text-gray-500 outline-none p-2 w-full rounded mt-4'  />
  </div>
  <div className='Fourthterm mt-2'>
   
     <div className='mt-8 '>
      <button onClick={submit}   className=  'bg-gradient-to-r from-green-500 text-gray-900 to-teal-500 px-4 py-3 rounded w-full text-center font-semibold ' >Log In
      </button>
     </div>
     <h3 className='w-full text-center mt-5'>Or</h3>
     <div className='w-full mt-4 flex items-center justify-center gap-1'>
    <p>Don't Have any Account?</p>
    <Link to="/sign-up" className='text-blue-600 hover:text-blue-500 font-semibold underline'>SignUp</Link>
   
     </div>
  </div>



    </div>



  </div>
  )
}

export default Signin