
import React from 'react';
import {faceimage,bodyimage,voiceimage } from '../assets';

const Work = () => {
  return (
    <>
      <section className=''>
        <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
          <div className='mx-auto max-w-screen-sm'>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-secondary '>
              How it Works?
            </h2>
            <p className='mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400'>
              
            </p>
          </div>
          <div className='grid mb-8 lg:mb-12'>
            <div className='flex items-center p-8 bg-third border-b border-gray-200 md:p-12 lg:border-r dark:bg-third dark:border-gray-700'>
                <div className='flex flex-row items-center w-full'>
                <div style={{ flex: '1 1 auto', marginRight: '20px' }}>
                    <img
                    src={faceimage}
                    alt="Your Image"
                    style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                    />
                </div>
                <div style={{ flex: '1 1 auto' }}>
                    <blockquote className='max-w-1xl text-gray-500 dark:text-gray-400'>
                    <h2 className='mb-0  text-white'>
                        "We analyze facial expressions to gauge your level of interactivity and understand how engaged and responsive you are during interactions."
                    </h2>
                    </blockquote>
                </div>
                </div>
            </div>
            </div>

            <div className='grid mb-8 lg:mb-12'>
            <div className='flex items-center p-8 bg-third border-b border-gray-200 md:p-12 lg:border-r dark:bg-third dark:border-gray-700'>
                <div className='flex flex-row items-center w-full'>
                <div style={{ flex: '1 1 auto', marginRight: '20px' }}>
                    <img
                    src={voiceimage}
                    alt="Your Image"
                    style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                    />
                </div>
                <div style={{ flex: '1 1 auto' }}>
                    <blockquote className='max-w-1xl text-gray-500 dark:text-gray-400'>
                    <h2 className='mb-0  text-white'>
                    "We analyze voice patterns to understand your communication style and effectiveness in verbal interactions."                    </h2>
                    </blockquote>
                </div>
                </div>
            </div>
            </div>
            <div className='grid mb-8 lg:mb-12'>
            <div className='flex items-center p-8 bg-third border-b border-gray-200 md:p-12 lg:border-r dark:bg-third dark:border-gray-700'>
                <div className='flex flex-row items-center w-full'>
                <div style={{ flex: '1 1 auto', marginRight: '20px' }}>
                    <img
                    src={bodyimage}
                    alt="Your Image"
                    style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                    />
                </div>
                <div style={{ flex: '1 1 auto' }}>
                    <blockquote className='max-w-1xl text-gray-500 dark:text-gray-400'>
                    <h2 className='mb-0  text-white'>
                    "We analyze body movements to understand your level of engagement and interaction during various activities."
                    </h2>
                    </blockquote>
                </div>
                </div>
            </div>
            </div>
         
        </div>
        
      </section>
    </>
  );
};

export default Work;
