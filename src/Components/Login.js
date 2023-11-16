import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

export default function Login(props) {
  const [credientials, setcredientials] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credientials.email, password: credientials.password })
    })

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.AuthToken);
      navigate("/");
      props.showAlert("Login Successfully","Success")
    }
    else {
      props.showAlert("Invalid Credientials","Warning")
    }
  }

  const onChange = (e) => {
    setcredientials({ ...credientials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
      <h2 className='my-2'>Login to Excess Notebook - Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label my-2 ">Email address</label>
          <input type="email" className="form-control" value={credientials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label my-2 ">Password</label>
          <input type="password" className="form-control" value={credientials.password} id="password" name='password' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
