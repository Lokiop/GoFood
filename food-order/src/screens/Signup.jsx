import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    userName: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: credentials.userName,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!data.success) {
      alert("Enter Valid Credentials");
      return;
    }

    navigate("/");
  };

  const onChange = (event) => {
    setcredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
        >
          <div className="m-3">
            <label htmlFor="userName" className="form-label">
              UserName
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={credentials.userName}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="geolocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="geolocation"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-primary">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}
