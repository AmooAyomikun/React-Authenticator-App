import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons/faX'

const Navbar = () => {
    const{currentUser, logOut} = useAuth()
    const initials= currentUser ? currentUser.name.split(" ").map((name) => {
        return name[0]
    }).join("").toUpperCase()
    : ""
    const firstName = currentUser ? currentUser.name.split(" ")[0] : ""

    const[menu, setMenu] = React.useState(false)

    function handleHamburgerOpen(){
        setMenu((prevState) => !prevState)
    }
  return (
    <div className='navbar'>
        <div className="navbar-container">
            <div className="logo">
                <Link to={"/"} className='logo-link'><FontAwesomeIcon icon={faHeartPulse} /><span>Pulse</span></Link>
            </div>

            <div className="nav-menus desktop-menu">
                {currentUser === null && 
                    <>
                        <Link className='btn btn-outline' to={"/login"}>Log in</Link>
                        <Link className='btn btn-primary' to={"/signup"}>Sign up</Link>
                    </>
                }

                {currentUser && 
                    <>
                        <NavLink to={"/dashboard"} className={({isActive}) => {
                            return isActive ? "nav-link active" : "nav-link"
                        }}>Dashboard</NavLink>
                        <NavLink to={"/profile"} className={({isActive}) => {
                            return isActive ? "nav-link active" : "nav-link"
                        }}>Profile</NavLink>

                        <div className="user-info">
                            <span className='avatar'>{initials}</span>
                            <span className='first-name'>{firstName}</span>
                        </div> 
                        <button className='btn btn-primary' onClick={logOut}>Log out</button>
                    </>
                }
            </div>

            <button className="hamburger-btn" onClick={handleHamburgerOpen}>
                <FontAwesomeIcon icon={menu ? faX : faBars} />
            </button>

            <div className={`mobile-dropdown ${menu ? 'open' : ''}`}>
                <div className="mobile-menu">
                    {currentUser && 
                        <>
                            <NavLink to={"/dashboard"} onClick={() => setMenu(false)} className={({isActive}) => {
                                return isActive ? "nav-link active" : "nav-link"
                            }}>Dashboard</NavLink>
                            <NavLink to={"/profile"} onClick={() => setMenu(false)} className={({isActive}) => {
                                return isActive ? "nav-link active" : "nav-link"
                            }}>Profile</NavLink>

                            <div className="user-info">
                                <span className='avatar'>{initials}</span>
                                <span className='first-name'>{firstName}</span>
                            </div> 
                            <button className='btn btn-primary' onClick={logOut}>Log out</button>
                        </>
                    }

                    {currentUser === null && 
                        <>
                            <Link className='btn btn-outline' onClick={() => setMenu(false)} to={"/login"}>Log in</Link>
                            <Link className='btn btn-primary' onClick={() => setMenu(false)} to={"/signup"}>Sign up</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar