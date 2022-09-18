import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../contexts/notes/AlertContext';

const Signup = () => {

    const context = useContext(AlertContext)
    const { handleAlert } = context;

    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: ""})
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : credential.name, email: credential.email, password: credential.password}) // body data type must match "Content-Type" header
        });
        const auth = await response.json(); // parses JSON response into native JavaScript objects
        if (auth.success){
            localStorage.setItem('token',auth.authtoken);
            navigate("/");
            handleAlert('success','User created');
        }
        else{
            handleAlert('success',auth.errors);
        }
    }


    return (
        <div className='container my-3'>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={credential.name} onChange={handleOnChange} name="name"  required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credential.email} onChange={handleOnChange} name="email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} onChange={handleOnChange} name="password" required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="cpassword" value={credential.cpassword} onChange={handleOnChange} name="cpassword" required minLength={5}/>
                </div>                
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup