
import React from 'react';
import { philosphy, philosphy2, whoweare } from '../assets';
const About = () => {
  return (
    <>
      <div className='container mx-auto px-4  text-white'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
          <div className='mx-auto max-w-screen-sm'>
            <h2 className='mb-2 text-4xl tracking-tight font-extrabold text-secondary '>
              About us
            </h2>
          </div>
      </div>
        <div className=' lg:flex-nowrap flex-wrap  flex justify-center  lg:justify-between'>
          <div className='max-w-[500px] w-full'>
            <img
              src={whoweare}
              alt='whowe are'
              className='w-full  h-[400px] '
            />

            <div className='w-full  mt-4   flex flex-col items-center py-4'>
              <h3>Who We Are</h3>
              <p className='px-3 py-3'>
              An indie developer team passionately crafting a groundbreaking project that promises to be exceptionally helpful. Their collaborative effort brings together diverse talents to create a solution that addresses real-world challenges, showcasing the power of innovation within a tight-knit, independent development community. Stay tuned for a project that aims to make a significant impact and redefine user experiences.
              </p>
            </div>
          </div>

          <div className='max-w-[600px] w-full'>
            <img
              src={philosphy}
              alt='philosphy'
              className='w-full  mb-5'
            />
          
            <div className='w-full   mt-5  flex flex-col items-center py-4'>
              <h3>Our Philosophy:</h3>
              <p className='px-3 py-3'>
              At the core of our approach lies a commitment to empowering individuals in perfecting their presentation skills. We employ cutting-edge techniques to analyze and enhance the three vital aspects of effective communication: facial expressions, body language, and vocal delivery. Our mission is to provide actionable insights and guidance that enable users to present themselves confidently and compellingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
