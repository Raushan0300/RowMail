import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex mb-4">
          <a href="https://twitter.com/Raushan2504" target="_blank" rel="noopener noreferrer" className="text-blue-400 mx-2">
            <FaTwitter size={24} />
          </a>
          <a href="https://github.com/Raushan0300" target="_blank" rel="noopener noreferrer" className="text-gray-400 mx-2">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/12aushan-kuma12" target="_blank" rel="noopener noreferrer" className="text-blue-500 mx-2">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-sm">&copy; 2024 RowMail. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;