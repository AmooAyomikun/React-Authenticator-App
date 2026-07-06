import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'

const Profile = () => {
  const{currentUser, logOut} = useAuth()

  const avatar = currentUser.name.split(" ").map((name) => {
    return name[0]
  }).join("").toUpperCase()

  const navigate = useNavigate()

  function handleLogout(){
    logOut()
    navigate("/")
  }

  const formatedDate = new Date(currentUser.createdAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return (
    <div className='profile-page'>
      <div className="left-profile">
        <div className="avatar">{avatar}</div>
        <p>{currentUser.name}</p>
        <p>{currentUser.email}</p>
        <p>Member since: {formatedDate}</p>
        <button className="btn btn-danger" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /> Log out</button>
      </div>

      <div className="right-profile">
        <h1 className="page-title">Account details</h1>
        <form className='profile-form'>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input 
                  type="text" 
                  id='name'
                  value={currentUser.name}
                  className='input'
                  readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
                  type="email" 
                  id='email'
                  value={currentUser.email}
                  className='input'
                  readOnly
            />
          </div>

          <button className='btn btn-primary' type='button' disabled>Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default Profile