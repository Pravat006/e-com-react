import React, { useState } from 'react';
import OrderCard from './OrderCard'; // Import the OrderCard component
import orderService from '@/services/order.service';
import { useQuery } from '@tanstack/react-query';

// Main OrderList Component
const YourOrder = () => {
  const [filters, setFilters] = useState({
    status: '', // Changed from array to string
    time: '',   // Changed from array to string
    searchTerm: '',
  });

  const handleStatusChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: e.target.value, // Directly set the selected value
    }));
  };

  const handleTimeChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      time: e.target.value, // Directly set the selected value
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: e.target.value,
    }));
  };

  const oredrList = async () => {
  try {
    const response = await orderService.myOrders();
    if (!response || !response.data) {
      throw new Error('No data received from the server');
    }
    return response?.data.orders || [] // Ensure we return an array even if the response is empty
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw the error to be handled by React Query
  }
}



const {data:allOrders, isLoading:ordersLoading, error:ordersError} = useQuery({
  queryKey: ['orders'],
  queryFn: oredrList,
})
console.log("order data : ",allOrders);


// Filter logic
const filteredOrders = (allOrders || []).filter((order) => {
  const matchesStatus = !filters.status || order.status === filters.status;
  const matchesTime = !filters.time || order.createdAt.includes(filters.time) || order.updatedAt.includes(filters.time);
  const matchesSearch =
    !filters.searchTerm ||
    order.items.some(item =>
      item.product?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) ||
    (order._id && order._id.toString().toLowerCase().includes(filters.searchTerm.toLowerCase()));
  return matchesStatus && matchesTime && matchesSearch;
});

const statusOptions = ['On the way', 'Delivered', 'Cancelled', 'Returned'];
const timeOptions = ['Last 30 days', '2024', '2023', '2022', '2021', 'Older'];

return (
  <div className="font-sans custom-glass-5 min-h-screen  max-w-7xl w-screen">
    {/* Top Navigation / Breadcrumbs */}
    <div className="custom-glass-10 p-4 text-sm  border-b max-w-7xl mx-4 mt-3 rounded-lg">
      <div className="container mx-auto max-w-7xl">
        <span className="font-semibold text-xl text-gray-200">My Orders</span>
      </div>
    </div>

    <div className="container mx-auto p-4 max-w-7xl"> {/* <--- Add max-w-2xl here */}
      {/* Filters and Search Bar Area */}
      <div className="custom-glass-5 p-4 sm:p-6 rounded-lg shadow-md mb-6">
        {/* Filter Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-row md:flex-row md:space-x-6 space-x-2">
            {/* Order Status Filter Group */}
            <div className="mb-4 md:mb-0 flex-1">
              <label htmlFor="statusFilter" className="block text-md font-semibold text-gray-200 mb-2">FILTER BY STATUS</label>
              <select
                id="statusFilter"
                name="statusFilter"
                value={filters.status}
                onChange={handleStatusChange}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm custom-glass-10 text-gray-200 bg-opacity-10 backdrop-blur-xl"
              >
                <option value="" className='text-gray-900 hover:bg-gray-700 '> All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}
                    className='text-gray-900 hover:bg-gray-700 '
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
            {/* Order Time Filter Group */}
            <div className="flex-1">
              <label htmlFor="timeFilter" className="block text-md font-semibold text-gray-200 mb-2">FILTER BY TIME</label>
              <select
                id="timeFilter"
                name="timeFilter"
                value={filters.time}
                onChange={handleTimeChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm custom-glass-10 text-gray-200 bg-opacity-10 backdrop-blur-xl"
              >
                <option value="" className='text-gray-900 hover:bg-gray-700 '>All Time Periods</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time} className='text-gray-900 hover:bg-gray-700 '>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search by order name or ID"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 sm:mb-0  custom-glass-10"
          />
        </div>
      </div>

      {/* Main Content Area: Order List */}
      <div>
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            // Empty state styled like a card, same width
            // ...inside your render, replacing the empty state div...
            <div className="w-full sm:w-[600px] mx-auto p-8 border border-gray-200 bg-white shadow-sm rounded-lg min-h-[140px] flex flex-col items-center justify-center">
              <svg className="mx-auto h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                <p className="text-gray-600 text-sm">No orders match your current filters. Try adjusting your search criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default YourOrder;
