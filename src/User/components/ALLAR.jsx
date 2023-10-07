import { useEffect, useState } from "react";
import Header from "./Header";
import Product from "./Product";
import Sliders from "./Sliders";
import Category from "./Category";
import Footer from "./Footer";

function Body() {
  const [upcomingData, setUpcomingData] = useState([]);
  const [newArrivalsData, setNewArrivalsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/userdata?cName=Upcommings")
      .then((response) => response.json())
      .then((result) => {
        setUpcomingData(result);
      })
      .catch((error) => console.error("Error fetching Upcoming data:", error));

    fetch("http://localhost:2000/userdata?cName=NewArrivals")
      .then((response) => response.json())
      .then((result) => {
        setNewArrivalsData(result);
      })
      .catch((error) =>
        console.error("Error fetching NewArrivals data:", error)
      );
  }, []);

  return (
    <div className="App">
      <Header />

      <section className="bg-light py-5">
        <div className="container">
         
        <div className="grid grid-cols-6 gap-4">
            <p className="col-start-1 col-end-3 mx-4 text-left text-3xl font-bold mb-5">New Arrival</p>
            <button type="button" className=" col-start-7 col-end-7 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">See All</button>

          </div>

          <div className="flex ">
            {newArrivalsData.map((item, index) => (
              <div className="product-flex-item" key={index}>
                <Product className="m-20"
                   id={item._id}
                   name={item.name}
                   imageUrl={item.imageUrl}
                   discount={item.discount}
                   price={item.price}
                   brand ={item.brand}
                   description = {item.description}
                   rating = {item.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Body;
