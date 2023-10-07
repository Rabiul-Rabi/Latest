import { NavLink } from "react-router-dom";
import { getUser } from "./LogInState";
const Product = (props) => {
  return (
    <div className="product-card border border-gray-500 rounded-lg p-4 relative h-100 w-80 mx-7 mb-4">
      <div className="product-icons absolute top-2 left-2 flex flex-col">
        <span className="text-2xl">❤️</span>
        <span className="text-2xl">👁️</span>
      </div>

      <div className="product-discount absolute top-2 right-2 bg-red-500 text-white rounded-md p-1">
       {props.discount}
      </div>

     <div className="">
     
     <NavLink to={{
      pathname:'/NewDesign'} } state={{props}}>
        <img
          className="product-image w-60 h-60 block mx-auto "
          src={props.imageUrl}
          alt="My Image"
        />
      </NavLink>
     </div>
      



      <button className="add-to-cart-button bg-black text-white border-none px-3 py-2 mt-2 w-full rounded-md hover:bg-gray-800">
      {/*
      <NavLink to={{ pathname: '/AddToCard', state: props }}>Add to Cart</NavLink>
      <Link to={{
        pathname:"/AddToCard",
        state: {name:"omuk"}
      }}>Add to Cart</Link> 
      */}
      
      <NavLink to={{pathname :'/AddToCard'}}
 
      state={{props, quantity : "1"}} >Add to Cart</NavLink>

    </button>

      <div className="product-name text-left mt-2 font-semibold">
        {props.name}
      </div>
      <div className="product-price text-left font-bold mt-2">
        ${props.price}
      </div>

      <div className="product-rating text-left mt-2 text-yellow-500">
        ★★★★☆
      </div>
    </div>
  );
};

export default Product;
