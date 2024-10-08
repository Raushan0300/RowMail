"use client";
import { useEffect, useState } from "react";
import { getData, postData } from "../config";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import DOMPurify from "dompurify";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FilePreviewer from "../components/FilePreviewer";

const EmailBox = (props: any) => {
  const { messageId, setMessageId, token } = props;
  const [messageData, setMessageData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPic, setUserPic] = useState<string>("");

  useEffect(() => {
    const getEmailData = async () => {
      setLoading(true);
      const res = await getData(`email/${messageId}`, {
        Authorization: `Bearer ${token}`,
      });
      setMessageData(res);
      setLoading(false);
    };

    if (messageId) {
      getEmailData();
    }
  }, [messageId, token]);

  useEffect(() => {
    const markRead = async () => {
      if (messageData?.labelIds?.includes("UNREAD")) {
        await postData(
          `markRead`,
          { messageId: messageId },
          { Authorization: `Bearer ${token}` }
        );
      }
    };

    if (messageData?.labelIds?.includes("UNREAD")) {
      markRead();
    }
  }, [messageData, messageId, token]);

  useEffect(() => {
    const getUserPic = async (email: string) => {
      const res = await getData(`getUserPic`, {
        Authorization: `Bearer ${token}`,
        email: email,
      });
      setUserPic(res.profilePic);
    };
    if (messageData?.from) {
      getUserPic(messageData?.from?.match(/^(.*)\s<(.+)>$/)?.[2]);
    }
  }, [messageData, token]);

  const decodeBase64 = (str: string) => {
    try {
      return decodeURIComponent(
        atob(str.replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch (error) {
      console.error("Error decoding base64:", error);
      return "";
    }
  };

  const buildAttachmentUrl = (mimeType: string, base64Data: string) => {
    const cleanedBase64 = base64Data.replace(/_/g, "/").replace(/-/g, "+");
    return `data:${mimeType};base64,${cleanedBase64}`;
  };

  const date = new Date(Number(messageData?.date));
  const now = new Date();
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const isSameYear = date.getFullYear() === now.getFullYear();
  const formattedDate = isSameDay
    ? date.toLocaleTimeString(["en-US"], { hour: "2-digit", minute: "2-digit" })
    : isSameYear
    ? date.toLocaleDateString(["en-US"], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : date.toLocaleDateString(["en-US"], {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <div
      className={`flex flex-col justify-between w-full sm:w-[75%] bg-white h-screen py-2.5`}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {messageData?.emailData && (
            <div className="flex flex-col h-full">
              <div className="flex gap-5 items-center py-2.5 px-5 border-b pb-2">
                <ArrowBackIcon
                  className="cursor-pointer text-[#8A95AD] text-[18px]"
                  onClick={() => {
                    setMessageId("");
                  }}
                />
                <div className="flex gap-3 items-center">
                  <DraftsOutlinedIcon className="cursor-pointer text-[#8A95AD] text-[18px]" />
                  <DeleteOutlinedIcon className="cursor-pointer text-[#8A95AD] text-[18px]" />
                </div>
              </div>
              <div className="mt-2 px-5 border-b-2">
                <h1 className="text-lg sm:text-xl font-bold">
                  {messageData?.subject}
                </h1>
                <div className="flex justify-between items-center py-2">
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      src={userPic}
                      alt=""
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <h1 className="text-[12px] sm:text-[14px] font-semibold text-[#0E0E23]">
                          {messageData?.from?.match(/^(.*)\s<(.+)>$/)?.[1] ??
                            messageData?.from}
                        </h1>
                        <h3 className="text-[10px] sm:text-[12px] text-[#8A95AD]">
                          {messageData?.from?.match(/^(.*)\s<(.+)>$/)?.[2]}
                        </h3>
                      </div>
                      <h3 className="text-[10px] sm:text-[12px] text-[#8A95AD]">
                        To:{" "}
                        <span className="text-[#0E0E23]">{messageData.to}</span>
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5 items-center">
                    <span className="text-[12px] text-[#8A95AD]">
                      {formattedDate}
                    </span>
                    <div className="flex gap-3 items-center">
                      <Image
                        src="/reply.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                      <Image
                        src="/forward.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="scale-x-[-1] cursor-pointer"
                      />
                      <Image
                        src="/star.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow overflow-auto scrollbar-hide">
                <div className="flex-grow px-5 mt-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        decodeBase64(messageData.emailData)
                      ),
                    }}></div>
                </div>
                {messageData.attachments &&
                  messageData.attachments.length > 0 && (
                    <div className="flex gap-2 items-center px-5">
                      {messageData.attachments.map(
                        (attachment: any, index: any) => {
                          const attachmentURL = buildAttachmentUrl(
                            attachment.mimeType,
                            attachment.data
                          );
                          return (
                            <div
                              key={index}
                              className="mt-10">
                              <FilePreviewer
                                fileUrl={attachmentURL}
                                mimeType={attachment.mimeType}
                                showDownloadButton={true}
                                showCloseButton={false}
                                fileName={attachment.filename}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailBox;
