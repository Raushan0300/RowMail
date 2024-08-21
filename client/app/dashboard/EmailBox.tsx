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
      if(messageData?.payload?.mimeType==='multipart/alternative'){
        if(messageData?.payload?.parts?.find((part: any) => part.mimeType === 'text/html')){
          const htmlPart = messageData?.payload?.parts?.find((part: any) => part.mimeType === 'text/html');
        if (htmlPart && htmlPart.body && htmlPart.body.data) {
          const htmlContent = decodeBase64(htmlPart.body.data);
          return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
        }
        } else{
          const htmlPart = messageData?.payload?.parts?.find((part:any)=>part.mimeType==='multipart/alternative')?.parts?.find((part: any) => part.mimeType === 'text/html');
          if (htmlPart && htmlPart.body && htmlPart.body.data) {
            const htmlContent = decodeBase64(htmlPart.body.data);
            return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
          }
        }
      } else{
        const htmlPart = messageData?.payload?.body?.data;
        if (htmlPart) {
          const htmlContent = decodeBase64(htmlPart);
          return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
        }
      }


      if(messageData?.payload?.mimeType==='multipart/alternative'){
        if(messageData?.payload?.parts?.find((part: any) => part.mimeType === 'text/plain')){
          const textPart = messageData?.payload?.parts?.find((part: any) => part.mimeType === 'text/plain');
          if (textPart && textPart.body && textPart.body.data) {
            const textContent = decodeBase64(textPart.body.data);
            return <pre>{textContent}</pre>;
          }
        } else{
          const textPart = messageData?.payload?.parts?.find((part:any)=>part.mimeType==='multipart/alternative')?.parts?.find((part: any) => part.mimeType === 'text/plain');
          if (textPart && textPart.body && textPart.body.data) {
            const textContent = decodeBase64(textPart.body.data);
            return <pre>{textContent}</pre>;
          }
        }
      } else{
        const textPart = messageData?.payload?.body?.data;
        if (textPart) {
          const textContent = decodeBase64(textPart);
          return <pre>{textContent}</pre>;
        }
      }

      return <div>No content available.</div>;
    } catch (error) {
      console.error('Error rendering email content:', error);
      return <div>Error loading email content.</div>;
    }
  };

  const renderAttachments = () => {
    if (!messageData || !messageData.payload || !messageData.payload.parts) return null;

    const attachments = messageData.payload.parts.filter((part: any) => part.filename && part.filename.length > 0);

    if (attachments.length === 0) {
      return <div>No attachments.</div>;
    }

    return (
      <div className="attachments">
        <h3>Attachments:</h3>
        {attachments.map((attachment: any, index: number) => (
          <div key={index}>
            <a
              href={`data:${attachment.mimeType};base64,${attachment.body.data}`}
              download={attachment.filename}
              className="text-blue-600"
            >
              {attachment.filename}
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between w-[75%] bg-[#FAFAFA] h-screen px-5 py-2.5 border-r-2 overflow-auto scrollbar-hide">
      {loading?<CircularProgress />:<div>{renderEmailContent()}
        {renderAttachments()}</div>}
    </div>
  )
}

export default EmailBox;