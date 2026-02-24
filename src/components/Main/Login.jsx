
// import { useState } from 'react';
// import Navbar from '../Navbar';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLocalStorage = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleGoogleLogin = () => {
//     // Perform Google OAuth login here
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const userData = await response.json();

//         // Store user data in localStorage
//         handleLocalStorage(userData);

//         console.log('Login successful');
//         navigate('/');
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('An error occurred during login:', error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='bg-[#0b0c10] w-[100%] h-[100vh]'>
//         <div className='container max-w-sm mx-auto md:py-10 py-0 flex-1 flex flex-col items-center justify-center px-2 pb-10'>
//           <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
//             <h1 className='mb-8 text-3xl text-center '>Log in</h1>

//             <input
//               type='text'
//               onChange={(e) => setEmail(e.target.value)}
//               className='block border border-grey-light w-full p-3 rounded mb-4'
//               name='email'
//               placeholder='Email'
//             />

//             <input
//               type='password'
//               onChange={(e) => setPassword(e.target.value)}
//               className='block border border-grey-light w-full p-3 rounded mb-4'
//               name='password'
//               placeholder='Password'
//             />

//             <button
//               onClick={(e) => {
//                 handleSubmit(e);
//               }}
//               className='w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark  my-1'
//             >
//               Log In
//             </button>

//             <div className="px-6 mt-2 sm:px-0 max-w-sm">
//               <button
//                 onClick={handleGoogleLogin}
//                 className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
//               >
//                 <svg
//                   className="mr-2 -ml-1 w-4 h-4"
//                   aria-hidden="true"
//                   focusable="false"
//                   data-prefix="fab"
//                   data-icon="google"
//                   role="img"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 488 512"
//                 >
//                   {/* Google SVG path data */}
//                 </svg>
//                 Log in with Google<div></div>
//               </button>
//             </div>
//           </form>

//           <div>
//             <div className=' text-white mt-6 '>
//               Don't have an account?{' '}
//               <a
//                 className='no-underline border-b border-blue '
//                 href='../signup/'
//               >
//                 Sign up
//               </a>
//               .
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
// import { useState } from 'react';
// import Navbar from '../Navbar';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLocalStorage = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleGoogleLogin = () => {
//     // Perform Google OAuth login here
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if email or password is empty
//     if (!email || !password) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const userData = await response.json();

//         // Store user data in localStorage
//         handleLocalStorage(userData);

//         console.log('Login successful');
//         navigate('/');
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('An error occurred during login:', error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='bg-[#0b0c10] w-[100%] h-[100vh]'>
//         <div className='container max-w-sm mx-auto md:py-10 py-0 flex-1 flex flex-col items-center justify-center px-2 pb-10'>
//           <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
//             <h1 className='mb-8 text-3xl text-center '>Log in</h1>

//             <input
//               type='text'
//               onChange={(e) => setEmail(e.target.value)}
//               className='block border border-grey-light w-full p-3 rounded mb-4'
//               name='email'
//               placeholder='Email'
//             />

//             <input
//               type='password'
//               onChange={(e) => setPassword(e.target.value)}
//               className='block border border-grey-light w-full p-3 rounded mb-4'
//               name='password'
//               placeholder='Password'
//             />

//             <button
//               onClick={(e) => {
//                 handleSubmit(e);
//               }}
//               className='w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark  my-1'
//             >
//               Log In
//             </button>

//             <div className="px-6 mt-2 sm:px-0 max-w-sm">
//               <button
//                 onClick={handleGoogleLogin}
//                 className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
//               >
//                 <svg
//                   className="mr-2 -ml-1 w-4 h-4"
//                   aria-hidden="true"
//                   focusable="false"
//                   data-prefix="fab"
//                   data-icon="google"
//                   role="img"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 488 512"
//                 >
//                   {/* Google SVG path data */}
//                 </svg>
//                 Log in with Google<div></div>
//               </button>
//             </div>
//           </form>

//           <div>
//             <div className=' text-white mt-6 '>
//               Don't have an account?{' '}
//               <a
//                 className='no-underline border-b border-blue '
//                 href='../signup/'
//               >
//                 Sign up
//               </a>
//               .
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLocalStorage = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        // Store user data in localStorage
        handleLocalStorage(userData);

        console.log('Login successful');
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password');
        console.error('Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
      console.error('An error occurred during login:', error);
    }
  };

  const handleGoogleLogin = () => {
    // Perform Google OAuth login here
  };


  return (
    <>
      <Navbar />
      <div className='bg-[#0b0c10] w-[100%] h-[100vh]'>
        <div className='container max-w-sm mx-auto md:py-10 py-0 flex-1 flex flex-col items-center justify-center px-2 pb-10'>
          <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center '>Log in</h1>

            <input
              type='text'
              onChange={(e) => setEmail(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='email'
              placeholder='Email'
            />

            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='password'
              placeholder='Password'
            />

            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className='w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark  my-1'
            >
              Log In
            </button>

            {errorMessage && (
              <div className='text-red-500 mt-2 text-center'>{errorMessage}</div>
            )}

            <div className="px-6 mt-2 sm:px-0 max-w-sm">
              {/* <button
                onClick={handleGoogleLogin}
                className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                </svg>
                Log in with Google<div></div>
              </button> */}
            </div>
          </form>

          <div>
            <div className=' text-white mt-6 '>
              Don't have an account?{' '}
              <a
                className='no-underline border-b border-blue '
                href='../signup/'
              >
                Sign up
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

  