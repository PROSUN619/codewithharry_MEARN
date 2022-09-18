import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../contexts/notes/AlertContext';



const Login = () => {

    const context = useContext(AlertContext)
    const { handleAlert } = context;

    const [credential, setCredential] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credential.email, password: credential.password}) // body data type must match "Content-Type" header
        });
        const auth = await response.json(); // parses JSON response into native JavaScript objects
        if (auth.success){
            localStorage.setItem('token',auth.authtoken);
            navigate("/");
            handleAlert('success','Login Successful');
        }
        else{
            handleAlert('danger','Unable to login');
        }
    }


    return (
        <div className='container my-3'>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credential.email} onChange={handleOnChange} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} onChange={handleOnChange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login