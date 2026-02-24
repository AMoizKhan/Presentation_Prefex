import React, { useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";
import { presentme } from "../../assets";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");
  const [feedbackData, setFeedbackData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [user , setUser] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
  })
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const handleUploadClick = () => {
    
      // User is logged in, allow upload
      navigate('/transcript');
   } 
  const MAX_CHUNK_SIZE = 5 * 1024 * 1024;
  

  useEffect(() => {
    if (feedbackData) {
      updateChartData(feedbackData);
    }
  }, [feedbackData]);

  const updateChartData = (feedbackData) => {
    const faceConfidence = parseInt(feedbackData.confidence_scores.face_confidence);
    const bodyConfidence = parseInt(feedbackData.confidence_scores.body_confidence);
    const voiceConfidence = parseInt(feedbackData.confidence_scores.voice_confidence);

    const newChartData = {
      options: {
        xaxis: {
          categories: ["Face Confidence", "Body Confidence", "Voice Confidence"],
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
      series: [
        {
          name: "Confidence Scores",
          data: [faceConfidence, bodyConfidence, voiceConfidence],
        },
      ],
    };

    setChartData(newChartData);
  };


  const handleFileChange = (e) => {
    console.log('zoop',JSON.parse(localStorage.getItem('user')).user.id)
    setStatus("initial");
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const video = document.createElement("video");
      video.onloadedmetadata = function () {
        if (video.duration > 180) {
          alert("Video duration exceeds 3 minutes. Please upload a shorter video.");
          setStatus("fail");
          setFile(null);
          e.target.value = "";
          return;
        } else {
          setStatus("initial");
          setFile(selectedFile);
          const reader = new FileReader();
          reader.onload = function (event) {
            if (videoRef.current) {
              videoRef.current.src = event.target.result;
              videoRef.current.style.display = "block";
              videoRef.current.load();
            }
          };
          reader.readAsDataURL(selectedFile);
        }
      };
      video.src = URL.createObjectURL(selectedFile);
    }
  };

  const createBlobUrl = (video, startTime, endTime) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height, startTime, 0, endTime - startTime, canvas.height);

    // Convert canvas content to a Blob
    return canvas.toBlob((blob) => blob, 'video/mp4');
};


const uniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const handleUpload = async () => {
  setStatus("uploading");
  setFeedbackData(null);
  let task_id = null;
  
  const videoId = uniqueId();
  console.log(videoId)
  const chunkSize = 5 * 1024 * 1024; // 5 MB in bytes
  const chunks = [];
  for (let start = 0; start < file.size; start += chunkSize) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunks.push(chunk);

    // If the last chunk is being processed
    if (start + chunkSize >= file.size) {
      console.log("Last chunk detected:", chunk.size);
      // No need to adjust end for the last chunk, it will use the remaining bytes
    }
  }

  let uploadedChunks = 0;

  const uploadChunk = async (chunk) => {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("chunk_index", uploadedChunks);
    formData.append("total_chunks", chunks.length);
    formData.append("video_id", videoId);
    console.log("sending chunk{i}",uploadedChunks)

    try {
      const responseUpload = await fetch("https://qcnn5123-8000.inc1.devtunnels.ms/process_videos/", {
        method: "POST",
        body: formData,
      });


      if (responseUpload.ok) {
        setStatus(`Uploading chunk ${uploadedChunks + 1} of ${chunks.length}`);
        uploadedChunks++;

        if (uploadedChunks === chunks.length) {
          const { message, task_id: taskId } = await responseUpload.json();
          task_id = taskId;

          // Wait until video processing starts
          while (!task_id) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          // Start checking task status
          const interval = setInterval(async () => {
            try {
              const responseFeedback = await fetch(`https://qcnn5123-8000.inc1.devtunnels.ms/task_status/${task_id}`);
              if (responseFeedback.ok) {
                const taskStatus = await responseFeedback.json();
                if (taskStatus.status === "completed") {
                  // Processing completed, extract feedback data and stop checking
                  setStatus("success");
                  setFeedbackData({
                    feedback: taskStatus.feedback,
                    confidence_scores: taskStatus.confidence_scores,
                    topic: taskStatus.topic,
                    transcript: taskStatus.transcript,

                  });
                  clearInterval(interval);

                  // Add the feedback data to the database (logic remains the same)
                  try {
                    console.log(taskStatus, "Uploaded successfully!");
                    taskStatus.userId =JSON.parse(localStorage.getItem('user'))?.user?.id
                    const responseSaveFeedback = await fetch("http://localhost:4000/api/save-feedback", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        feedback: taskStatus.feedback,
                        confidence_scores: taskStatus.confidence_scores,
                        topic: taskStatus.topic,
                        transcript: taskStatus.transcript,
                        userId : user?.user.id
                      }),
                    });
                    if (responseSaveFeedback.ok) {
                      console.log("Feedback data saved to MongoDB");
                    } else {
                      console.error("Error saving feedback data to MongoDB");
                    }
                  } catch (error) {
                    console.error("Network error when saving feedback:", error);
                  }
                } else if (taskStatus.status === "failed") {
                  // Processing failed, handle accordingly and stop checking
                  clearInterval(interval);
                  console.error("Error processing video:", taskStatus.error);
                }
              } else {
                console.error("Error fetching task status:", responseFeedback.statusText);
              }
            } catch (error) {
              console.error("Network error during task status check:", error);
            }
          }, 5000); // Check every 5 seconds
        }
      } else {
        setStatus("fail");
        console.error("Error uploading chunk:", responseUpload.statusText);
      }
    } catch (error) {
      console.error("Network error during chunk upload:", error);
      setStatus("fail");
    }
  };

  for (const chunk of chunks) {
    await uploadChunk(chunk);
  }
};


  return (
    <>
      <Navbar userDataProps={user} />
      <div className="bg-[#0b0c10] text-white h[100vh]">
        <div className="container mx-auto px-4 lg:px-10 py-5">
          <p className="text-4xl font-bold text-primary text-center py-5">Video Upload</p>
          <video className="max-w-[1200px] w-full" height="100" controls>
            <source src={presentme} type="video/mp4" />
          </video>
          <strong className="text-secondary text-3xl py-10">Instructions:</strong>
          <ul className="list-disc list-inside my-5">
            <li>The video should be 3 minutes or less in duration.</li>
            <li>
              Please ensure your face and half your body are clearly visible in the video you upload.
              Avoid standing too far away from the camera.
            </li>
            <li>It's important to speak clearly and audibly for optimal sound quality.</li>
            <li>
              Please refrain from uploading videos that include your full body. We're primarily
              focused on your face and upper body for this project.
            </li>
          </ul>
        </div>

        <div className="container mx-auto lg:px-9 font-poppins bg-[#0b0c10]">
          <div className="py-10 bg-[#0b0c10]">
          <div className="relative inline-block">
  <label
    htmlFor="file"
    className="bg-secondary text-black text-lg font-semibold py-2 px-4 rounded-full cursor-pointer "
  >
    Choose a video file
  </label>
  <input
    id="file"
    type="file"
    accept="video/*"
    onChange={handleFileChange}
    className="sr-only"
  />
</div>

            {file && (
              <section>
                <div className="video-container bg-[#0b0c10]" style={{ padding: "10px", marginBottom: "20px", backgroundColor: "#0b0c10" }}>
                  <video controls ref={videoRef} className="w-[400px] h-[400px]" style={{ display: "block", backgroundColor: "#0b0c10" }}>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                </div>
                {(status === "initial" || status === "fail") && (
                  <button onClick={handleUpload} className="submit border border-red-400" style={{ cursor: "pointer", padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
                    Upload video
                  </button>
                )}
              </section>
            )}

            {status === "uploading" && <p>⏳ Uploading selected video...</p>}

            {status === "success" && (
              <div>
                <p>✅ Video uploaded successfully! wait for the feedback</p>

                {feedbackData && (
                  <div>
                    
                    <div className="feedback-container py-8">
                    <button
                      onClick={handleUploadClick}
                      className='px-5 py-2 rounded-2xl border bg-secondary text-black my-4'
                    >
                      Convert Into Transcript
                    </button>
                    <br/>
                    <br/>
                      <h3 className="feedback-title text-secondary font-bold text-3xl">Feedback:</h3>
                      <p>{feedbackData.feedback}</p>
                    </div>

                    {chartData && (
                      <div className="chart-container">
                        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {status === "fail" && <p>❌ Video upload failed!</p>}
        
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoUploader;
