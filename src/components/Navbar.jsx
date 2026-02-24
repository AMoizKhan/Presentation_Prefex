import React, { useState, useEffect } from 'react';
import { prefixlogo } from '../assets';

const Navbar = ({...props}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isReviewsDropdownOpen, setIsReviewsDropdownOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData.user) {
          setUserData(parsedUserData.user);
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear the user data from local storage
    localStorage.removeItem('user');
    // Reset the userData state to null
    setUserData(null);
    
  };
  const toggleReviewsDropdown = () => {
    setIsReviewsDropdownOpen(!isReviewsDropdownOpen);
  };
  return (
    <nav className=' border-gray-200 bg-[#0b0c10]'>
    {/* <nav className='bg-white border-gray-200 dark:bg-[#0b0c10]'> */}

      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='/' className='flex items-center'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            <img src={prefixlogo} alt='logo' width={150} height={80} />
          </span>
        </a>
        <button
          onClick={toggleMobileMenu}
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
        
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
          id='navbar-default'
        >
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#0b0c10] dark:bg-gray-800 md:dark:bg-[#0b0c10] dark:border-gray-700'>
          {/* <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-[#0b0c10] dark:border-gray-700'> */}
            
            <li>
              <a
                className='block py-2 pl-3 pr-4 text-white text-center bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white '
                href='/'
                aria-current='page'
              >
                Home
              </a>
            </li>
            {props?.userDataProps && (
              <>
                <li>
                  <a
                    href='/videodetection'
                    className='block py-2 pl-3 pr-4 text-center md:mt-0 mt-1 md:bg-transparent bg-blue-700 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    Upload
                  </a>
                </li>
                <li>
                  <a
                    href='/progressreport'
                    className='block py-2 pl-3 pr-4 text-[#ffffff] text-center md:mt-0 mt-1 md:bg-transparent bg-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    Progress
                  </a>
                </li>
               
              </>
            )}
            {/* <li>
              <a
                href='/reviews'
                className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white '
                aria-current='page'
              >
                Reviews
              </a>
            </li> */}
            <li >
              <button
                onClick={toggleReviewsDropdown}
                className='block py-2 pl-3 pr-4 text-white bg-blue-700 w-[100%] mt-1 md:mt-0  justify-center rounded md:bg-transparent md:p-0 dark:text-white flex items-center focus:outline-none'
              >
                Reviews
                <svg
                  className='-mr-1 ml-2 h-4 w-4 text-white transform transition-transform duration-300'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  style={{
                    transform: isReviewsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              {/* Dropdown content */}
              {isReviewsDropdownOpen && (
                <ul className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10'>
                  <li>
                    <a
                      href='/reviews/FAQ'
                      className='block py-2 px-4 text-[#0b0c10] hover:bg-gray-100'
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href='/reviews'
                      className='block py-2 px-4 text-[#0b0c10] hover:bg-gray-100'
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href='/reviews/RandomWords'
                      className='block py-2 px-4 text-[#0b0c10] hover:bg-gray-100'
                    >
                      word generator
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              {/* <a
                href='/login'
                onClick={userData ? handleLogout : null}
                className={`block ${
                  userData
                    ? 'border pl-3 border-[#1f2937]'
                    : 'py-2 pl-3 pr-4 text-white'
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                {userData ? 'Logout' : 'Login'}
              </a> */}
               <a
                href='/profile'
                // onClick={userData ? handleLogout : null}
                className={`block ${
                  userData
                    ? 'border pl-3 py-2 pr-4 border-[#1f2937] text-center text-white'
                    : 'py-2 pl-3 pr-4 text-white'
                } bg-blue-700 mt-1 md:mt-0 md:bg-transparent rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
               
                
                {props?.userDataProps ? 'Profile' : 'Login'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






// // import React, { useState, useEffect } from 'react';
// // import { prefixlogo } from '../assets';

// // const Navbar = () => {
// //   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [userData, setUserData] = useState(null);

// //   useEffect(() => {
// //     try {
// //       const storedUserData = localStorage.getItem('user');
// //       if (storedUserData) {
// //         const parsedUserData = JSON.parse(storedUserData);
// //         if (parsedUserData.user) {
// //           setUserData(parsedUserData.user);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error parsing user data:', error);
// //     }
// //   }, []);

// //   const toggleMobileMenu = () => {
// //     setMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   const handleLogout = () => {
// //     // Clear the user data from local storage
// //     localStorage.removeItem('user');
// //     // Reset the userData state to null
// //     setUserData(null);
// //   };
// //   return (
// //     <nav className='bg-white border-gray-200 dark:bg-[#0b0c10]'>
// //       <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
// //         <a href='/' className='flex items-center'>
// //           <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
// //            <img src={prefixlogo} alt='logo' width={150} height={80} />
// //           </span>
// //         </a>
// //         <button
// //           onClick={toggleMobileMenu}
// //           type='button'
// //           className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
// //           aria-controls='navbar-default'
// //           aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
// //         >
// //           <span className='sr-only'>Open main menu</span>
// //           <svg
// //             className='w-5 h-5'
// //             aria-hidden='true'
// //             xmlns='http://www.w3.org/2000/svg'
// //             fill='none'
// //             viewBox='0 0 17 14'
// //           >
// //             <path
// //               stroke='currentColor'
// //               strokeLinecap='round'
// //               strokeLinejoin='round'
// //               strokeWidth='2'
// //               d='M1 1h15M1 7h15M1 13h15'
// //             />
// //           </svg>
// //         </button>
// //         <div
// //           className={`${
// //             isMobileMenuOpen ? 'block' : 'hidden'
// //           } w-full md:block md:w-auto`}
// //           id='navbar-default'
// //         >
// //           <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-[#0b0c10] dark:border-gray-700'>
// //             <li>
// //               <a
// //                 href='/'
// //                 className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white '
// //                 aria-current='page'
// //               >
// //                 Home
// //               </a>
// //             </li>
// //             <li>
// //               <a
// //                 href='/videodetection'
// //                 className='block py-2 pl-3 pr-4 text-[#0b0c10] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
// //               >
// //                 Upload
// //               </a>
// //             </li>
// //             <li>
// //               <a
// //                 href='/progressreport'
// //                 className='block py-2 pl-3 pr-4 text-[#0b0c10] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
// //               >
// //                 Progress
// //               </a>
// //             </li>
// //             <li>
// //               <a
// //                 href='#'
// //                 className='block py-2 pl-3 pr-4 text-[#0b0c10] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
// //               >
// //                 Live
                
// //               </a>
// //             </li>
// //             <li>
// //               <a
// //                 href='#'
// //                 className='block py-2 pl-3 pr-4 text-[#0b0c10] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
// //               >
// //                 Services
// //               </a>
// //             </li>
// //             <li>
// //             {/* <a
// //               href='/login'
// //               className={`block ${
// //                 userData
// //                   ? 'border pl-3 border-[#1f2937]'
// //                   : 'py-2 pl-3 pr-4 text-white'
// //               } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
// //             >
// //               {userData ? userData.name : 'Login'}
// //             </a> */}
// //               <a
// //             href='/login'
// //             onClick={userData ? handleLogout : null}
// //             className={`block ${
// //               userData
// //                 ? 'border pl-3 border-[#1f2937]'
// //                 : 'py-2 pl-3 pr-4 text-white'
// //             } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
// //           >
// //             {userData ? 'Logout' : 'Login'}
// //           </a>
// //           </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;




