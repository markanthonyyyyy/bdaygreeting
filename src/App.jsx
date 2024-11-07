import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import sampleSound from './Sounds/bdaysong.mp3';
import buttonAnim from './Animations/button-anim.json';
import arrowAnim from './Animations/arrow-anim.json';
import pinkbg from './Images/pinkbg.jpg';

export default function App() {
    const container = useRef();
    const [isButtonShow, setIsButtonShow] = useState(true);
    const [isArrowShow, setIsArrowShow] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingSecond, setIsAnimatingSecond] = useState(false);

    const sound = new Howl({
      src: [sampleSound],
    });
  
    const startAnimation = () => {
        setIsAnimating(true);
        setIsButtonShow(false);
        setIsArrowShow(false);
    };

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setIsArrowShow(true);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (isAnimating) {
            const tl = gsap.timeline();
            sound.play();

            tl.to(`.text1`, { opacity: 1, y: 0, duration: 1 })
              .to(`.text1`, { opacity: 0, y: -20, duration: 2 }, `+=1`)
              .to(`.text2`, { opacity: 1, y: 0, duration: 2 })
              .to(`.text2`, { opacity: 0, y: -20, duration: 2 }, `+=1`)
              .to(`.text3`, { opacity: 1, y: 0, duration: 1 })
              .to(`.text3`, { opacity: 0, y: -20, duration: 1 }, `+=1`)
              .to(`.text3`, { opacity: 1, y: 0, duration: 1 })
              .to(`.text3`, { opacity: 0, y: -20, duration: 0.5 }, `+=1`)
              .to(`.text2`, { opacity: 1, y: 0, duration: 4  })
              .to(`.text2`, { opacity: 0, y: -20, duration: 1 }, `+=1`)
              
              .then(() => {
                  setIsAnimating(false);
                  sound.stop();
                  setIsAnimatingSecond(true);
              });

            return () => tl.kill();
        }
    }, [isAnimating]); 


    useEffect(() => {
        if (isAnimatingSecond) {
            const tl2 = gsap.timeline();
    
            tl2.to(`.text4`, { opacity: 1, y: 0, duration: 9 })
                .to(`.text4`, { opacity: 0, y: 0, duration: 1 }, `+=1`)
                .then(() => {setIsAnimatingSecond(false); setIsButtonShow(true)});
    
            return () => tl2.kill();
        }
    }, [isAnimatingSecond]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                sound.pause(); 
            } else if (isAnimating) {
                sound.play();  
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isAnimating]);

    return (
        <div ref={container} className="app -z-50 h-screen w-full flex items-center justify-center" style={{ backgroundImage: `url(${pinkbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {isButtonShow && 
              <div className="w-[500px] h-[500px]  overflow-hidden flex items-center justify-center relative" onClick={startAnimation}>
                <Lottie animationData={buttonAnim} loop={true} className="z-20 w-[450px] h-[450px] object-cover cursor-pointer" />
                {isArrowShow && <Lottie animationData={arrowAnim} loop={true} className="z-20 object-cover absolute w-42 h-42 bottom-24 right-20 " />}
                
              </div>
            }
            <h1
                className="text1 z-10 font-pacifico text-5xl text-white  opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                Happy Birthday to you
            </h1>
            <h1
                className="text2 z-10 font-pacifico text-5xl text-white  opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                Happy Birthday to you~
            </h1>
            <h1
                className="text3 z-10 font-pacifico text-5xl text-white  opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                Happy Birthday
            </h1>
            <div
                className="text4 z-10 font-pacifico text-5xl text-white  opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                Happy Birthday ShyShyyy <FontAwesomeIcon icon={faHeart} />
            </div>
            
        </div>
    );
}
