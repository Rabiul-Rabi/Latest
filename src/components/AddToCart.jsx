import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "./LogInState";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Body from "../Body";
import axios from "axios";

const AddCart = () => {
//  const navigate = useNavigate();
  const {state} = useLocation();
  const userName = getUser();
  
  console.log(userName)
  // const [productData,setDAta] = useState({
  //   email : userName,
  //   id: state.props.id,
  //   name: state.props.name,
  //   description: state.props.description,
  //   category: state.props.category,
  //   price: state.props.price,
  //   brand: state.props.brand,
  //   discount:state.props.discount,
  //   imageUrl: state.props.imageUrl,
  //   rating: state.props.rating
  // })
   
    const Data =state.props;
  //   let user=""
  //  async function uploadCard(){
  //    await axios
  //    .post("http://localhost:2000/CardUser", userName)
  //    .then((res) => {
  //      user=res.data;
  //    })
  //    .catch((err) => {
  //      console.error(err);
  //    });
  //    console.log("This is ",user)
      
     // console.log(uploadCard)
    //  if(user==""){
    // await  axios
    //   .post("http://localhost:2000/uploadCard", productData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    //   console.log("posting card")
    //  }
    // }



  // function callNavigate(){
  //    alert("Please Log In First ")
  //    navigate("/")
  // }


  // useEffect(() => {
  //   // console.log("useEff");
  //   // if (userName !== "") {
      
  //   //   uploadCard();
  //   // } else if (userName === "") {
  //   //   callNavigate();
  //   // }
  // }, []);
  
  



  return (
    <>
    
        <p className="text-4xl mb-5 ml-10 mt-10 text-center"> My Cart </p>

<div className="cartProduct flex justify-center mb-10">
  <table className="shadow-lg bg-white border-separate">
    <thead>
      <tr>
        <th className="bg-blue-100 border text-left px-8 py-4">Product Image</th>
        <th className="bg-blue-100 border text-left px-8 py-4">Product Name</th>
        <th className="bg-blue-100 border text-left px-8 py-4">Quantity</th>
        <th className="bg-blue-100 border text-left px-8 py-4">Product Price</th>
        {/* <th className="bg-blue-100 border text-left px-8 py-4">Price</th> */}
      </tr>
    </thead>
    <tbody>
    
        <tr>
          <td className="border text-left px-8 py-4">
            <img
              src={Data.imageUrl}
              alt={Data.name}
              style={{ width: "100px", height: "100px" }}
            />
          </td>
          <td className="border text-left px-8 py-4">{Data.name}</td>
          <td className="border text-left px-8 py-4">{state.quantity}</td>
          <td className="border text-left px-8 py-4">${Data.price}</td>
          {/* <td className="border text-left px-8 py-4">
            ${Data.price}
          </td> */}
        </tr>
    </tbody>
  </table>
</div>
      
    </>
  );
};

export default AddCart;
