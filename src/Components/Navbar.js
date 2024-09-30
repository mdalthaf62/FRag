import {React , useState} from 'react'
import logo from '../assets/logo N.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'


const Navbar = () => {
    const[profile,setProfile] = useState()

    const toggleDropdown = () => {
       setProfile(!profile);
     };
  return (
    
     <div className='flex justify-between items-center bg-gray-950 fixed z-10 w-full'>
     <div className='flex items-center space-x-4 p-3'>
        <img src={logo} alt='perfume' className='w-16' />
        {/* <p className='text-gold4 md:text-2xl font-medium '>Perfume</p> */}
     </div>
      <div>
       <button onClick={toggleDropdown}>
       <FontAwesomeIcon icon={faUserCircle}  className='text-yellow-500 hover:text-white md:text-4xl text-2xl cursor-pointer'/>
       </button>
       
       {
        profile && (
            <ul className=' flex flex-col justify-center absolute md:right-2 right-2 bg-gray-600 w-32 items-center rounded-md h-30 '>
            <Link to={'/registration'}><li className='hover:bg-yellow-500 w-32 text-center cursor-pointer rounded-md text-md border-1 p-2 border-gray-500 text-white  hover:text-black font-medium 'onClick={ toggleDropdown} >Logout</li></Link>
            <Link><li className='hover:bg-yellow-500 w-32 text-center cursor-pointer rounded-md text-md border-1 p-2 border-gray-500 text-white  hover:text-black font-medium 'onClick={ toggleDropdown} >Settings</li></Link>
           </ul>
        )
       }
      </div>
     </div>
    
  )
}

export default Navbar