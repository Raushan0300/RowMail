'use client';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import AutoResizeTextArea from '../components/AutoResizeTextArea';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Compose = (props:any) => {
    const {setIsCompose} = props;

    const [isCC, setIsCC] = useState(false);
    const [isBCC, setIsBCC] = useState(false);


  return (
    <div className={`flex flex-col justify-between w-full sm:w-[75%] bg-white h-screen py-2.5`}>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full">
        <div className="flex justify-between gap-5 items-center px-5 border-b pb-1.5">
          <ArrowBackIcon className="cursor-pointer text-[#8A95AD] text-[18px]" onClick={()=>{setIsCompose(false)}} />
          <div className="flex gap-3 items-center">
            <AttachFileIcon className="cursor-pointer text-[#8A95AD] text-[18px]" />
            <ScheduleSendIcon className="cursor-pointer text-[#8A95AD] text-[18px]" />
            <button className='text-[12px] font-bold text-white bg-[#4834F6] px-4 py-1.5 rounded-lg hover:bg-[#3479BD]'>Send</button>
          </div>
        </div>
        <div className='flex flex-col pt-2.5 px-5 gap-3 text-[14px] text-[#0E0E23]'>
            <div className='flex justify-between items-center border-b'>
              <div className='flex gap-2 items-center w-full'>
              <p>To: </p>
              <input type="text" placeholder="To" className="w-full outline-none" />
              </div>
              <div className='flex gap-2 items-center'>
              {!isCC&&<p className='cursor-pointer hover:underline' onClick={()=>{setIsCC(true)}}>CC</p>}
              {!isBCC&&<p className='cursor-pointer hover:underline' onClick={()=>{setIsBCC(true)}}>BCC</p>}
              </div>
            </div>
            {isCC&&<div className='flex gap-2 items-center border-b'>
              <p>CC: </p>
              <input type="text" placeholder="CC" className="w-full outline-none" />
            </div>}
            {isBCC&&<div className='flex gap-2 items-center border-b'>
              <p>BCC: </p>
              <input type="text" placeholder="BCC" className="w-full outline-none" />
            </div>}
            <div className='flex gap-2 items-center border-b'>
              <p>Subject: </p>
              <input type="text" placeholder="Subject" className="w-full outline-none" />
            </div>
            <AutoResizeTextArea minHeight='30vh' />
        </div>
        
          </div>
        </div>
    </div>
  )
};

export default Compose;