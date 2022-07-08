import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [activeSlideId, setActiveSlideId] = useState(1)
  const [timeoutController, setTimeoutController] = useState(null)

  function determineClass(person, id) {
    if (person.id === id) {
      return "activeSlide"
    }
    if (id === 1 && person.id === data.length) {
      return "lastSlide"
    }
    if (person.id === id - 1) {
      return "lastSlide"
    }
    if (id === data.length && person.id === 1) {
      return ("nextSlide")
    }
    if (person.id === id + 1) {
      return "nextSlide"
    }
  }

  function showNextSlide() {
    setActiveSlideId(
      activeSlideId + 1 <= data.length ? activeSlideId + 1 : 1
    )
    clearTimeout(timeoutController)
  }

  function showPrevSlide() {
    setActiveSlideId(
      activeSlideId - 1 >= 1 ? activeSlideId - 1 : data.length
    )
    clearTimeout(timeoutController)
  }

  useEffect(() => {
    setTimeoutController(
      setTimeout(() => {
        showNextSlide()
      }, 4000)
    ) 
  }, [activeSlideId])

  const allPeople = data.map(person => (
    <article key={person.id} className={determineClass(person, activeSlideId)}>
      <img src={person.image} alt="person" className="person-img"/>
      <h4>{person.name}</h4>
      <p>{person.title}</p>
      <p className="text">{person.quote}</p>
      <FaQuoteRight className="icon" />
    </article>
  ))
  
  return (
    <main className="section">
      <div className="title">
        <h2><span>/</span>Reviews</h2>
      </div>
      <div className="section-center">
        {allPeople}
        <FiChevronLeft className="prev" onClick={showPrevSlide} />
        <FiChevronRight className="next" onClick={showNextSlide} />
      </div>
    </main>
  )
}

export default App;
