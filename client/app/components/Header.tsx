import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link legacyBehavior href="/">
          <a>
            <Image src="/logo.svg" alt="RowMail Logo" width={50} height={50} />
          </a>
        </Link>
        <nav>
          <Link legacyBehavior href="/#features">
            <a className="text-gray-700 mx-4 hover:text-blue-600 transition">Features</a>
          </Link>
          <Link legacyBehavior href="/#waitlist">
            <a className="text-gray-700 mx-4 hover:text-blue-600 transition">Login</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;