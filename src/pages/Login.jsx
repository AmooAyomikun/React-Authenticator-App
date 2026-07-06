import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faContactCard } from '@fortawesome/free-regular-svg-icons'

const Login = () => {
  const{login} = useAuth()
  const[formData, setFormData] = React.useState({
    email: "",
    password: ""
  })

  const[passwordIcon, setpasswordIcon] = React.useState(false)

  const[error, setError] = React.useState({})

  const navigate = useNavigate()

  function handleChange(event){
    const{name, value} = event.target

    setFormData((prevState) => {
      return{
        ...prevState,
        [name]: value
      }
    })

    setError((prevState) => {
      return{
        ...prevState,
        [name]: ""      }
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    let validationError = {}
    
    if(!formData.email.trim()){
      validationError.email = "Email field is empty"
    }

    if(!formData.password.trim()){
      validationError.password = "Password field is empty"
    }

    if(Object.keys(validationError).length > 0){
      setError(validationError)
    }else{
      setError({})
      const loginDetailsError = login(formData.email,formData.password)

      if(loginDetailsError){
        setError({
          formData: loginDetailsError
        })
      }else{
        navigate("/dashboard")
      }
    }
  }

  function togglePasswordIcon(){
    setpasswordIcon((prevState) => !prevState)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <form onSubmit={handleSubmit} className='form login-form'>
          <div className="login-heading">
            
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faContactCard} className='signup-logo' />
            <h1 className='page-title'>Welcome Back</h1>
            <p className='page-description'>Sign in to continue building your habits.</p>
            {error.formData && <p className="form-error text-center">{error.formData}</p>}
            <label htmlFor="email">Email address</label>
            <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email}
                  placeholder="john@example.com"
                  onChange={handleChange}
                  autoComplete="email"
                  className={`input ${error.email ? "input-error" : ""}`}
            />
            {error.email && <p className="form-error">{error.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input 
                    type={passwordIcon ? "text" : "password"} 
                    id='password'
                    name='password'
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    className={`input ${error.password ? "input-error" : ""}`}
              />
              <button type='button' className='password-toggle' onClick={togglePasswordIcon}>{passwordIcon ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</button>
            </div>
            <span className='text-muted'>Forgot Password?</span>
            {error.password && <p className="form-error">{error.password}</p>}
          </div>

          <button className='btn btn-primary'>Log in</button>
          <p className="login-footer text-muted">
            Don't have an account?
            <Link to="/signup"> Create one</Link>
        </p>
        </form>
      </div>
    </div>
  )
}

export default Login