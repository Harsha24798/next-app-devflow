import Image from 'next/image'
import Link from "next/link";
import Theme from './Theme';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-6 h-16 border-b'>
        <Link href='/' className='flex items-center gap-2'>
            <Image src='images/site-logo.svg' alt='DevFlow Logo' width={23} height={23} />
            <span className='font-semibold text-lg'>DevFlow</span>
        </Link>

        <p>Global Search</p>

        <div>
            <Theme />
        </div>
    </nav>
  )
}

export default Navbar