// components/EditIcon.jsx
import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import editAnimation from '../assets/icons/edit-icon.json'; // adjust path as needed

const EditIcon = ({ size = 30, loop = true, className = '' }) => {
  const lottieRef = useRef();

  return (
    <div
      style={{ width: size, height: size, cursor: 'pointer' }}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className={className}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={editAnimation}
        loop={loop}
        autoplay={false} // play on hover only
      />
    </div>
  );
};

export default EditIcon;
