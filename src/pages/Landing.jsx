import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import heroImage from "../images/Screenshot (2).png"
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing-page text-center'>
        <div className="landing-page-badge">
            <span>Track your habits, build momentum</span>
        </div>

        <p className="page-title">
            Build habits that actually stick
        </p>

        <p className="page-description">
            Pulse helps you track daily habits, build streaks, and stay accountable - all in one clean, focused dashboard.
        </p>

        <div className="landing-page-btn">
            <Link to="/signup" className='btn btn-outline'>Get started free</Link>
            <Link to="/login" className="btn btn-primary">Log in</Link>
        </div>

        <div className="hero-stats">
            <div className="hero-stat">
                <h2>20k+</h2>
                <p>Habits Completed</p>
            </div>
            
            <div className="hero-stat">
                <h2>
                    4.9<FontAwesomeIcon icon={faStar} style={{ fontSize: '1.5rem', verticalAlign: 'middle' }} />
                </h2>
                <p>User Rating</p>
            </div>
            
            <div className="hero-stat">
                <h2>150+</h2>
                <p>Countries</p>
            </div>
            
            <div className="hero-stat">
                <h2>98%</h2>
                <p>Daily Retention</p>
            </div>
        </div>

        <div className="hero-image">
            <img src={heroImage} alt="" />
        </div>
    </div>
  )
}

export default Landing