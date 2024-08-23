'use client';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailBox from './EmailBox';
import { useState } from 'react';
import he from 'he';

const SelectedOption = (props:any) => {
    const {messages, token} = props;
    const [messageId, setMessageId] = useState<any>('');
  return (
    <div className='flex w-[85%] bg-white'>
    <div className="flex flex-col w-[25%] h-screen py-2.5 border-r-2">
        <div className="flex justify-between border-b pb-2">
        <div className="flex items-center px-2 gap-3 w-[50%]">
        <h1 className="text-xl font-bold">Inbox</h1>
        <span className="text-[10px] text-[#8A95AD]">421 Unread</span>
        </div>
        <div className='flex gap-1 mr-2 items-center bg-[#F6F6F6] rounded-[5px] w-[50%] px-2'>
        <SearchOutlinedIcon className="text-[#8A95AD] text-[18px]" />
        <input type="text" placeholder='Search' className='bg-transparent placeholder:text-[12px] text-[12px] outline-none px-2 w-[95%]' />
        </div>
        </div>
        <div className='overflow-auto scrollbar-hide'>
        {messages !== 500?messages.map((message:any) => {
            const subjectHeader = message.payload.headers.find((header:any)=>header.name==='Subject')?.value;
            const date = new Date(Number(message.date));
            const formattedDate = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
            return(
                <div className={`flex gap-2 justify-between items-center py-2 px-2 border-b cursor-pointer ${message.labelIds.includes("UNREAD")?'bg-white':'bg-[#F6F6F6]'}`} key={message.id} onClick={()=>{setMessageId(message.id)}}>
                <div>
                <h1 className={`text-[14px] text-[#0E0E23] ${message.labelIds.includes("UNREAD")?'font-bold':'font-regular'}`}>{message.from}</h1>
                <h3 className={`text-[12px] text-[#0E0E23] ${message.labelIds.includes("UNREAD")?'font-semibold':'font-regular'}`}>{subjectHeader.length>25?subjectHeader.substring(0,25)+'...':subjectHeader || 'No Subject'}</h3>
                <div className='text-[10px] text-[#8A95AD]'>{message.snippet.length>20?(he.decode(message?.snippet))?.substring(0, 60)+'...':he.decode(message.snippet)}</div>
                </div>
                <span className="text-[12px] text-[#8A95AD]">{formattedDate}</span>
                </div>
            )
        }):<div className='flex flex-col justify-center items-center h-[90vh]'>
            <p className='text-[#E4080A] text-[12px]'>Something Went Wrong!</p>
            <span className='text-[#E4080A] text-[12px]'>Please, Try Again!!</span>
            <button className='bg-[#4834F6] mt-2 py-1.5 px-4 rounded-[10px] text-[12px] text-white'>Refresh</button>
            </div>}
        </div>
    </div>
    <EmailBox messageId={messageId} token={token} />
    </div>
  )
};

export default SelectedOption;