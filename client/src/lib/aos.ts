import AOS from 'aos';
import 'aos/dist/aos.css';

export const initializeAOS = () => {
  AOS.init({
    duration: 800,
    once: false,
    easing: 'ease-in-out',
    delay: 100,
  });
};
