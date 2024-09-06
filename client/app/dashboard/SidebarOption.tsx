'use client';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Image from 'next/image';
import { useState } from 'react';
import SelectedOption from './SelectedOption';

const SidebarOption = (props:any) => {
  const {profile, messages, token} = props;
  const [selectedOption, setSelectedOption] = useState<number>(0);
  return (
    <div className='flex w-full'>
    <div className="hidden sm:flex flex-col justify-between w-[15%] bg-[#FAFAFA] h-screen px-5 py-2.5 border-r-2">
        <div>
        {/* <h1 className="text-xl font-bold border-b border-dashed pb-2">Dashboard</h1> */}
        <div className='flex items-center gap-5'>
        <Image src="/logo.svg" alt="RowMail" width={50} height={50} />
        {/* <h1 className='text-xl font-bold logo-font text-[#28A9BB]'>RowMail</h1> */}
        </div>
        <button className="mt-2 py-1.5 w-full bg-[#4834F6] rounded-[10px] text-[12px] text-white hover:bg-[#357ABD]">Compose</button>
        <div className="flex flex-col gap-[5px] mt-[15px] text-[14px] text-[#0E0E23]">
        {/* <div className="flex justify-between items-center"> */}
          <div className={`flex gap-2 items-center cursor-pointer ${selectedOption==0&&'bg-[rgba(120,175,211,0.5)]'} rounded-[5px] py-1.5 px-2`} onClick={()=>{setSelectedOption(0)}}>
            <InboxIcon className={selectedOption==0?'text-[#0E0E23]':'text-[#808DA6]'} />
            <span>Inbox</span>
          </div>
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className={`flex gap-2 items-center cursor-pointer ${selectedOption==1&&'bg-[rgba(120,175,211,0.5)]'} rounded-[5px] py-1.5 px-2`} onClick={()=>{setSelectedOption(1)}}>
            <StarBorderIcon className={selectedOption==1?'text-[#0E0E23]':'text-[#808DA6]'} />
            <span>Starred</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className={`flex gap-2 items-center cursor-pointer ${selectedOption==2&&'bg-[rgba(120,175,211,0.5)]'} rounded-[5px] py-1.5 px-2`} onClick={()=>{setSelectedOption(2)}}>
            <QueryBuilderIcon className={selectedOption==2?'text-[#0E0E23]':'text-[#808DA6]'} />
            <span>Snoozed</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className={`flex gap-2 items-center cursor-pointer ${selectedOption==3&&'bg-[rgba(120,175,211,0.5)]'} rounded-[5px] py-1.5 px-2`} onClick={()=>{setSelectedOption(3)}}>
            <SendOutlinedIcon className={selectedOption==3?'text-[#0E0E23]':'text-[#808DA6]'} />
            <span>Sent</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className={`flex gap-2 items-center cursor-pointer ${selectedOption==4&&'bg-[rgba(120,175,211,0.5)]'} rounded-[5px] py-1.5 px-2`} onClick={()=>{setSelectedOption(4)}}>
            <InsertDriveFileOutlinedIcon className={selectedOption==4?'text-[#0E0E23]':'text-[#808DA6]'} />
            <span>Drafts</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className={`flex gap-2 items-center cursor-pointer ${selectedOption==5&&'bg-[rgba(120,175,211,0.5)]'} rounded-[5px] py-1.5 px-2`} onClick={()=>{setSelectedOption(5)}}>
            <DeleteOutlinedIcon className={selectedOption==5?'text-[#0E0E23]':'text-[#808DA6]'} />
            <span>Trash</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        </div>
        </div>
        <div className="flex gap-2 items-center">
          <img src={profile?.profilePic} alt={profile?.name} width={40} className='rounded-full' />
          <div className='flex flex-col flex-wrap'>
            <h1 className="text-[12px] font-bold text-wrap">{profile?.name}</h1>
            <p className="text-[10px] text-[#8A95AD] text-wrap">{profile?.email}</p>
          </div>
        </div>
      </div>
      <SelectedOption messages={messages} token={token} selectedOption={selectedOption} />
      </div>
  )
};

export default SidebarOption;