import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imagine from '../assets/img-01.png';

function LoginPage() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const image = event.target;
    const imageRect = image.getBoundingClientRect();
    const offsetX = event.clientX - imageRect.left - imageRect.width / 2;
    const offsetY = event.clientY - imageRect.top - imageRect.height / 2;
    const rotationX = offsetX / 10;
    const rotationY = -offsetY / 10;
    setRotation({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className='login-page-container'>
      <div className="middle-container">
        <div className="form-container-and-image">
          <div className="right-side">
            <img
              src={imagine}
              alt="image-login"
              style={{
                perspective: '300px',
                transform: `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
                willChange: 'transform'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              
            />
          </div>
          <div className="left-side">
            <h1 className='member-info'>Member Login</h1>


            <form action="" className='form-action-log-in'>
              
                <div className="input-form">

                  <input type="text"  placeholder='Email'/>
                  <input type="password" placeholder='Password' />
                </div>


                <button className='btn-login-submit'>Submit</button>
            </form>    

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
