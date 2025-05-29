import React from 'react';

// AddressList component to display a list of user addresses.
// It expects a prop 'addresses' which is an array of address objects.
const AddressList = () => {
    // If no addresses are provided or the array is empty, display a message.

    const addresses = [
        {
            id: 'addr1',
            type: 'Home',
            street: '123 Main Street',
            city: 'Anytown',
            state: 'CA',
            zipCode: '90210',
            country: 'USA',
            phone: '555-123-4567'
        },
        {
            id: 'addr2',
            type: 'Work',
            street: '456 Business Ave',
            city: 'Metropolis',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
            phone: '555-987-6543'
        },
        {
            id: 'addr3',
            type: 'Vacation Home',
            street: '789 Beach Road',
            city: 'Seaside',
            state: 'FL',
            zipCode: '33101',
            country: 'USA',
            phone: '555-222-3333'
        },
    ];

    if (!addresses || addresses.length === 0) {
        return (
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-lg shadow-md">
                <p className="font-semibold">No addresses found.</p>
                <p className="text-sm">Please add an address to your profile.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-200 pb-4">
                Your Saved Addresses
            </h2>
            <ul className="space-y-6">
                {addresses.map((address, index) => (
                    <li
                        key={address.id || index} // Use a unique ID if available, otherwise index (less ideal for dynamic lists)
                        className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{address.type || `Address ${index + 1}`}</h3>
                            {/* Example of an edit/delete button, you'd add functionality here */}
                            <div className="flex gap-2">
                                <button
                                    className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-800 transition-colors duration-200"
                                    aria-label="Edit address"
                                >
                                    {/* Inline SVG for edit icon (example from Lucide React or similar) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-edit">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                                    </svg>
                                </button>
                                <button
                                    className="p-2 rounded-full bg-red-200 hover:bg-red-300 text-red-800 transition-colors duration-200"
                                    aria-label="Delete address"
                                >
                                    {/* Inline SVG for delete icon (example from Lucide React or similar) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" x2="10" y1="11" y2="17"></line>
                                        <line x1="14" x2="14" y1="11" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-700 text-base">{address.street}</p>
                        <p className="text-gray-700 text-base">{address.city}, {address.state} {address.zipCode}</p>
                        <p className="text-gray-700 text-base">{address.country}</p>
                        {address.phone && <p className="text-gray-700 text-base mt-2">Phone: {address.phone}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddressList;



