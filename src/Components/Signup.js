import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const [credientials, setcredientials] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setcredientials({ ...credientials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    const { name, email, password } = credientials;
    e.preventDefault();

    let url = "http://localhost:3000/api/auth/createuser";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.AuthToken);
      navigate("/");
      props.showAlert("Your Account is created Successfully", "Success")
    }
    else {
      props.showAlert("Invalid Credientials", "Warning")
    }
  }
  return (
    <div className="container my-4">
      <h2 className='my-2'>Signup to Excess Notebook - Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label my-2">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label my-2">Email Address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label my-2">Password</label>
          <input type="password" className="form-control" onChange={onChange} name='password' id="password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}
