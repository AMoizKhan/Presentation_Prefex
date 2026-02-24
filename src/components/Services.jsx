import React from 'react';
import { videoanalyze, progresstrack, liveanalyze, community } from '../assets';

const Services = () => {
  return (
    <div className='container mx-auto lg:px-9 py-10 font-poppins '>
      <div className='py-10'>
        <h2 className='md:text-4xl text-2xl  font-bold '>Services</h2>
        <p className='text-secondary font-medium capitalize py-3 text-lg'>
          OUR SERVICES FOR CLIENTS
        </p>
      </div>

      <div className='py-10  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:place-content-between place-content-center gap-5 md:gap-10 place-items-center'>
        <div className='max-w-[400px] bg-third w-full  p-7  border-b-4 border-0 border-primary  hover:border-secondary '>
          <img src={videoanalyze} alt='bookmark' className='mt-4 w-10' />
          <h2 className='font-bold text-xl capitalize py-4'>
            Video Analysing
          </h2>
          <p className='py-5 text-base '>
          Our video analysis service utilizes state-of-the-art technology to assess various aspects of presentations or speeches. Through advanced algorithms and facial recognition, we analyze facial expressions, gestures, and vocal cues to measure nervousness levels. Our goal is to provide detailed insights and actionable feedback, enabling individuals to enhance their confidence and delivery while communicating effectively and leave a lasting impact.
          </p>
        </div>

        <div className='max-w-[400px] bg-third w-full  p-7  border-b-4 border-0 border-primary  hover:border-secondary '>
          <img src={progresstrack} alt='bookmark' className='mt-4 w-10' />
          <h2 className='font-bold text-xl capitalize py-4'>
            Progress Tracking
          </h2>
          <p className='py-5 text-base '>
          Welcome to our progress summary on video analysis. We believe in transparency and continual improvement. This overview showcases your previous video analyses visually, emphasizing facial expressions, body language, and voice modulation. Our graphical representations highlight changes in these areas across your video history, offering valuable insights to refine your communication style and elevate your presentation effectiveness.
          </p>
        </div>
        <div className='max-w-[400px] bg-third w-full  p-7  border-b-4 border-0 border-primary  hover:border-secondary '>
          <img src={community} alt='bookmark' className='mt-4 w-10' />
          <h2 className='font-bold text-xl capitalize py-4'>
            Community
          </h2>
          <p className='py-5 text-base '>
          Discover our Community Presentation Feedback Service, a platform tailored for community members to showcase their presentations and receive valuable feedback. Empower your presentation sharing. Provide constructive feedback on others presentations and receive insightful comments on your own, fostering a collaborative and supportive environment.Join our community today and elevate your presentations to new heights.
          </p>
        </div>

     
      </div>
    </div>
  );
};

export default Services;
