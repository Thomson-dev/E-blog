import { useEffect, useState } from 'react';
//@ts-ignore
const useCountdown = (targetDate) => {
  const [countDown, setCountDown] = useState(() => {
    const countDownDate = new Date(targetDate).getTime();
    const now = new Date().getTime();
    return countDownDate - now;
  });

  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      setCountDown(distance);

      // Check if the countdown has reached zero
      if (distance <= 0) {
        clearInterval(intervalId);
        setCountDown(0); // Ensure the countdown stops at zero
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return countDown > 0 ? getReturnValues(countDown) : [0, 0, 0, 0];
};
//@ts-ignore
const getReturnValues = (countDown) => {
  // Calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };