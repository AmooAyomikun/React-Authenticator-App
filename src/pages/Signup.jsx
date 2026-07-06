import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faContactCard } from '@fortawesome/free-regular-svg-icons/faContactCard'

const Signup = () => {
    const{signUp} = useAuth()

    const[formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const[error, setError] = React.useState({})
    const[showPassword, setShowPassword] = React.useState(false)
    const[showConfirmPassword, setShowConfirmPassword] = React.useState(false)

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
                [name]: "",
                formData: ""
            }
        })

    }

    const navigate = useNavigate()
    function handleSubmit(event){
        event.preventDefault()
        let validationError={}

        if(!formData.name.trim()){
            validationError.name = "Enter your name"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!formData.email.trim()){
            validationError.email = "Email is required"
        }else if(!emailRegex.test(formData.email)){
            validationError.email = "Please enter a valid email"
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/
        if(!formData.password.trim()){
            validationError.password = "Password is required"
        }else if(!passwordRegex.test(formData.password)){
            validationError.password = "Password must contain an uppercase, a lowercase, a special character, and a number"
        }

        if(!formData.confirmPassword.trim()){
            validationError.confirmPassword = "Enter your password again"
        }else if(formData.password !== formData.confirmPassword){
            validationError.confirmPassword = 'Passwords do not match! Form submission halted.'
        }

        console.log(validationError)
        if(Object.keys(validationError).length > 0){
            validationError.formData = "Please fix the errors below before submitting.";
            setError(validationError)
        }else {
            setError({})
            try {
                signUp(formData.name, formData.email, formData.password) 
                navigate("/dashboard")
            } catch(err) {
                setError({
                    email: err.message,
                    formData: "Please fix the errors below before submitting."
                })
            }
        }
    }

    function showPasswordToggle(){
        setShowPassword((prevState) =>  !prevState )
    }

    function showConfirmPasswordToggle(){
        setShowConfirmPassword((prevState) => !prevState)
    }
  return (
    <div className='signup-page'>
        <div className="signup-card">
            <FontAwesomeIcon icon={faContactCard} className='signup-logo' />
            <h1 className='page-title'>Create your Pulse account</h1>
            <p className="page-description">Join thousands of users building healthier routines every day.</p>

            <form onSubmit={handleSubmit} className='form signup-form'>
                <div className="form-group">
                    {error.formData && <p className="form-error text-center">{error.formData}</p>}
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                        type="text"
                        value={formData.name}
                        name='name'
                        autoComplete='name'
                        id='fullName'
                        placeholder="John Doe"
                        onChange={handleChange}
                        className={`input ${error.name ? "input-error" : ""}`}
                    />
                    {error.name && <p className="form-error">{error.name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id='email'
                        autoComplete='email'
                        name='email'
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input ${error.email ? "input-error" : ""}`}
                    />
                    {error.email && <p className="form-error">{error.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id='password'
                            name='password'
                            autoComplete='new-password'
                            value={formData.password}
                            placeholder="Minimum 8 characters"
                            onChange={handleChange}
                            className={`input ${error.password ? "input-error" : ""}`}
                        />
                        <button type='button' className='password-toggle' onClick={showPasswordToggle}>{showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                    </div>
                    {error.password && <p className="form-error">{error.password}</p> }
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-wrapper">
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            id='confirmPassword'
                            name='confirmPassword'
                            autoComplete='new-password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`input ${error.confirmPassword ? "input-error" : ""}`}
                        />
                        <button type='button' className='password-toggle' onClick={showConfirmPasswordToggle}>{showConfirmPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                    </div>
                    {error.confirmPassword && <p className="form-error">{error.confirmPassword}</p>}
                </div>

                <button type='submit' className="btn btn-primary">Create Account</button>

                <div className='divider'>or</div>

                <div className="signup-footer">
                    <h3>Already have an account?<Link to={"/login"}>Log in</Link></h3>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup