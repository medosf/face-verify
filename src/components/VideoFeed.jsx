import React, { useRef, useEffect, useState } from 'react';

const VideoCapture = ({ onFrameCaptured }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => console.error('Error accessing webcam', err));
    }, []);

    const captureFrame = () => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => onFrameCaptured(blob), 'image/jpeg');
    };

    return (
        <div>
            <video className='m-auto w-2/3 rounded-lg' ref={videoRef} autoPlay></video>
            <button className='mt-20 border-2 p-1 rounded-lg border-black' onClick={captureFrame}>Capture Frame</button>
        </div>
    );
};

export default VideoCapture;
