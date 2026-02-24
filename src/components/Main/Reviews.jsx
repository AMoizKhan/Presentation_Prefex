import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';

const Reviews = () => {
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [newSmallComment, setNewSmallComment] = useState([]);
  const [user , setUser] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
  })
  const fetchComments = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData ? userData.user.id : null;
      const userName = userData ? userData.user.name : null;
      setUserId(userId);
      setUserName(userName);
      const response = await axios.get('http://localhost:4000/comments');
      //console.log('Comments:', response.data);
      if (response.data) {
        let temp = []
        for (const iterator of response.data) {
          temp.push({
            ...iterator ,
            hide : false
          })
          
        }
        setComments([...temp]);
        let cm = [];
        response?.data?.length > 0
          ? response?.data?.map((ele) => {
              cm.push('');
            })
          : cm.push('');

        setNewSmallComment(cm);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  const postComments = async (id, idx) => {
    try {
      let payload = {
        commmentorName: userName,
        commmentorId: userId,
        comment: newSmallComment[idx],
        postId: id,
      };
      //console.log('payload', payload);
      const response = await axios.post(
        'http://localhost:4000/comments',
        payload
      );
      if (response?.data?.success) {
        setComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment._id === id) {
              return {
                ...comment,
                comments: [
                  ...comment.comments,
                  {
                    commmentorId: response?.data?.commmentorId,
                    commmentorName: response?.data?.commmentorName,
                    comment: response?.data?.comment,
                    timeStamp: response?.data?.timeStamp,
                  },
                ],
              };
            }
            return comment;
          });
        });
        let upda = [...newSmallComment];
        upda.splice(idx, 1, '');
        setNewSmallComment([...upda]);
      }
      //console.log('Comments:', response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (newComment.trim() !== '') {
  //     const userData = JSON.parse(localStorage.getItem('user'));
  //     //console.log(userData, 'sdfa');
  //     const userId = userData ? userData.user.id : null;
  //     if (!userId) {
  //       console.error('User ID not found in local storage');
  //       return;
  //     }
  //     try {
  //       await axios.post('http://localhost:4000/comments', {
  //         userId,
  //         comment: newComment,
  //       });

  //       setComments([...comments, {
  //         comment: newComment,
  //       }]);
  //       setNewComment('');
  //     } catch (error) {
  //       console.error('Error saving comment:', error);
  //     }
  //   }
  // };
  // const VideoComponent = useMemo(() => {
  //   return video ? (
  //     <video
  //       src={URL.createObjectURL(video)}
  //       className='h-[100%] object-contain'
  //       autoPlay
  //     />
  //   ) : (
  //     <span>Click to upload files ...</span>
  //   );
  // }, [video]);
  function getMessageStatus(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const date = new Date(timestamp);
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  }
  const handleSubmit = async (e) => {
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append('file', video);
      formData.append('userId', userId);
      formData.append('description', newComment);
      formData.append('userName', userName);
      let user = await axios.post(`http://localhost:4000/mpFiles`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoader(false);
      if (user?.data?.videoToStorage?.videoURL !== '') {
        let allComments = comments;
        allComments.push({
          description: user?.data?.videoToStorage?.description,
          idOfPoster: user?.data?.videoToStorage?.idOfPoster,
          comments: user?.data?.videoToStorage?.comments,
          nameOfPoster: user?.data?.videoToStorage?.nameOfPoster,
          videoURL: user?.data?.videoToStorage?.videoURL,
          _id: user?.data?.videoToStorage?._id,
        });
        //console.log('allComments', allComments);
        setComments([...allComments]);
        setVideo(null);
        setVideoURL(null);
        setNewComment('');
      }
      //console.log('mpFiles', user);
    } catch (error) {
      console.error('Error saving comment:', error);
      setLoader(false);
    }
  };

  const handleCollapse = (index) => {
    let tempArr = [...comments];
    tempArr[index].hide = !tempArr[index].hide
    setComments([...tempArr])
  }

  const Avatar = (size, bgColor, name) => {
    return (
      <div
        className={`!h-[${size}px] p-2 !w-[${size}px] !rounded-full !text-[${
          size / 2
        }px]  !bg-[${bgColor}] border border-solid border-gray-300`}
      >
        {name?.includes(' ') ? (
          <>
            {name?.split(' ')[0].charAt(0).toUpperCase()}
            {name?.split(' ')[1].charAt(0).toUpperCase()}
          </>
        ) : (
          <>
            {name?.charAt(0).toUpperCase()}
            {name?.charAt(1).toUpperCase()}
          </>
        )}
      </div>
    );
  };

  return (
    <div className='w-100vh h-screen'>
      <Navbar userDataProps={user} />
      <div className='bg-[#0b0c10]   text-white'>
        <div className='container mx-auto px-4 pb-10 '>
          <h2 className='text-secondary text-4xl font-bold'>Reviews</h2>
          <div className='w-full mx-auto mt-8'>
            {userId && (
              <>
                <div
                  onClick={() => {
                    document.getElementById('fileInput').click();
                  }}
                  className='w-full border  border-gray-300 bg-[#3031325c] italic rounded-md p-2 mb-4 h-[350px] flex items-center justify-center cursor-pointer'
                >
                  {video ? (
                    <video
                      src={videoURL}
                      className='h-[100%] object-contain'
                      autoPlay
                      controls
                    />
                  ) : (
                    <span>Click to upload files ...</span>
                  )}

                  <input
                    type='file'
                    className='hidden '
                    id='fileInput'
                    onChange={(e) => {
                      setVideo(e.target.files[0]);
                      setVideoURL(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => {
                    e.preventDefault();
                    setNewComment(e.target.value);
                  }}
                  className='w-full mb-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-black'
                  placeholder='Enter your comment...'
                  rows={3}
                />
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
                    (loader || !video || newComment == '') &&
                    'pointer-events-none'
                  }`}
                >
                  {loader ? 'Loading...' : 'Post'}
                </button>
              </>
            )}
            
            <div className='mt-[22px] mb-[100px]'>
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <>
                  {comments.map((comment, index) => (
                    <div key={index} className='mb-1'>
                      <div className='bg-[#292b2c] rounded-md p-3 '>
                      <div className='flex h-[32px] items-center text-[16px] gap-3 '>
                        {Avatar(32, `#181a1c`, comment.nameOfPoster)}
                        {comment.nameOfPoster}
                        <div className='text-[12px] text-[#ffffff2e] italic'>
                          Posted
                        </div>
                        <div onClick={()=>{handleCollapse(index)}} className=' ml-auto cursor-pointer '>
                          {comment.hide ? 'show': 'collapse'}
                        </div>
                      </div>
                     {!comment.hide && <div className='min-h-max text-[14px] w-full p-2 mt-5 '>
                        {comment?.description || ''}
                      </div>}
                      </div>
                     {!comment.hide && <div className='mb-[120px] mt-5 flex flex-col md:flex-row gap-5 md:gap-0 '>
                        <div className=' w-full h-[400px]  flex bg-[#292b2c]  items-center justify-center  rounded-md md:w-60%'>
                          <video
                            src={comment?.videoURL}
                            className='h-[90%] rounded-md object-contain '
                            controls
                            autoPlay={false}
                          />
                        </div>
                        <div className='w-full md:w-40% h-[400px] flex flex-col justify-between items-end'>
                          <div
                            className={`w-full ${
                              userId && userName ? 'h-[70%]' : 'h-[1000%]'
                            } md:w-[90%] overflow-scroll`}
                          >
                            {comment?.comments?.length > 0
                              ? comment?.comments?.map((ele, idx) => {
                                  return (
                                    <div className='bg-[#292b2c] mb-1 p-2 rounded-md'>
                                      <div className='flex gap-1 items-center '>
                                        <div className='text-[12px] text-[#ffffff2e]'>
                                          {ele?.commmentorName}
                                        </div>{' '}
                                        <div className='text-[12px] text-[#ffffff2e] italic'>
                                          commented
                                        </div>
                                      </div>
                                      <div className='text-[14px]'>
                                        {ele.comment}
                                      </div>
                                      <div className='text-[10px] mt-1 text-[#ffffff2e]'>
                                        {getMessageStatus(ele.timeStamp)}
                                      </div>
                                    </div>
                                  );
                                })
                              : 'No Comments Yet !'}
                          </div>
                          {userId && userName && (
                            <div className='flex flex-col h-[30%] justify-between w-full md:w-[90%]'>
                              <textarea
                                className='w-full mb-1 border text-[14px] border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-black'
                                placeholder='Comment Here...'
                                value={newSmallComment[index]}
                                onChange={(e) => {
                                  e.preventDefault();
                                  let zoop = [...newSmallComment];
                                  zoop.splice(index, 1, e.target.value);
                                  setNewSmallComment([...zoop]);
                                }}
                              />
                              <button
                                className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
                                  newSmallComment[index] == '' &&
                                  'pointer-events-none'
                                }`}
                                onClick={() => {
                                  newSmallComment[index] !== '' &&
                                    postComments(comment._id, index);
                                }}
                              >
                                Post
                              </button>
                            </div>
                          )}
                        </div>
                      </div>}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default Reviews;
