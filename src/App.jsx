import { useState, useRef, useEffect } from 'react'

import { useSpring, animated } from 'react-spring'

import './App.css'



function App() {

  const imgArr = [
    'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg',
    'https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg',
    'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg'
  ]

  const imgArr2 = [
    'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
    'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg',
    'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg',
    'https://images.pexels.com/photos/1563604/pexels-photo-1563604.jpeg'
  ]


  return (
    
      <div id='bodyWrap'>
        <ImgSlideshow imgArr={imgArr} delay={800} interval={5000} navType={'line'}/>
        <ImgSlideshow imgArr={imgArr2} delay={800} interval={5000} navType={'dot'}/>
      
    </div>
  )
}

const ImgSlideshow = ({imgArr, delay, interval, navType}) => {
  const [currentImg, setImg] = useState(0)
  const containerRef = useRef()


  useEffect(() => {
    const changeInterval = setInterval(() => {
      setImg((prevImg) => (prevImg + 1) % imgArr.length);
    }, interval);

    return () => clearInterval(changeInterval); // Cleanup function to clear interval on unmount
  }, [imgArr, interval]); // Dependency array ensures interval updates with changes

  // ... rest of your render function


  const slideAnimation = useSpring({
    transform: `translateX(-${currentImg * 100}%)`,
    transition: { duration: delay, easing: 'ease-in-out' },
  });

  const wrapStyle = {
    position: 'relative',
    overflowX: 'hidden',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }


  const buttonWrapStyle = {
    position: 'absolute',
    right: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }

    const DotButton = ({setActive, active, index}) => {
      return(
        <div className='imgDotButton imgButton flexCenter' onClick={(e) => {
          setActive(index)
        }}>
          <div className='imgActiveDot' style={{opacity: active && 1}}></div>
        </div>
      )
    }

    const LineButton = ({setActive, active, index}) => {
      return(
        <div className='flexCenter imgLineButtonWrap' style={{height: '12px', cursor: 'pointer'}} onClick={(e) => {
          setActive(index)
        }}>
        <p style={{margin: '12px 6px 0 0', opacity: active? 1:0}}>{index + 1}</p>
        <div className='imgLineButton flexCenter' style={{width: active && '35px'}} >
        </div>
        </div>
      )
    }

  return(
    <div id='slideshowWrap' style={wrapStyle}>

        <div className={'imageWrap'} ref={containerRef}>
          {imgArr.map((imgSrc, index, children) => {
  
  
            return(
              <animated.div 
              key={'img_' + index}
              style={{
                ...slideAnimation,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${imgSrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                flexShrink: 0
              }}></animated.div>
            )
          })}
        </div>

      <div style={buttonWrapStyle}>

      {imgArr.map((_, index) => {
        return(
          <>
            {navType === 'dot' &&
              <DotButton setActive={setImg} index={index} active={currentImg === index} key={'imgButton_' + index}/>
            }
            {navType === 'line' &&
              <LineButton setActive={setImg} index={index} active={currentImg === index} key={'imgButton_' + index}/>
            }
          </>
        )
      })}

    
      </div>

    </div>
  )
}

export default App
