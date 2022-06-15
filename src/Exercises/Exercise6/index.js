import React, { Fragment, useState, useMemo, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [catalogs] = useState([...catalogsList])
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideTimer, setSlideTimer] = useState(false)
  const [slideDuration] = useState(3000)
  const hasNextImage = useMemo(() => activeIndex < catalogsList.length-1, [activeIndex])
  const hasPreviousImage = useMemo(() => activeIndex !== 0, [activeIndex])

  useEffect(() => {
    if(!slideTimer) return;

    const timerId = setInterval(() => {
      if(!hasNextImage) {
        setActiveIndex(0);
      } else {
        setActiveIndex((previousState) => previousState+1)
      }
    }, slideDuration);

    return () => clearInterval(timerId);
  }, [activeIndex, slideTimer]); 

  const moveSlider = (action) => {
    if(action === 'previous') {
      if(activeIndex === 0) {
        return setActiveIndex(catalogsList.length - 1)
      } else {
        return setActiveIndex((previousState) => previousState - 1)
      }
    }
    if (action === 'next') {
      if(activeIndex === catalogsList.length - 1) {
        return setActiveIndex(0)
      } else {
        return setActiveIndex((previousState) => previousState + 1)
      }
    }
  }

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={() => moveSlider('previous')}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={() => moveSlider('next')}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={() => setSlideTimer(!slideTimer)}
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

