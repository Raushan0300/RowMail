'use client';
import { useEffect } from 'react';

export default function PageClient() {
  useEffect(()=>{
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if(token){
      localStorage.setItem('token',token);
      window.location.href = '/dashboard';
    } else{
      const token = localStorage.getItem('token');
      if(token){
        window.location.href = '/dashboard';
      }
    }
  },[]);
  const handleLogin = async()=>{
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <button className='flex justify-between items-center gap-3 py-2 px-5 rounded-[10px] text-[#111111] text-[18px] font-bold border-2 border-[#333]' onClick={handleLogin}>
        <img src="/googleicon.svg" alt="Google" width={30} />
        Login with Google
      </button>
    </div>
  );
}
