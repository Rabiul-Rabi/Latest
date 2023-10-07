import React, { useState, useEffect, useRef } from 'react';
import myImage from '../image/logo.jpg';
import myImages from '../image/wish.png';
import myImagecart from '../image/cart.jpg';
import myImagesearch from '../image/search.png';
import { get, getUser, set } from './LogInState';
import { NavLink } from 'react-router-dom';
import { RiUserLine, RiLogoutBoxRLine, RiShoppingCartLine } from 'react-icons/ri'; // Import icons
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const status = get();
  let userName = '';
  if (status === true) {
    userName = getUser();
  }
  const navigate =useNavigate();

  const Reset =()=>{
    set("")
   
    navigate("/")
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [userName]);

  return (
    <header className='bg-white text-black flex justify-between items-center py-2 px-4 border-b border-gray-300'>
      <div className='logo'>
        <img className='w-24 h-auto ml-14' src={myImage} alt='My Image' />
      </div>
      <nav>
        <ul className='flex'>
          <li className='mr-4'>
            <a className='text-black no-underline' href='http://localhost:5173/'>
              Home
            </a>
          </li>
          <li className='mr-4'>
            <a className='text-black no-underline' href='#'>
              Contact
            </a>
          </li>
          <li className='mr-4'>
            <a className='text-black no-underline' href='#'>
              About
            </a>
          </li>
          {status === false ? (
            <>
              <li className='mr-4'>
                <a className='text-black no-underline' href='/signUp'>
                  SignUp
                </a>
              </li>

              <li className='mr-4'>
                <a className='text-black no-underline' href='/logIn'>
                  LogIn
                </a>
              </li>
            </>
          ) : null}
        </ul>
      </nav>

      <div className='search-box max-w-xs bg-white border border-gray-300 rounded flex items-center px-2'>
        <input
          type='text'
          className='flex-grow border-none px-2 rounded focus:outline-none'
          placeholder='What are you looking for ?'
        />
        <button className='bg-white border-none text-white px-4 py-2 rounded-r cursor-pointer' type='submit'>
          <img className='searchBox w-4 h-4 fill-current text-black' src={myImagesearch} alt='My search' />
        </button>
      </div>

      <div className='icons flex'>
        <a href='#' className='wishlist-icon text-white ml-4'>
          <img className='wishicon w-10 h-10 fill-current' src={myImages} alt='My wish' />
        </a>
        <a href='http://localhost:5173/AddToCard' className='cart-icon text-white ml-4'>
          <img className='carticon w-10 h-10 fill-current' src={myImagecart} alt='My cart' />
        </a>
        {status === true ? (
          <div ref={dropdownRef} className='avatar placeholder relative'>
            <span
              className='inline-flex items-center justify-center h-[2.5rem] w-[2.5rem] rounded-full bg-gray-600 cursor-pointer'
              onClick={toggleDropdown}
            >
              <span className='text-lg font-medium text-white leading-none'>{userName.slice(0, 2).toUpperCase()}</span>
            </span>
            {dropdownOpen && (
              <div className='absolute w-36 top-10 right-0 bg-gray-500 border border-gray-300 py-2 rounded shadow-lg'>
              <ul>
                <li>
                  <NavLink
                    to='/user-profile'
                    className='flex items-center px-4 py-2 text-black hover:bg-gray-100'
                    onClick={closeDropdown}
                  >
                    <RiUserLine className='mr-2' />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/'
                    className='flex items-center px-4 py-2 text-black hover:bg-gray-100'
                    onClick={closeDropdown}
                  >
                    <RiLogoutBoxRLine className='mr-2' />
                   <button onClick={Reset}>Log Out</button> 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/Cart'
                    className='flex items-center px-4 py-2 text-black hover:bg-gray-100'
                    onClick={closeDropdown}
                  >
                    <RiShoppingCartLine className='mr-2' />
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
