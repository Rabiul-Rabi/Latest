
import { useLocation } from "react-router-dom";

const Single_Product = () => {
  const location = useLocation();
  const productProps = location.state.props; 
  console.log(productProps)
  if (!productProps) {
    
    return <div>No product data available.</div>;
  }

  return (
    <>
      <div className="producDetails p-10 flex justify-center">
        <div className="left-side h-500 w-auto">
          <img className="max-w-sm" src={productProps.imageUrl} alt={productProps.name} />
        </div>
        <div className="vertical border-l-2 border-slate-500">
          <div className="right-side ml-10">
            <h3 className="mb-5 font-bold text-xl text-slate-500">{productProps.name}</h3>
            <p className="mb-5">★★★★☆</p>
            <h2 className="mb-5 font-bold text-xl text-slate-500">${productProps.price}</h2>

            <label className="mb-5 mt-5 block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="1"
              min="1"
              max="5"
              className="mb-10 bg-slate-100 mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

              <button className="mr-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Add To Cart
              </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="description">
        <h2 className="font-bold ml-5 text-2xl mt-5">Description</h2>
        <p className="ml-5 mb-5 mr-10">{productProps.description}</p>
      </div>
    </>
  );
};

export default Single_Product;
