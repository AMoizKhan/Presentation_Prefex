// import React from 'react';
// import { headerimagee } from '../assets';

// const Banner = () => {
//   return (
//     <>
//       <div className=' mx-auto container  w-full flex flex-wrap lg:flex-nowrap  bg-[#0b0c10]  gap-10   '>
//         <div className='max-w-[700px]  w-full flex flex-col mt-32  items-center'>
//           <h1 className='text-5xl font-bold text-primary '>PRESENTATION </h1>
//           <h1 className='text-5xl font-bold text-secondary '> PERFEX </h1>
//           <p>
//             Discover your presentation prowess with our skill evaluation tool
//           </p>

//           <a
//             href='/videodetection'
//             className='px-5 py-2 rounded-2xl border  bg-secondary text-black my-4 '
//           >
//             Upload Video
//           </a>
         
//         </div>

//         <div className='w-full'>
//           <img src={headerimagee} alt='headerimage' className='w-[100%] ' />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { headerimagee } from '../assets';

const Banner = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Dummy function to check if the user is logged in
  // Replace this with your actual logic to check user's login status
  const isLoggedIn = () => {
    // Example: Check for a token in local storage
    return !!localStorage.getItem('user');

  };

  const handleUploadClick = () => {
    if (isLoggedIn()) {
    
      // User is logged in, allow upload
      navigate('/videodetection'); // Use navigate instead of history.push
    } else {
      console.log(localStorage.getItem('userToken'));
      // User is not logged in, redirect to login
      navigate('/login'); // Use navigate instead of history.push
    }
  };

  return (
    <>
      <div className='mx-auto container w-full flex flex-wrap lg:flex-nowrap bg-[#0b0c10] gap-10'>
        <div className='max-w-[700px] w-full flex flex-col mt-32 items-center'>
          <h1 className='text-5xl font-bold text-primary'>PRESENTATION</h1>
          <h1 className='text-5xl font-bold text-secondary'>PERFEX</h1>
          <p>Discover your presentation prowess with our skill evaluation tool</p>

          <button
            onClick={handleUploadClick}
            className='px-5 py-2 rounded-2xl border bg-secondary text-black my-4'
          >
            Upload Video
          </button>
        </div>

        <div className='w-full'>
          <img src={headerimagee} alt='headerimage' className='w-[100%]' />
        </div>
      </div>
    </>
  );
};

export default Banner;
