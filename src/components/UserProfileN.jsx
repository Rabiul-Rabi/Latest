// src/components/UserProfile.js
import React from 'react';
import { getUser } from './LogInState';
const UserProfile = () => {
  // You can replace this with actual user data
  const user = {
    name: getUser(),
    email: getUser(),
    addr: 'Kalaroa,Sathkhira,Khulna',
    contact: '01753584194'
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar */}
        <div className="h-screen w-1/4 p-4 bg-gray-500 text-white shadow-md">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#my-info" className=" hover:text-white">My Info</a>
            </li>
            <li>
              <a href="#cart-products" className=" hover:text-white">Cart Products</a>
            </li>
            <li>
              <a href="#billing-history" className=" hover:text-white">Billing History</a>
            </li>
          </ul>
        </div>

        {/* User Info */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome {user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <hr className="my-4" />
          <h3 className="text-xl font-semibold text-gray-800">Address</h3>
          <p className="text-gray-600">{user.addr}</p>
          <hr className="my-4" />
          <h3 className="text-xl font-semibold text-gray-800">Contact No.</h3>
          <p className="text-gray-600">{user.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
