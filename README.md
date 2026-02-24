# Presentation Perfex

**Presentation Perfex** is an AI-powered web application designed to help users practice and improve their public speaking and presentation skills. By uploading a video of a presentation, users receive detailed, automated feedback on their body language, facial expressions, and voice modulation.

---

## 🚀 Project Overview

The goal of Presentation Perfex is to provide individuals with a tool to overcome the nervousness and uncertainty associated with public speaking. The platform allows users to rehearse in a private, supportive environment and receive constructive, data-driven insights to build confidence and enhance their performance.

The system analyzes uploaded videos using machine learning algorithms and provides feedback on:

- **Facial Expressions**: Identifies dominant emotions (e.g., happy, neutral, surprised) and eye contact.
- **Body Language**: Assesses posture and gestures (e.g., straight body, crossed arms, hand-to-face movements).
- **Voice Modulation**: Analyzes speaking speed, identifies repeated words, and provides a full transcript.

Users can track their progress over time, share videos with a community for additional feedback, and download transcripts of their speech.

---

## ✨ Key Features

- **AI-Powered Video Analysis**: Upload presentation videos (up to 3 minutes) for automated analysis.
- **Multi-Level Feedback**: Receive individual scores and insights for face, body, and voice.
- **Transcript Generation**: Get a word-for-word transcript of the speech, downloadable as a PDF.
- **Progress Tracking**: Compare current performance with past presentations to monitor improvement.
- **Community Feedback**: Share videos with other users to receive constructive comments and support.
- **Word Generator**: A tool to generate random words to help create engaging and dynamic presentation content.

---

## 🛠️ Technology Stack

### Backend & APIs
- **FastAPI**: Manages video uploads, processes data, and provides feedback to the frontend. Its high performance and asynchronous capabilities ensure a seamless user experience.
- **Node.js**: Provides the runtime environment for building scalable network applications.

### Machine Learning & AI
- **TensorFlow**: Open-source framework used to build and train deep learning models, including CNNs for facial expression analysis.
- **OpenCV**: Computer vision library utilized for real-time image and video processing, specifically for face detection and body language analysis.
- **MediaPipe**: Used for analyzing body language cues, including pose and gesture recognition to assess speaker movements.
- **OpenAI Whisper**: Employed for accurate speech-to-text transcription and voice modulation analysis.

### Frontend
- **React**: JavaScript library for building the user-friendly and responsive interface.

### Database
- **MongoDB**: NoSQL database used for flexibility in handling unstructured data like user profiles, video metadata, and feedback records.

---

## ⚙️ System Requirements

### Functional Requirements
- **User Authentication**: Users must log in or create an account to use the platform.
- **Video Length**: Videos are limited to a maximum of 3 minutes.
- **Video Framing**: Users must ensure their head and shoulders (upper body) are clearly visible for accurate analysis.
- **Analysis**: The system must analyze facial expressions, body language, and voice intonation.
- **Output**: The platform must generate instant feedback and provide a downloadable PDF transcript.

### Non-Functional Requirements
- **Performance**: Handle multiple concurrent users without significant performance loss.
- **Scalability**: Scale seamlessly as the user base grows.
- **Reliability**: Platform must be available and reliable with minimal downtime.
- **Security**: Robust security measures to protect all user data.
- **Compatibility**: Compatible with major web browsers and common video formats (e.g., MP4).
- **Usability**: User-friendly interface accessible to individuals with varying technical expertise.

---

## 📊 Project Scope

- **Target Audience**: Students, professionals, public speakers, trainers, and educators looking to improve their presentation skills.
- **Deliverables**: A fully functional web application accessible on desktop and mobile devices, complete with user guides and comprehensive feedback reports.
- **Exclusions**: Tools for creating presentation slides, personalized human coaching, or full-body analysis.

---

## 🧪 Testing

- **Unit Testing**: Individual functions and methods were tested to ensure they perform as designed.
- **Integration Testing**: Verified interactions between integrated components such as AI modules, database, and UI.
- **System Testing**: Complete end-to-end testing of the website to ensure all components work together as expected.
- **User Acceptance Testing (UAT)**: Real users tested registration, video upload, and feedback to ensure it meets real-world requirements.

---

## 🔭 Future Work

- Improve the overall quality of the user interface design.
- Enhance the underlying code structure for better maintainability.
- Expand website functionality with new features.
- Continuously improve website requirements based on user feedback.
- Strengthen system security protocols.
