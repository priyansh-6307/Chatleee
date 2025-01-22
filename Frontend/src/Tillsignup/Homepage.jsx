import React from 'react';
import frontpage from '/frontpage.png';
import { Link } from 'react-router-dom';





const Homepage = () => {


  return (
    <div
    className="h-screen w-full font-poppins  bg-zinc-950"
  >
<div className=' text-white  align-center '>
  <h1 className='font-bold text-5xl h-40 flex items-center justify-center'>Chatlee</h1>
  <div className='w-full flex items-center justify-center'><img className='h-56 flex items-center justify-center '  src={frontpage} alt="" /></div>
  
  <h1 className=' font-semibold text-2xl flex items-center justify-center w-full mt-12 '>Break the boudaries and connect with people all over the world...</h1>
  <div className='w-full flex items-center justify-center'>
     <Link to='/sign-up' className='bg-gradient-to-r from-green-500 to-teal-500 mt-5 rounded-xl hover:text-zinc-700  p-4 w-[10%]  font-semibold flex items-center justify-center text-zinc-900'> Get Started</Link>
     </div>

</div>

  </div>
  );
};

export default Homepage;





















