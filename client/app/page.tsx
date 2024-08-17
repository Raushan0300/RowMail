import GoogleIcon from '@mui/icons-material/Google';
import { getData } from './config';

export default function Home() {
  const handleLogin = async()=>{
    const res = await getData('', {});
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <button className='flex justify-between items-center gap-2 py-2 px-5 bg-yellow-700 rounded-[10px] text-[#fff]'>
        <GoogleIcon />
        Login with Google
      </button>
    </div>
  );
}
