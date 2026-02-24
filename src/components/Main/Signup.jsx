// import { useState } from 'react';
// import Navbar from '../Navbar';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleGoogleLogin = () => {
//     // Perform Google OAuth login here
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Form data to be sent to the API
//     const formData = {
//       name,
//       email,
//       password,
//       confirmPassword,
//     };

//     try {
//       // Make a POST request to your signup API
//       const response = await fetch('http://localhost:4000/api/v1/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       // Check if the request was successful (status code 2xx)
//       if (response.ok) {
//         console.log('Signup successful');
//         navigate('/Login');
//         // Optionally, you can redirect or perform other actions after successful signup
//       } else {
//         // Handle errors here
//         console.error('Signup failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during signup:', error.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='bg-[#0b0c10] w-[100%]'>
//         <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 pb-10'>
//           <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
//             <h1 className='mb-8 text-3xl text-center'>Sign up</h1>

//             <input
//               type='text'
//               onChange={(e) => setName(e.target.value)}
//               className='block border border-grey-light w-full p-3 rounded mb-4'
//               name='fullname'
//               placeholder='Full Name'
//             />

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

//             <input
//               type='password'
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className='block border border-grey-light w-full p-3 rounded mb-4'
//               name='confirm_password'
//               placeholder='Confirm Password'
//             />

//             <button
//               onClick={(e) => {
//                 handleSubmit(e);
//               }}
//               className='w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark my-1'
//             >
//               Create Account
//             </button>

//             <div className='px-6 mt-2 sm:px-0 max-w-sm'>
//               <button
//                 onClick={handleGoogleLogin}
//                 className='text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
//               >
//                 <svg
//                   className='mr-2 -ml-1 w-4 h-4'
//                   aria-hidden='true'
//                   focusable='false'
//                   data-prefix='fab'
//                   data-icon='google'
//                   role='img'
//                   xmlns='http://www.w3.org/2000/svg'
//                   viewBox='0 0 488 512'
//                 >
//                   <path
//                     fill='currentColor'
//                     d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
//                   ></path>
//                 </svg>
//                 Sign up with Google<div></div>
//               </button>
//             </div>

//             <div className='text-sm text-grey-dark mt-4'>
//               By signing up, you agree to the
//               <a
//                 className='no-underline border-b border-grey-dark text-grey-dark'
//                 href='#'
//               >
//                 Terms of Service
//               </a>{' '}
//               and
//               <a
//                 className='no-underline border-b border-grey-dark pl-1 text-grey-dark'
//                 href='#'
//               >
//                 Privacy Policy
//               </a>
//             </div>
//           </form>

//           <div>
//             <div className='text-white my-6'>
//               Already have an account?{' '}
//               <a className='no-underline border-b border-blue ' href='../login/'>
//                 Log in
//               </a>
//               .
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;

import { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true); // Added state for form validation
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Perform Google OAuth login here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !email || !password || !confirmPassword) {
      setIsFormValid(false);
      return;
    }

    // Form data to be sent to the API
    const formData = {
      name,
      email,
      password,
      confirmPassword,
    };

    try {
      // Make a POST request to your signup API
      const response = await fetch('http://localhost:4000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Signup successful');
        navigate('/Login');
        // Optionally, you can redirect or perform other actions after successful signup
      } else {
        // Handle errors here
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='bg-[#0b0c10] w-[100%]'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 pb-10'>
          <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>

            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='fullname'
              placeholder='Full Name'
            />

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

            <input
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='confirm_password'
              placeholder='Confirm Password'
            />

            {!isFormValid && (
              <div className='text-red-500 text-sm mb-4'>
                Please fill in all the fields.
              </div>
            )}

            <button
              onClick={(e) => {
                setIsFormValid(true); // Reset form validation status
                handleSubmit(e);
              }}
              className='w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark my-1'
            >
              Create Account
            </button>

            <div className='px-6 mt-2 sm:px-0 max-w-sm'>
              {/* <button
                onClick={handleGoogleLogin}
                className='text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
              >
                <svg
                  className='mr-2 -ml-1 w-4 h-4'
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='google'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 488 512'
                >
                  <path
                    fill='currentColor'
                    d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                  ></path>
                </svg>
                Sign up with Google<div></div>
              </button> */}
            </div>

            <div className='text-sm text-grey-dark mt-4'>
              By signing up, you agree to the
              <a
                className='no-underline border-b border-grey-dark text-grey-dark'
                href='#'
              >
                Terms of Service
              </a>{' '}
              and
              <a
                className='no-underline border-b border-grey-dark pl-1 text-grey-dark'
                href='#'
              >
                Privacy Policy
              </a>
            </div>
          </form>

          <div>
            <div className='text-white my-6'>
              Already have an account?{' '}
              <a className='no-underline border-b border-blue ' href='../login/'>
                Log in
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
