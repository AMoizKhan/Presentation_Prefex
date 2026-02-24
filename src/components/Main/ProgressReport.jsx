import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import ReactApexChart from 'react-apexcharts';
import Footer from '../Footer';
import axios from 'axios';

const ProgressReport = () => {
  const [feedbackChartDataList, setFeedbackChartDataList] = useState([]);
  const [user , setUser] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-feedback',{
          params : {
            userId : JSON.parse(localStorage.getItem('user'))?.user?.id
          }
        }); // Replace with the correct backend URL
        const data = response.data;
        console.log('data',data)
        if (data && data.length > 0) {
          const lastFourRecords = data.slice(-4);
          const feedbackDataList = lastFourRecords.map((item, index) => {
            return {
              id: index,
              series: [
                {
                  name: 'Feedback',
                  data: [
                    parseInt(item.confidence_scores.face_confidence),
                    parseInt(item.confidence_scores.body_confidence),
                    parseInt(item.confidence_scores.voice_confidence),
                  ],
                },
              ],
              options: {
                chart: {
                  type: 'bar',
                  height: 350,
                },
                xaxis: {
                  categories: ['Face Confidence', 'Body Confidence', 'Voice Confidence'],
                  labels: {
                    style: {
                      colors: 'white',
                    },
                  },
                },
                yaxis: {
                  min: 0,
                  max: 100,
                  tickAmount: 5,
                  labels: {
                    formatter: (value) => {
                      return Math.round(value);
                    },
                    style: {
                      colors: 'white',
                    },
                  },
                },
              },
            };
          });

          // Reverse the list of feedback chart data before setting it in state
          setFeedbackChartDataList(feedbackDataList.reverse());
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar userDataProps={user} />
      <div className='bg-[#0b0c10]'>
        <div className='container mx-auto px-4 lg:px-9 py-10 font-poppins'>
          <h1 className="text-4xl font-semibold mb-4 text-primary text-center">Progress Report</h1>
          <div id="today-reading">
            {feedbackChartDataList.map((feedbackData) => (
              <div key={feedbackData.id} id={`feedback-chart-${feedbackData.id}`}>
                <h3 className="text-4xl font-semibold mb-4 text-secondary">Feedback Chart {feedbackData.id + 1}</h3>
                <ReactApexChart options={feedbackData.options} series={feedbackData.series} type="bar" height={350} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProgressReport;
