'use client';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailBox from './EmailBox';
import { useCallback, useEffect, useState } from 'react';
import he from 'he';
import { getData } from '../config';
import { CircularProgress } from '@mui/material';

const SelectedOption = (props:any) => {
    const {messages, token, selectedOption} = props;
    const [emails, setEmails] = useState<any>(messages?.emails || []);
    const [messageId, setMessageId] = useState<any>('');
    const [nextPageToken, setNextPageToken] = useState<string | null>(messages?.nextPageToken || null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEmails = useCallback(async (pageToken: string | null = null) => {
        try {
          setLoading(true);
          const res = await getData(`inbox?pageToken=${pageToken || ''}`, { 'Authorization': `Bearer ${token}` },);
    
          if (res && res.emails) {
            setEmails((prevEmails:any) => [...prevEmails, ...res.emails]);
            setNextPageToken(res.nextPageToken || null);
          } else {
            setEmails(500);
          }
        } catch (error) {
          console.error('Failed to fetch emails:', error);
          setEmails(500);
        } finally {
          setLoading(false);
        }
      },[token]);

      useEffect(()=>{
        if(messageId){
          const emailIndex = emails.findIndex((email:any)=>email.id===messageId);
          if(emailIndex!==-1){
            // const updatedEmails = [...emails];
            // updatedEmails[emailIndex].labelIds = updatedEmails[emailIndex].labelIds.filter((label:any)=>label!=='UNREAD');
            // setEmails(updatedEmails);
            const updatedEmails = emails.map((email:any)=>{
              if(email.id===messageId){
                email.labelIds = email.labelIds.filter((label:any)=>label!=='UNREAD');
              }
              return email;
            });
            setEmails(updatedEmails);
          }
        }
      },[messageId, emails]);

    //   const handleScroll = () => {
    //     console.log('scrolling');
    //     console.log('nextPageToken before scrolling: ', nextPageToken);
    //     if (
    //         window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 && nextPageToken && !loading
    //     ) {
    //         fetchEmails(nextPageToken);
    //     };
    // };

    //   useEffect(() => {
    // console.log('add event listener');
    //     window.addEventListener('scroll', handleScroll);
    
    //     return () => {
    //         console.log('remove event listener');
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, []);
    const showSelectedOption = () => {
      switch (selectedOption) {
        case 0:
          return 'Inbox';
        case 1:
          return 'Starred';
        case 2:
          return 'Snoozed';
        case 3:
          return 'Sent';
        case 4:
          return 'Drafts';
        case 5:
          return 'Trash';
      }
    };
  return (
    <div className='flex w-[85%] bg-white'>
    <div className="flex flex-col w-[25%] h-screen py-2.5 border-r-2">
        <div className="flex justify-between border-b pb-2">
        <div className="flex items-center px-2 gap-3 w-[50%]">
        <h1 className="text-lg font-bold">{showSelectedOption()}</h1>
        {/* <span className="text-[10px] text-[#8A95AD]">{unreadEmailCount}/{emails.length} Unread</span> */}
        </div>
        <div className='flex gap-1 mr-2 items-center bg-[#F6F6F6] rounded-[5px] w-[50%] px-2'>
        <SearchOutlinedIcon className="text-[#8A95AD] text-[18px]" />
        <input type="text" placeholder='Search' className='bg-transparent placeholder:text-[12px] text-[12px] outline-none px-2 w-[95%]' />
        </div>
        </div>
        <div className='overflow-auto scrollbar-hide'>
        {emails.length>0?emails.map((email:any) => {
            const subjectHeader = email?.payload?.headers?.find((header:any)=>header.name==='Subject')?.value;
            const date = new Date(Number(email?.date));
            const now = new Date();
            const isSameDay = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            const isSameYear = date.getFullYear() === now.getFullYear();
            const formattedDate = isSameDay ? date.toLocaleTimeString(['en-US'], { hour: '2-digit', minute: '2-digit' }) : isSameYear ? date.toLocaleDateString(['en-US'], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString(['en-US'], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            return(
                <div className={`flex gap-2 justify-between items-center py-2 px-2 border-b cursor-pointer ${email.id===messageId?'bg-[rgba(120,175,211,0.2)]':`${email?.labelIds?.includes("UNREAD")?'bg-white':'bg-[#F6F6F6]'}`}`} key={email?.id} onClick={()=>{setMessageId(email?.id)}}>
                <div>
                <h1 className={`text-[14px] text-[#0E0E23] ${email?.labelIds?.includes("UNREAD")?'font-bold':'font-regular'}`}>{email?.from}</h1>
                <h3 className={`text-[12px] text-[#0E0E23] ${email?.labelIds?.includes("UNREAD")?'font-semibold':'font-regular'}`}>{subjectHeader?.length>25?subjectHeader?.substring(0,25)+'...':subjectHeader || 'No Subject'}</h3>
                <div className='text-[10px] text-[#8A95AD]'>{email?.snippet?.length>20?(he.decode(email?.snippet))?.substring(0, 60)+'...':he.decode(email?.snippet)}</div>
                </div>
                <span className="text-[12px] text-[#8A95AD]">{formattedDate}</span>
                </div>
            )
        }):<div className='flex flex-col justify-center items-center h-[90vh]'>
            <p className='text-[#E4080A] text-[12px]'>Something Went Wrong!</p>
            <span className='text-[#E4080A] text-[12px]'>Please, Try Again!!</span>
            <button className='bg-[#4834F6] mt-2 py-1.5 px-4 rounded-[10px] text-[12px] text-white'>Refresh</button>
            </div>}
            {loading?<div className='flex justify-center items-center h-[10vh]'><CircularProgress /></div>:<div className={`flex justify-center items-center h-[5vh] text-[12px] w-full cursor-pointer text-[#1ea1f7] ${emails.length==0&&'hidden'}`} onClick={()=>{fetchEmails(nextPageToken)}}>Load More</div>}
        </div>
    </div>
    <EmailBox messageId={messageId} token={token} />
    </div>
  )
};

export default SelectedOption;