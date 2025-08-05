// components/LordiconReact.jsx
import React , {useRef} from 'react';
import Lottie from 'lottie-react';
import addPasswordAnimation from '../assets/icons/add-password.json';

const LordiconReact = ({ size = 40}) => {
    const lottieRef = useRef()
  return (
    <div
      style={{ width: size, height: size, cursor: 'pointer' }}
      onMouseEnter={() => lottieRef.current.play()}
      onMouseLeave={() => lottieRef.current.stop()}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={addPasswordAnimation}
        autoplay={false}
        loop={true}
      />
    </div>
  );
};

export default LordiconReact;
