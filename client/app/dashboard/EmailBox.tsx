'use client';
import { useEffect, useState } from "react";
import { getData } from "../config";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EmailBox = (props:any) => {
  const {messageId, token}=props;
  const [messageData, setMessageData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(()=>{
    const getEmailData=async()=>{
      setLoading(true);
      const res = await getData(`email/${messageId}`, {Authorization:`Bearer ${token}`});
      setMessageData(res);
      setLoading(false);
    };

    if(messageId){
      getEmailData();
    }
  },[messageId]);

  const decodeBase64 = (str: string) => {
    try {
      return decodeURIComponent(
        atob(str.replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (error) {
      console.error('Error decoding base64:', error);
      return '';
    }
  };

  // const renderAttachments = () => {
  //   if (!messageData || !messageData.payload || !messageData.payload.parts) return null;

  //   const attachments = messageData.payload.parts.filter((part: any) => part.filename && part.filename.length > 0);

  //   if (attachments.length === 0) {
  //     return <div>No attachments.</div>;
  //   }

  //   return (
  //     <div className="attachments">
  //       <h3>Attachments:</h3>
  //       {attachments.map((attachment: any, index: number) => (
  //         <div key={index}>
  //           <a
  //             href={`data:${attachment.mimeType};base64,${attachment.body.data}`}
  //             download={attachment.filename}
  //             className="text-blue-600"
  //           >
  //             {attachment.filename}
  //           </a>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const date = new Date(Number(messageData?.date));
            const formattedDate = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

  return (
    <div className={`flex flex-col justify-between w-[75%] bg-[#FAFAFA] h-screen py-2.5`}>
      {loading?<div className="flex justify-center items-center h-full"><CircularProgress /></div>:<div className="flex flex-col h-full">
        {messageData?.emailData&&<div className="flex flex-col h-full">
        <div className="flex justify-between items-center py-2.5 px-5 border-b pb-2">
          <ArrowBackIcon className="text-[#8A95AD] text-[18px]" />
        </div>
        <div className="mt-2 px-5 border-b-2">
          <h1 className="text-xl font-bold">{messageData?.subject}</h1>
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <h1 className="text-[14px] font-semibold text-[#0E0E23]">{messageData?.from?.match(/^(.*)\s<(.+)>$/)[1]}</h1>
              <h3 className="text-[12px] text-[#8A95AD]">{messageData?.from?.match(/^(.*)\s<(.+)>$/)[2]}</h3>
            </div>
            <span className="text-[12px] text-[#8A95AD]">{formattedDate}</span>
            </div>
        </div>
        <div className="flex-grow overflow-auto scrollbar-hide px-5 mt-4">
          <div dangerouslySetInnerHTML={{__html:decodeBase64(messageData?.emailData)}}></div>
          </div>
          </div>}
        </div>}
    </div>
  )
}

export default EmailBox;