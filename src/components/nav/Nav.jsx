import React from 'react'
import './nav.css'
import {ImHome} from 'react-icons/im'
import {ImProfile} from 'react-icons/im'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {FaToolbox} from 'react-icons/fa'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { useState } from 'react'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
    <nav>
     <a href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><ImHome/></a>
      <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><ImProfile/></a>
      <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><GiDiceTwentyFacesTwenty/></a>
      <a href="#services" onClick={() => setActiveNav('#services')} className={activeNav === '#services' ? 'active' : ''}><FaToolbox/></a>
      <a href='#contact'onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><BiMessageSquareDetail/></a>
    </nav>
  )
}

export default Nav