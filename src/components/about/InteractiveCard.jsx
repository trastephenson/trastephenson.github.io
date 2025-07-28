import React from 'react';
import styled from 'styled-components';

const InteractiveCard = ({ icon: Icon, title, subtitle, prompt = "HOVER OVER :D" }) => {
  return (
    <StyledWrapper>
      <div className="card-container noselect">
        <div className="canvas">
          <div className="tracker tr-1" />
          <div className="tracker tr-2" />
          <div className="tracker tr-3" />
          <div className="tracker tr-4" />
          <div className="tracker tr-5" />
          <div className="tracker tr-6" />
          <div className="tracker tr-7" />
          <div className="tracker tr-8" />
          <div className="tracker tr-9" />
          <div className="tracker tr-10" />
          <div className="tracker tr-11" />
          <div className="tracker tr-12" />
          <div className="tracker tr-13" />
          <div className="tracker tr-14" />
          <div className="tracker tr-15" />
          <div className="tracker tr-16" />
          <div className="tracker tr-17" />
          <div className="tracker tr-18" />
          <div className="tracker tr-19" />
          <div className="tracker tr-20" />
          <div className="tracker tr-21" />
          <div className="tracker tr-22" />
          <div className="tracker tr-23" />
          <div className="tracker tr-24" />
          <div className="tracker tr-25" />
          <div id="card">
            <p id="prompt">{title}</p>
            <div className="icon-container">
              <Icon className="card-icon" />
            </div>
            <div className="subtitle" dangerouslySetInnerHTML={{ __html: subtitle }}>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /*works janky on mobile :<*/
  .card-container {
    position: relative;
    width: 350px;
    height: 300px;
    transition: 200ms;
  }

  .card-container:active {
    width: 340px;
    height: 295px;
  }

  #card {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    transition: 700ms;
    background: linear-gradient(135deg, #0d1120 0%, #3a4b8a 43%, #0d1120 100%);
  }

  .icon-container {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-icon {
    font-size: 4rem;
    color: white;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  }

  .subtitle {
    opacity: 0;
    transform: translateY(40px);
    color: white;
    text-align: left;
    width: 100%;
    font-size: 1em;
    font-weight: bold;
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    transition: 300ms ease-in-out;
    transition-delay: 200ms;
    line-height: 1.7;
    padding-left: 105px;
    padding-right: 20px;
  }

  .subtitle ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    text-align: left;
  }

  .subtitle li {
    margin-bottom: 8px;
    position: relative;
    padding-left: 0;
    color: white;
    text-align: left;
  }

  .subtitle li::before {
    content: "•";
    color: white;
    font-weight: bold;
    position: relative;
    margin-right: 8px;
  }

  .subtitle a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .subtitle a:hover {
    color: #E6E6FA;
    text-shadow: 0 0 10px rgba(230, 230, 250, 0.8);
  }

  .subtitle a {
    pointer-events: auto;
    cursor: pointer;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
  }

  .tracker:hover ~ #card .subtitle {
    opacity: 1;
    transform: translateY(0);
  }

  #prompt {
    bottom: 15px;
    left: 20px;
    z-index: 20;
    font-size: 24px;
    font-weight: bold;
    transition: 300ms ease-in-out-out;
    position: absolute;
    max-width: 150px;
    color: white;
  }

  .tracker {
    position: absolute;
    z-index: 200;
    width: 100%;
    height: 100%;
  }

  .tracker:hover {
    cursor: pointer;
  }

  .tracker:hover ~ #card #prompt {
    opacity: 0;
  }

  .tracker:hover ~ #card {
    transition: 300ms;
    filter: brightness(1.1);
  }

  .card-container:hover #card::before {
    transition: 200ms;
    content: '';
    opacity: 80%;
  }

  .canvas {
    perspective: 800px;
    inset: 0;
    z-index: 200;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas: "tr-1 tr-2 tr-3 tr-4 tr-5"
      "tr-6 tr-7 tr-8 tr-9 tr-10"
      "tr-11 tr-12 tr-13 tr-14 tr-15"
      "tr-16 tr-17 tr-18 tr-19 tr-20"
      "tr-21 tr-22 tr-23 tr-24 tr-25";
  }

  #card::before {
    content: '';
    background: linear-gradient(180deg, #000000 0%, #333333 50%, #ffffff 100%);
    filter: blur(2rem);
    opacity: 30%;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    transition: 200ms;
  }

  .tr-1 {
    grid-area: tr-1;
  }

  .tr-2 {
    grid-area: tr-2;
  }

  .tr-3 {
    grid-area: tr-3;
  }

  .tr-4 {
    grid-area: tr-4;
  }

  .tr-5 {
    grid-area: tr-5;
  }

  .tr-6 {
    grid-area: tr-6;
  }

  .tr-7 {
    grid-area: tr-7;
  }

  .tr-8 {
    grid-area: tr-8;
  }

  .tr-9 {
    grid-area: tr-9;
  }

  .tr-10 {
    grid-area: tr-10;
  }

  .tr-11 {
    grid-area: tr-11;
  }

  .tr-12 {
    grid-area: tr-12;
  }

  .tr-13 {
    grid-area: tr-13;
  }

  .tr-14 {
    grid-area: tr-14;
  }

  .tr-15 {
    grid-area: tr-15;
  }

  .tr-16 {
    grid-area: tr-16;
  }

  .tr-17 {
    grid-area: tr-17;
  }

  .tr-18 {
    grid-area: tr-18;
  }

  .tr-19 {
    grid-area: tr-19;
  }

  .tr-20 {
    grid-area: tr-20;
  }

  .tr-21 {
    grid-area: tr-21;
  }

  .tr-22 {
    grid-area: tr-22;
  }

  .tr-23 {
    grid-area: tr-23;
  }

  .tr-24 {
    grid-area: tr-24;
  }

  .tr-25 {
    grid-area: tr-25;
  }

  .tr-1:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg);
  }

  .tr-2:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg);
  }

  .tr-3:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
  }

  .tr-4:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg);
  }

  .tr-5:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
  }

  .tr-6:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg);
  }

  .tr-7:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg);
  }

  .tr-8:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg);
  }

  .tr-9:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg);
  }

  .tr-10:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg);
  }

  .tr-11:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg);
  }

  .tr-12:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg);
  }

  .tr-13:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  .tr-14:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
  }

  .tr-15:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg);
  }

  .tr-16:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg);
  }

  .tr-17:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg);
  }

  .tr-18:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg);
  }

  .tr-19:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg);
  }

  .tr-20:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg);
  }

  .tr-21:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg);
  }

  .tr-22:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg);
  }

  .tr-23:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
  }

  .tr-24:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg);
  }

  .tr-25:hover ~ #card {
    transition: 125ms ease-in-out;
    transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);
  }

  .noselect {
    -webkit-touch-callout: none;
     /* iOS Safari */
    -webkit-user-select: none;
     /* Safari */
     /* Konqueror HTML */
    -moz-user-select: none;
     /* Old versions of Firefox */
    -ms-user-select: none;
     /* Internet Explorer/Edge */
    user-select: none;
     /* Non-prefixed version, currently
  									supported by Chrome, Edge, Opera and Firefox */
  }

  /* Responsive adjustments */
  @media screen and (max-width: 768px) {
    .card-container {
      width: 280px;
      height: 240px;
    }
    
    .card-container:active {
      width: 270px;
      height: 235px;
    }

    #card {
      border-radius: 25px;
    }

    .card-icon {
      font-size: 3.5rem;
    }

    .subtitle {
      font-size: 0.8em;
      padding-left: 60px;
      padding-right: 60px;
    }

    .subtitle li {
      margin-bottom: 3px;
    }
  }

  @media screen and (max-width: 480px) {
    .card-container {
      width: 260px;
      height: 220px;
    }
    
    .card-container:active {
      width: 250px;
      height: 215px;
    }

    #card {
      border-radius: 20px;
    }

    .card-icon {
      font-size: 3rem;
    }

    .subtitle {
      font-size: 0.7em;
      padding-left: 40px;
      padding-right: 40px;
    }

    .subtitle li {
      margin-bottom: 2px;
    }
  }
`;

export default InteractiveCard; 