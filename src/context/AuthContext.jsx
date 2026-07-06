import React from "react";
import { useContext, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const[currentUser, setCurrentUser] = React.useState(() => {
        const saved = localStorage.getItem("currentUser")
        return saved ? JSON.parse(saved) : null
    })

    const[users, setUsers] = React.useState(() => {
        const saved = localStorage.getItem("users")
        return saved ? JSON.parse(saved) : []
    })

    function signUp(name, email, password){
        const userExists = users.some((user) => {
            return user.email.toLowerCase() === email.toLowerCase()
        })

        if(userExists){
            throw new Error("This email is already registered")
        }

        const newUser = {
            id: String(Date.now()),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        }

        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)

        localStorage.setItem("users", JSON.stringify(updatedUsers))

        setCurrentUser(newUser)
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        return null
    }

    function login(email, password){
        const foundUser = users.find((user) => {
            return user.email === email && user.password === password
        })

        if(!foundUser){
            return "Incorrect email or password"
        }

        setCurrentUser(foundUser)
        
        localStorage.setItem("currentUser", JSON.stringify(foundUser))

        return null
    }

    function logOut(){
        setCurrentUser(null)

        localStorage.removeItem("currentUser")
    }

    return(
        <AuthContext.Provider value={{currentUser, users, signUp, login, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}