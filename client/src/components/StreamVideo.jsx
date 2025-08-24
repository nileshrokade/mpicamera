import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function StreamVideo() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('ws://localhost:8080');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const logger = (msg) => {
      console.log(msg);
    };

    const loadCamera = (stream) => {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }
      logger('Camera connected');
    };

    const loadFail = () => {
      logger('Camera not connected');
    };

    const draw = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/webp');
      socketRef.current.emit('stream', dataUrl);
    };

    // Set up camera
    const getUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ? navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)
      : (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (getUserMedia) {
      getUserMedia({ video: true, audio: false })
        .then(loadCamera)
        .catch(loadFail);
    }

    const interval = setInterval(draw, 100);

    return () => {
      clearInterval(interval);
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Stream Video Component</h1>
      <video ref={videoRef} id="video" autoPlay style={{ display: 'block' }} />
      <canvas ref={canvasRef} id="preview" width={900} height={700} style={{ display: 'none' }} />
    </div>
  );
}

export default StreamVideo;