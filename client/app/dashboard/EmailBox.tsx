'use client';
import { useEffect, useState } from "react";
import { getData } from "../config";
import { CircularProgress } from "@mui/material";

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

  const renderEmailContent = () => {
    if (!messageData) return null;

    try {
      const htmlPart = messageData?.payload?.parts?.find((part: any) => part.mimeType === 'text/html');
      if (htmlPart && htmlPart.body && htmlPart.body.data) {
        const htmlContent = decodeBase64(htmlPart.body.data);
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
      } else {
        return <div>Select Email to view Email Content</div>;
      }
    } catch (error) {
      console.error('Error rendering email content:', error);
      return <div>Error loading email content.</div>;
    }
  };

  return (
    <div className="flex flex-col justify-between w-[75%] bg-[#FAFAFA] h-screen px-5 py-2.5 border-r-2 overflow-auto scrollbar-hide">
      {loading?<CircularProgress />:renderEmailContent()}
    </div>
  )
}

export default EmailBox;