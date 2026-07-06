import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck'

const Dashboard = () => {
  const{currentUser} = useAuth()

  const firstName = currentUser.name.split(" ")[0]

  const hours = new Date().getHours()
  let greetings;

  if(hours < 12){
    greetings = "Good Morning ☀️"
  }else if(hours < 18){
    greetings = "Good Afternoon 🌤"
  }else{
    greetings = "Good Evening 🌙"
  }

  const todayHabits = [
    {
      id:1,
      title:"Drink Water",
      completed:true
    },
    {
      id:2,
      title:"Read 20 Minutes",
      completed:false
    },
    {
      id:3,
      title:"Exercise",
      completed:true
    },
    {
      id:4,
      title:"Meditate",
      completed:false
    }
  ]

  const formatedDate = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='dashboard'>
      <section className="dashboard-header">
        <h1 className="page-title">Welcome back, {firstName}</h1>
        <p className="page-description">
          {greetings}. You've completed 82% of your habits this week.
        </p>
      </section>
      
      <section className="dashboard-stats">
        <div className="dashboard-stat">
          <FontAwesomeIcon icon={faFire} />
          <p>Current streak</p>
          <h1>12 days</h1>
        </div>

        <div className="dashboard-stat">
          <FontAwesomeIcon icon={faChartLine} />
          <p>Habits tracked</p>
          <h1>5</h1>
        </div>

        <div className="dashboard-stat">
          <FontAwesomeIcon icon={faBullseye} />
          <p>Completion rate</p>
          <h1>82%</h1>
        </div>
      </section>

      <section className="today-habits">
        {todayHabits.map((habit) => {
          return(
            <p key={habit.id}>
              <FontAwesomeIcon className={habit.completed ? "completed" : "not-completed"} icon={faCalendarCheck} />
              {habit.title}
            </p>
          )
        })}
      </section>

      <section className="account-card">
        <h1>Account Information</h1>
        <div className="info">
          <p>Logged in as</p>
          <span>{currentUser.email}</span>
        </div>

        <div className="info">
          <p>Account created</p>
          <span>{formatedDate}</span>
        </div>

        <div className="info">
          <p>Session status</p>
          <span>Active - persisted via localStorage</span>
        </div>
      </section>
    </div>
  )
}

export default Dashboard