



import { ChevronDown } from 'lucide-react';
import React, { useState , useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export const Faqs = [
  {
    title: 'How can I upload my presentation videos to the platform?',
    content:
      'To upload your presentation videos, simply log in to your account and navigate to the "Upload" section. From there, you can select the video file you want to upload and follow the prompts to complete the process.',
  },
  {
    title: 'Does need account for video upload?',
    content:
      'Yes, you need to sign up first because customer data safety is our main priority.',
  },
  {
    title: 'What file formats are supported for video uploads?',
    content:
      ' We support only the MP4 file format for video uploads to ensure compatibility with your files.',
  },
  {
    title: 'Is there a limit to the size or duration of the videos I can upload?',
    content:
      'There is a 30MB limit to the size or 3 min duration of the videos you can upload.',
  },
  {
    title: 'Can I upload multiple videos at once?',
    content:
      'No, only one video at a time.',
  },
  {
    title: 'Can I edit or modify the transcripts after they\'ve been generated?',
    content:
      'No, you must download and edit externally.',
  },
  {
    title: 'What languages are supported for transcript generation?',
    content:
      'English only.',
  },
  {
    title: 'Is my personal information secure on your website?',
    content:
      'Yes, we take the security of your personal information very seriously. Our website employs industry-standard security measures to protect your data from unauthorized access, misuse, or alteration.',
  },
  
];

const FaqPage = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState([]);
  const [user , setUser] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
  })
  const toggleFaq = (index) => {
    setActiveIndex((prevActiveIndex) => {
      const indexExists = prevActiveIndex.includes(index);

      if (indexExists) {
        return prevActiveIndex.filter((activeIdx) => activeIdx !== index);
      }

      return [...prevActiveIndex, index];
    });
  };

  return (
    <>
      <Navbar userDataProps={user} />
      <div className="bg-[#0b0c10] text-white flex flex-col items-center justify-center min-h-screen">
        <section className="max-w-4xl mx-auto px-3">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold mb-2">F.A.Q</h3>
            <p className="text-lg text-gray-600 font-semibold">
              Questions on your mind? We've got the answers you need.
            </p>
          </div>
          {items.map(({ title, content }, index) => (
            <div key={index} className="border border-gray-300 mb-3 rounded-1xl hover:bg-slate-50">
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between w-full items-center p-4 bg-gray-900 text-white focus:outline-none"
              >
                <h4 className="flex-1 text-lg text-left font-semibold">{title}</h4>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    activeIndex.includes(index) ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-max-height duration-300 ${activeIndex.includes(index) ? 'max-h-96' : 'max-h-0'}`}>
                <p className="p-4 bg-gray-800 text-base">{content}</p>
              </div>
            </div>
          ))}
        </section>
        <Footer />
      </div>
    </>
  );
};

const Faq = () => {
  return <FaqPage items={Faqs} />;
};

export default Faq;

