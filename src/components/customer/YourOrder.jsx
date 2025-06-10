import React, { useState } from 'react';
import OrderCard from './OrderCard'; // Import the OrderCard component
import OrderCardSkeleton from './OrderCardSkeleton'; // Import the Skeleton Card
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
    staleTime: 5 * 60 * 1000, // Added staleTime for caching, adjust as needed
  })

  // Filter logic
  const filteredOrders = (allOrders || []).filter((order) => {
    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesTime = !filters.time || 
      (order.createdAt && new Date(order.createdAt).getFullYear().toString() === filters.time) || // Example: Match by year
      (filters.time === 'Last 30 days' && new Date(order.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Example: Match last 30 days
    // Add more sophisticated time filtering based on your timeOptions values
    ;
    const matchesSearch =
      !filters.searchTerm ||
      order.items.some(item =>
        item.product?.name?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) ||
      (order._id && order._id.toString().toLowerCase().includes(filters.searchTerm.toLowerCase()));
    return matchesStatus && matchesTime && matchesSearch;
  });

  const statusOptions = ['On the way', 'Delivered', 'Cancelled', 'Returned'];
  // For time filtering, you might want to use actual date ranges or year values
  const timeOptions = [
    { label: 'All Time Periods', value: '' },
    { label: 'Last 30 days', value: 'Last 30 days' }, // This will need special handling in filter
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    { label: 'Older', value: 'Older' } // This will also need special handling
  ];

  if (ordersError) {
    return (
      <div className="font-sans custom-glass-5 min-h-screen max-w-7xl w-screen p-4">
        <div className="custom-glass-10 p-4 text-center rounded-lg">
          <h3 className="text-lg font-medium text-red-500 dark:text-red-400 mb-1">Error Fetching Orders</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{ordersError.message || "An unexpected error occurred."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="font-sans bg-white/5 dark:bg-gray-800/5 min-h-screen max-w-7xl w-screen my-5 rounded-lg">
      {/* Top Navigation / Breadcrumbs */}
      <div className="bg-white/10 dark:bg-gray-800/10 p-4 text-sm theme-border max-w-7xl mx-4 mt-3 rounded-lg theme-border">
        <div className="container mx-auto max-w-7xl">
          <span className="font-semibold text-xl text-gray-800 dark:text-gray-200">My Orders</span>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-7xl"> 
        {/* Filters and Search Bar Area */}
        <div className="custom-glass-5 p-4 sm:p-6 rounded-lg shadow-md mb-6 theme-border">
          {/* Filter Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-row md:flex-row md:space-x-6 space-x-2">
              {/* Order Status Filter Group */}
              <div className="mb-4 md:mb-0 flex-1">
                <label htmlFor="statusFilter" className="block text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">FILTER BY STATUS</label>
                <select
                  id="statusFilter"
                  name="statusFilter"
                  value={filters.status}
                  onChange={handleStatusChange}
                  className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white/10 dark:bg-gray-800/10 text-gray-800 dark:text-gray-200"
                >
                  <option value="" className='text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'> All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}
                      className='text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              {/* Order Time Filter Group */}
              <div className="flex-1">
                <label htmlFor="timeFilter" className="block text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">FILTER BY TIME</label>
                <select
                  id="timeFilter"
                  name="timeFilter"
                  value={filters.time}
                  onChange={handleTimeChange}
                  className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white/10 dark:bg-gray-800/10 text-gray-800 dark:text-gray-200"
                >
                  {timeOptions.map((timeOpt) => (
                    <option key={timeOpt.value} value={timeOpt.value} className='text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'>
                      {timeOpt.label}
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
              className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 mb-3 sm:mb-0 custom-glass-10 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Main Content Area: Order List */}
        <div>
          <div className="space-y-4">
            {ordersLoading ? (
              Array.from({ length: 3 }).map((_, index) => ( // Display 3 skeleton cards
                <OrderCardSkeleton key={index} />
              ))
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              // Empty state styled like a card, same width
              <div className="w-full p-8 border border-gray-300 dark:border-gray-700 custom-glass-10 shadow-sm rounded-lg min-h-[140px] flex flex-col items-center justify-center text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">No orders found</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">No orders match your current filters. Try adjusting your search criteria.</p>
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
