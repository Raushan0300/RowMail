'use client';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import AutoResizeTextArea from '../components/AutoResizeTextArea';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { postData } from '../config';
import { CircularProgress } from '@mui/material';

const Compose = (props:any) => {
    const {token, setIsCompose} = props;

    const [isCC, setIsCC] = useState(false);
    const [isBCC, setIsBCC] = useState(false);
    const [to, setTo] = useState('');
    const [cc, setCC] = useState('');
    const [bcc, setBCC] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);

    const [isSending, setIsSending] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleFileChange = (e:any) => {
      // const files = e.target.files;
      // if(files){
      //   setAttachments([...attachments, ...files]);
      // };
      setAttachments(Array.from(e.target.files));
    };


    const sendEmail=async()=>{
      if(!to || !subject || !body){
        alert('Please fill in the required fields');
        return;
      };
      if(!emailRegex.test(to)){
        alert('Invalid email address');
        return;
      };
      setIsSending(true);
      // const email = {to: to, cc: cc, bcc: bcc, subject: subject, body: body};
      const formData = new FormData();
      formData.append('to', to);
      formData.append('cc', cc);
      formData.append('bcc', bcc);
      formData.append('subject', subject);
      formData.append('body', body);
      attachments.forEach((file)=>{
        formData.append('attachments', file);
      });

      await postData('send', formData, {Authorization: `Bearer ${token}`});
      setIsSending(false);
    };


  return (
    <div className={`flex flex-col justify-between w-full sm:w-[75%] bg-white h-screen py-2.5`}>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full">
        <div className="flex justify-between gap-5 items-center px-5 border-b pb-1.5">
          <ArrowBackIcon className="cursor-pointer text-[#8A95AD] text-[18px]" onClick={()=>{setIsCompose(false)}} />
          <div className="flex gap-3 items-center">
          <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-input" />
              <label htmlFor="file-input">
                <AttachFileIcon className="cursor-pointer text-[#8A95AD] text-[18px]" />
              </label>
            <ScheduleSendIcon className="cursor-pointer text-[#8A95AD] text-[18px]" />
            {!isSending?<button className='text-[12px] font-bold text-white bg-[#4834F6] px-4 py-1.5 rounded-lg hover:bg-[#3479BD]' onClick={()=>{sendEmail()}}>Send</button>:<CircularProgress size={20} color='inherit' />}
          </div>
        </div>
        <div className='flex flex-col pt-2.5 px-5 gap-3 text-[14px] text-[#0E0E23]'>
            <div className='flex justify-between items-center border-b'>
              <div className='flex gap-2 items-center w-full'>
              <p>To: </p>
              <input type="text" placeholder="To" className="w-full outline-none" value={to} onChange={(e)=>{setTo(e.target.value)}} />
              </div>
              <div className='flex gap-2 items-center'>
              {!isCC&&<p className='cursor-pointer hover:underline' onClick={()=>{setIsCC(true)}}>CC</p>}
              {!isBCC&&<p className='cursor-pointer hover:underline' onClick={()=>{setIsBCC(true)}}>BCC</p>}
              </div>
            </div>
            {isCC&&<div className='flex gap-2 items-center border-b'>
              <p>CC: </p>
              <input type="text" placeholder="CC" className="w-full outline-none" value={cc} onChange={(e)=>{setCC(e.target.value)}} />
            </div>}
            {isBCC&&<div className='flex gap-2 items-center border-b'>
              <p>BCC: </p>
              <input type="text" placeholder="BCC" className="w-full outline-none" value={bcc} onChange={(e)=>{setBCC(e.target.value)}} />
            </div>}
            <div className='flex gap-2 items-center border-b'>
              <p>Subject: </p>
              <input type="text" placeholder="Subject" className="w-full outline-none" value={subject} onChange={(e)=>{setSubject(e.target.value)}} />
            </div>
            <AutoResizeTextArea minHeight='30vh' value={body} setValue={setBody} />
        </div>
        
          </div>
        </div>
    </div>
  )
};

export default Compose;