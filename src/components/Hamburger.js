import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import dallas from '../images/dallas.webp'
import austin from '../images/austin.webp'
import newyork from '../images/newyork.webp'
import sanfrancisco from '../images/sanfrancisco.webp'
import beijing from '../images/beijing.webp'

const cities = [
  {
    name: 'Dallas',
    image: dallas,
  },
  {
    name: 'Austin',
    image: austin,
  },
  {
    name: 'New York',
    image: newyork,
  },
  {
    name: 'San Francisco',
    image: sanfrancisco,
  },
  {
    name: 'Beijing',
    image: beijing,
  },

]


const Hamburger = ({ state }) => {
  // Vars for our animated dom nodes
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);


  useEffect(() => {
    if (state.clicked === false) {
      // close our menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07
        }
      });
      gsap.to(menu, {
        duration: 1,
        css: { display: "none" }
      })
    }
    else if (state.clicked === true || state.clicked === true && state.initial === null) {
      // open our menu
      gsap.to(menu, {
        duration: 0,
        css: { display: "block" }
      });
      gsap.to([revealMenuBackground, revealMenu], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(revealMenuBackground, revealMenu);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state])

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: "right top",
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1
      }
    });
  }
  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: .2,
      opacity: 0,
      ease: "power3.inOut",
    });
  }
  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8,
      y: 100,
      delay: .1,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3,
      }
    });
  }

  const handleCity = (city) => {
    gsap.to(cityBackground, {
      duration: 0,
      background: `url(${city}) center center`,
      skewY: 0,
    });
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 1,
      ease: "power3.inOut"
    });
    gsap.from(cityBackground, {
      duration: 0.4,
      skewY: 2,
      transformOrigin: "right top"
    })
  }

  const handleCityReturn = () => {
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 0
    })
  }

  const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: "power3.inOut",

    })
  }
  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power3.inOut",
      
    })
  }

  return (
    <div ref={el => (menu = el)} className='hamburger-menu'>
      <div ref={el => (revealMenuBackground = el)} className="menu-secondary-background-color"></div>
      <div ref={el => (revealMenu = el)} className="menu-layer">
        <div ref={el => (cityBackground = el)}  className="menu-city-background"></div>
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li><Link 
                  onMouseEnter={e => handleHover(e)} 
                  onMouseOut={e => handleHoverExit(e)} 
                  
                  ref={el => (line1 = el)} to='/opportunities'>Opportunities</Link></li>
                  <li><Link 
                  onMouseEnter={e => handleHover(e)} 
                  onMouseOut={e => handleHoverExit(e)} 

                  ref={el => (line2 = el)} to='/solutions'>Solutions</Link></li>
                  <li><Link 
                  onMouseEnter={e => handleHover(e)} 
                  onMouseOut={e => handleHoverExit(e)} 
                  
                  ref={el => (line3 = el)} to='/contact-us'>Contact Us</Link></li>

                </ul>
              </nav>
              <div ref={el => (info = el)} className="info">
                <h3>Our Promise</h3>
                <p>Both dressed but an best like eyes comments large to into of have in all his to one which necessary scale of the of samples her I moving our bored a much and cut happening, it sense address afforded in and her completely feel been had warned scolded there assets indulged this make with work from at shall, he use person, suspicion to of the much team.
                </p>
              </div>
              <div className="locations">
                Locations:
                 {cities.map(el => (
                  <span key={el.name} onMouseEnter={() => handleCity(el.image)} onMouseOut={handleCityReturn}>
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Hamburger;
