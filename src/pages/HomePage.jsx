import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center text-center ">
      <h1
        className={`absolute text-4xl font-bold text-white transition-all duration-200 ease-out ${
          animate ? 'top-5' : 'top-[-100%]'
        }`}
      >
      </h1>
    </div>
  );
};

export default HomePage;