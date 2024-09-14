'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Compose = (props:any) => {
    const {setIsCompose} = props;


  return (
    <div className={`flex flex-col justify-between w-full sm:w-[75%] bg-white h-screen py-2.5`}>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full">
        <div className="flex gap-5 items-center py-2.5 px-5 border-b pb-2">
          <ArrowBackIcon className="cursor-pointer text-[#8A95AD] text-[18px]" onClick={()=>{setIsCompose(false)}} />
          <div className="flex gap-3 items-center">
            
          </div>
        </div>
        <div className='flex flex-col pt-2.5 px-5 gap-3 text-[14px] text-[#0E0E23]'>
            <div className='flex gap-2 items-center border-b'>
              <p>To: </p>
              <input type="text" placeholder="To" className="w-full outline-none" />
            </div>
            <div className='flex gap-2 items-center border-b'>
              <p>Subject: </p>
              <input type="text" placeholder="Subject" className="w-full outline-none" />
            </div>
            <textarea placeholder="Compose email" className="w-full h-full resize-none outline-none" />
        </div>
        
          </div>
        </div>
    </div>
  )
};

export default Compose;