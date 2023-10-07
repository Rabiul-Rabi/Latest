
import axios from 'axios';
import mysignup from '../image/signup.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
axios
const Sign_up = () => {
  const navigate = useNavigate();
  const [data,setData] = useState("")

  const CreateHandle = async(e) => {
    var checker = "0"
    e.preventDefault();
    await axios.post("http://localhost:2000/checkUser", data)
    .then((res) => {
      
      checker=res.data
      console.log(checker);
    })
    .catch((err) => {
      console.error(err);
    });

   if(checker=="0"){
   await axios.post("http://localhost:2000/signUp", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
    alert("Successfully Signed Up");
    navigate('/')
   }else{
      alert("The user is exist. Please Log In");
   } 
  }
  
 const HandleChange = (e)=>{
  setData({
    ...data, [e.target.name]:e.target.value
  })

 }
// useEffect(()=>{
//   console.log(data)
// },[])



  return (
    <>
    <Header/>

      <div className="mx-4 my-4 flex items-center justify-center bg-white font-sans">
        <div className="container mx-auto flex flex-row justify-center">
          <img src={mysignup} alt="Signup Image" className="w-1/2 h-[25rem]" />
          <div className="rightContainer flex flex-col ml-8">
            <div className="info">
              <h3 className="text-2xl font-bold">Create an Account</h3>
              <p className='text-xl font-bold'>Enter Your Details</p>
            </div>
            <form>

            
            <div className="input-container">
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={data.name || ""}
                onChange={HandleChange}
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-blue-500"
                value={data.email || ""}
                onChange={HandleChange}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-blue-500"
                value={data.password || ""}
                onChange={HandleChange}
              />
            </div>
            <button className="signup-button bg-red-600 text-white py-2 px-4 rounded-lg mt-4 font-semibold" onClick={CreateHandle}>
              Create An Account
            </button>
            <button className="gbtn bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 font-semibold">
              Log In with Google
            </button>
            <div className="login-options flex-1 text-left mt-4">
              <p>
                Already have an account?{' '}
                <a href="http://localhost:3000/Login" className="text-blue-600">
                  Log In
                </a>
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Sign_up;
