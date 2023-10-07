import React, { useState } from "react";
import signup from "../image/signup.png";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set, setUser } from "./LogInState";
const Login = () => {
  const navigate= useNavigate();
  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const LogInCheck = async(e) => {
    var checker = "0"
    e.preventDefault();
    await axios.post("http://localhost:2000/checkUserLog", Data)
    .then((res) => {
      checker=res.data
      console.log(checker);
    })
    .catch((err) => {
      console.error(err);
    });

    if(checker=="1"){
      set(true)
      setUser(Data.email)
        navigate('/')
    }else{
      alert("User or Password is incorrect")
    }

  };

  return (
    <>
      <Header />
      <div className="mx-4 my-5 flex items-center justify-center bg-white font-sans">
        <div className="container mx-auto flex flex-row justify-center">
          <img src={signup} alt="Signup Image" className="w-1/2 h-[25rem]" />
          <div className="rightContainer flex flex-col ml-8">
            <div className="info mt-10">
              <h3 className="text-2xl font-semibold">
                Welcome to Exclusive. Please Login
              </h3>
              <p className="mb-5 font-semibold">Enter Your Details</p>
            </div>
            
            <form>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={Data.email}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={HandleChange}
                  autoComplete="username"
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={Data.password}
                  required
                  className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-blue-500"
                  onChange={HandleChange}
                  autoComplete="current-password"
                  
                />
              </div>
              <div className="login-options mt-4">
                <button
                  className="login-button bg-red-600 text-white py-2 px-4 rounded-lg font-semibold"
                  onClick={LogInCheck}
                >
                  Log In
                </button>
                <a href="#" className="text-blue-600 ml-2">
                  Forget password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
