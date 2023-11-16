import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();

  const logout  = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">INotebook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className='d-flex'>
            <Link className="btn btn-primary mx-2" to="Login" role="button">Login</Link>
            <Link className="btn btn-primary" to="Signup" role="button">Signup</Link>
            </form>: <button className='btn btn-primary' onClick={logout}>Logout</button>}
          </div>
        </div>
      </nav>

    )
}
