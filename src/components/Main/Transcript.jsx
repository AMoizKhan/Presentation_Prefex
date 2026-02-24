import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Transcript = () => {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();
  const [user , setUser] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
  })
  const generatePDF = () => {
    // Create a new jsPDF instance with unit set to 'pt' for precise line height control
    const pdf = new jsPDF({ unit: 'pt' });
  
    // Split text content into array of lines
    const lines = text.split('\n');
  
    // Define initial y position for the first line, adjusted for font size and margin
    let y = 30; // Adjust this value as needed
  
    // Set font size for the PDF and adjust line height
    pdf.setFontSize(12);
    const lineHeight = pdf.getLineHeight();
  
    // Ensure no unnecessary page break before text
    pdf.autoPageBreak = true;
  
    lines.forEach(line => {
      if (line.startsWith('<b>') && line.endsWith('</b>: ')) {
        // Bold text
        const boldText = line.substring(3, line.length - 5);
        pdf.setFontStyle('bold');
        pdf.text(boldText, 20, y); // Add bold text at position (20, y)
        pdf.setFontStyle('normal');
      } else {
        // Normal text with proper line wrapping
        pdf.text(line, 20, y, { align: 'justify', maxWidth: pdf.internal.pageSize.getWidth() - 40 });
      }
  
      // Update y position for the next line based on line height
      y += lineHeight;
    });
  
    // Save the PDF with the filename "transcript.pdf"
    pdf.save('transcript.pdf');
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-feedback'); // Replace with the correct backend URL
        const data = response.data;
        
        if (data && data.length > 0) {
          const lastFeedback = data[data.length - 1]; // Get the last feedback
          setText(`${lastFeedback.topic ? `<b>${lastFeedback.topic}</b>: ` : ''}${lastFeedback.transcript}`); // Set transcript text with topic name if present
          setTopic(lastFeedback.topic); // Set topic name separately
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleConvertToPDF = () => {
    generatePDF();
    console.log('Converting transcript to PDF...');
  }

  return (
    <>
      <Navbar  userDataProps={user}/>
      <div className="bg-[#0b0c10] text-white flex flex-col items-center justify-center min-h-screen">
      
       

<h1 className="text-4xl font-bold text-primary py-4">Transcript</h1>
<textarea
      className="w-11/12 md:w-10/12 lg:w-8/12 min-h-[300px] p-4 bg-gray-200 text-black rounded-lg shadow-lg resize-none mb-4"
      value={topic ? `Topic: ${topic}\n\n${text}` : text}
      readOnly
    />
        <button
          onClick={handleConvertToPDF}
          className="bg-secondary text-black text-lg font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Transcript;
