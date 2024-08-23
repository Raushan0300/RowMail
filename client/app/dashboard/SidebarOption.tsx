'use client';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';

const SidebarOption = () => {
  return (
    <div className="flex flex-col justify-between w-[15%] bg-[#FAFAFA] h-screen px-5 py-2.5 border-r-2">
        <div>
        {/* <h1 className="text-xl font-bold border-b border-dashed pb-2">Dashboard</h1> */}
        <div className='flex justify-center items-center gap-5'>
        <Image src="/logo.svg" alt="" width={50} height={50} />
        <h1 className='text-xl font-bold logo-font text-[#28A9BB]'>RowMail</h1>
        </div>
        <button className="mt-2 py-1.5 w-full bg-[#4834F6] rounded-[10px] text-[12px] text-white">Compose</button>
        <div className="flex flex-col gap-[15px] mt-[15px] text-[14px] text-[#0E0E23]">
        {/* <div className="flex justify-between items-center"> */}
          <div className="flex gap-2 items-center cursor-pointer">
            <InboxIcon className="text-[#808DA6]" />
            <span>Inbox</span>
          </div>
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className="flex gap-2 items-center cursor-pointer">
            <StarBorderIcon className="text-[#808DA6]" />
            <span>Starred</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className="flex gap-2 items-center cursor-pointer">
            <QueryBuilderIcon className="text-[#808DA6]" />
            <span>Snoozed</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className="flex gap-2 items-center cursor-pointer">
            <SendOutlinedIcon className="text-[#808DA6]" />
            <span>Sent</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className="flex gap-2 items-center cursor-pointer">
            <InsertDriveFileOutlinedIcon className="text-[#808DA6]" />
            <span>Drafts</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        {/* <div className="flex justify-between items-center"> */}
          <div className="flex gap-2 items-center cursor-pointer">
            <DeleteOutlinedIcon className="text-[#808DA6]" />
            <span>Trash</span>
          </div>
          {/* <span className="text-[#8A95AD]">1234</span> */}
        {/* </div> */}
        </div>
        </div>
        <div className="flex gap-5 items-center">
          <PersonIcon />
          <div>
            <h1 className="text-[12px] font-bold">Email Name</h1>
            <p className="text-[12px] text-[#8A95AD]">email@example.com</p>
          </div>
        </div>
      </div>
  )
};

export default SidebarOption;