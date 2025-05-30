import React, { useEffect, useState } from 'react'
import AddressInput from './AddressInput';
import OrderSummeryCard from './OrderSummeryCard';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import addressService from '@/services/address.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';



function CheckouT() {

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            phoneNumber: '',
            addressType: 'home',
            country: 'India',
        }
    });
    const userDetails = useSelector((state) => state.auth.userData);
    const { items, cartTotal, status, error: cartError, coupon } = useSelector((state) => state.cart); // Renamed error to cartError

    const [selectedAddress, setSelectedAddress] = useState(null); // 1. Define selectedAddress state
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false); // 2. Initialize, will be updated by useEffect
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [manualAddress, setManualAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        phoneNumber: '',
        addressType: 'home',
        country: 'India',
    });
    // For future update functionality
    // const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
    // const [editingAddressId, setEditingAddressId] = useState(null);

    const pincodeValue = watch("pincode");

    useEffect(() => {
        const fetchAddressDetails = async () => {
            if (pincodeValue && pincodeValue.length === 6) {
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${pincodeValue}`);
                    if (!response.ok) {
                        console.warn(`API request failed for pincode ${pincodeValue} with status ${response.status}`);
                        setValue("city", "", { shouldDirty: true });
                        setValue("state", "", { shouldDirty: true });
                        // Optionally reset country or leave as is
                        // setValue("country", "India", { shouldDirty: true }); 
                        return;
                    }
                    const data = await response.json();

                    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
                        const postOffice = data[0].PostOffice[0];
                        setValue("city", postOffice.District || '', { shouldValidate: true, shouldDirty: true });
                        setValue("state", postOffice.State || '', { shouldValidate: true, shouldDirty: true });
                        setValue("country", postOffice.Country || 'India', { shouldValidate: true, shouldDirty: true });
                    } else {
                        console.warn("Pincode not found or API error:", data[0]?.Message);
                        setValue("city", "", { shouldValidate: true, shouldDirty: true });
                        setValue("state", "", { shouldValidate: true, shouldDirty: true });
                        // Optionally reset country or leave as is
                        // setValue("country", "India", { shouldValidate: true, shouldDirty: true });
                    }
                } catch (error) {
                    console.error("Error fetching pincode details:", error);
                    setValue("city", "", { shouldDirty: true });
                    setValue("state", "", { shouldDirty: true });
                }
            } else if (pincodeValue && pincodeValue.length > 0 && pincodeValue.length < 6) {
                // Clear auto-filled fields if pincode is partially typed and then corrected
                const currentCity = watch("city");
                if (currentCity) { // Only clear if fields were likely auto-filled
                    setValue("city", "", { shouldDirty: true });
                    setValue("state", "", { shouldDirty: true });
                    // setValue("country", "India", { shouldDirty: true }); // Reset country to default
                }
           }
        };

        fetchAddressDetails();
    }, [pincodeValue, setValue, watch]);

    const { data: addresses, isLoading: isAddresssLoading, error: addressesError } = useQuery({ // Renamed idAddressError
        queryKey: ["addresses"],
        queryFn: async () => {
            try {
                const res = await addressService.getAllAddress();
                return res?.success ? res?.data?.addresses : []; // 10. Ensure array or empty array
            } catch (error) {
                console.error("Error fetching addresses:", error);
                throw error; // 10. Let React Query handle the error object
            }
        }
    });

    // 3. useEffect for Initial Address Selection
    useEffect(() => {
        if (isAddresssLoading) return; // Wait for loading to finish

        if (addresses && !selectedAddress && !isAddingNewAddress /* && !isUpdatingAddress */) {
            if (Array.isArray(addresses) && addresses.length > 0) {
                const defaultAddress = addresses.find(addr => addr.isDefault);
                setSelectedAddress(defaultAddress || addresses[0]); // Select default or first
                setIsAddingNewAddress(false);
            } else if (Array.isArray(addresses) && addresses.length === 0) {
                // No addresses fetched, show the form to add one
                setIsAddingNewAddress(true);
            }
        }
    }, [addresses, selectedAddress, isAddingNewAddress, isAddresssLoading /*, isUpdatingAddress */]);

    console.log("addresses :  ", addresses);
    console.log("selectedAddress :  ", selectedAddress);


    const createAddress = async (data) => {
        try {
            const res = await addressService.createAddress(data);
            // Assuming API returns the created address object in res.data or res.data.address
            return res?.success ? (res.data?.address || res.data) : null;
        } catch (error) {
            console.log("failed to create address ");
            throw error; // Propagate error for mutation's onError
        }
    }

    const deleteAddress = async (id) => {
        try {
            const res = await addressService.deleteAddress(id);
            return res?.success ? res?.data : null;
        } catch (error) {
            console.log("failed to delete address");
            throw error; // Propagate error
        }
    };

    const queryClient = useQueryClient();

    const createAddressMutaton = useMutation({
        mutationFn: createAddress,
        onSuccess: (newlyCreatedAddress) => { // 8. Refine onSuccess
            queryClient.invalidateQueries("addresses");
            setManualAddress({ // Reset form
                addressLine1: '', addressLine2: '', city: '', state: '',
                pincode: '', phoneNumber: '', addressType: 'home', country: 'India',
            });
            setIsAddingNewAddress(false); // Hide form
            if (newlyCreatedAddress) {
                setSelectedAddress(newlyCreatedAddress); // Select the newly created address
            }
        },
        onError: (error) => {
            console.error("Error creating address:", error.message);
            // Handle user-facing error (e.g., toast)
        }
    });

    const deleteAddressMutation = useMutation({
        mutationFn: deleteAddress,
        onSuccess: (data, addressId) => { // 8. Refine onSuccess (addressId is the variable passed to mutate)
            queryClient.invalidateQueries("addresses");
            if (selectedAddress && (selectedAddress._id === addressId || selectedAddress.id === addressId)) {
                setSelectedAddress(null); // Clear selection if deleted
                // Optionally, select another address or set isAddingNewAddress(true)
            }
        },
        onError: (error) => {
            console.error("Error deleting address:", error.message);
        }
    });

    const setAddressdefault = async (addressid) => {
        try {
            const res = await addressService.setDefaultAddress(addressid);
            if (res?.success) {
                queryClient.invalidateQueries("addresses"); // Refetch to update default status
            }
            return res;
        } catch (error) {
            console.log("failed to set the address to default");
        }
    };

    const handlePayment = () => { // 9. Correct handlePayment
        const finalAddress = isAddingNewAddress /*|| isUpdatingAddress*/ ? manualAddress : selectedAddress;
        if (!finalAddress || !finalAddress.addressLine1 || !finalAddress.city || !finalAddress.pincode || !finalAddress.phoneNumber) {
            alert('Please select or enter a valid shipping address including Address Line 1, City, Pincode, and Phone Number.');
            return;
        }
        console.log('Processing payment for:', cartTotal.toFixed(2)); // Use cartTotal
        console.log('Shipping to:', finalAddress);
        alert(`Payment of $${cartTotal.toFixed(2)} processed successfully! Shipping to ${finalAddress.addressLine1}, ${finalAddress.city}.`);
    };

    // 4. Update handleSelectAddress
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        setIsAddingNewAddress(false);
        // setIsUpdatingAddress(false); // If update functionality is added
        setShowAddressModal(false);
    };

    const handleManualAddressChange = (e) => {
        const { name, value } = e.target;
        setManualAddress(prev => ({ ...prev, [name]: value }));
        // If this function is still used for RHF fields, ensure RHF is also updated:
        // setValue(name, value, { shouldValidate: true, shouldDirty: true });
    };

    // 5. Update toggleAddNewAddress
    const toggleAddNewAddress = () => {
        setIsAddingNewAddress(true);
        setSelectedAddress(null);
        // setIsUpdatingAddress(false); // If update functionality is added
        const defaultFormValues = {
            addressLine1: '', addressLine2: '', city: '', state: '',
            pincode: '', phoneNumber: '', addressType: 'home', country: 'India',
        };
        reset(defaultFormValues); // Reset RHF form
        setManualAddress(prev => ({ ...prev, ...defaultFormValues, addressType: 'home' })); // Sync addressType in local state
    };

    // 7. Implement handleCreateAddress
    const handleCreateAddress = (data) => { // RHF passes validated form data here
        // RHF handles validation based on register options.
        console.log("Submitting address data:", data);
        createAddressMutaton.mutate(data); // Use data from RHF
    };

    return (
        <div className="min-h-screen bg-white bg-opacity-5 backdrop-blur-lg py-4 px-6 sm:px-10 lg:px-8 rounded-lg mt-2">
            <div className="mx-auto w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-center text-gray-100 mb-6 sm:mb-8 lg:mb-12 [text-shadow:0_0_5px_#FFF,0_0_8px_#FFF,0_0_12px_#60A5FA,0_0_15px_#60A5FA]">
                    Checkout
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8">
                    <div className="lg:col-span-3 space-y-6 overflow-hidden min-w-0">
                        <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6 lg:p-8 w-full bg-opacity-10">
                            {selectedAddress && !isAddingNewAddress ? (
                                <div className="p-4 border border-gray-200 rounded-md bg-gray-100 bg-opacity-15 w-full">
                                    <p className="font-medium text-gray-100">{selectedAddress.addressLine1}</p>
                                    {selectedAddress.addressLine2 && <p className="text-sm text-white">{selectedAddress.addressLine2}</p>}
                                    <p className="text-sm text-white">{`${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`}</p>
                                    <p className="text-sm text-white">{selectedAddress.country}</p>
                                    <p className="text-sm text-white">Phone: {selectedAddress.phoneNumber}</p>
                                    <p className="text-sm text-white capitalize">Type: {selectedAddress.addressType}</p>
                                    {selectedAddress.isDefault && <span className="mt-1 text-xs text-green-400 font-semibold block">(Default Shipping Address)</span>}
                                    <div className="mt-3 flex items-center space-x-3">
                                        <button
                                            onClick={() => setShowAddressModal(true)}
                                            className="text-blue-600 sm:text-xl text-sm font-medium transition-all duration-200"
                                        >
                                            Change Address
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button
                                            onClick={toggleAddNewAddress}
                                            className="text-sm sm:text-xl text-blue-600 font-medium transition-all duration-200"
                                        >
                                            Add New Address
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form className="space-y-4"
                                    onSubmit={handleSubmit(handleCreateAddress)} 
                                >
                                    <AddressInput
                                        label="Address Line 1"
                                        placeholder="House No, Building, Street, Area"
                                        {...register("addressLine1", {
                                            required: "Address Line 1 is required",
                                        })}
                                        // Removed onChange={handleManualAddressChange} assuming RHF controls this
                                    />
                                    <div>
                                        <AddressInput
                                            label="Address Line 2"
                                            name="addressLine2" // name prop is good for RHF
                                            placeholder="New lane central, D-203"
                                            {...register("addressLine2")} // Simplified, add validation if needed
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <AddressInput
                                                label="City"
                                                {...register("city", {
                                                    required: "City is required",
                                                })}
                                                placeholder="e.g. Khodha"
                                            />
                                        </div>
                                        <div>
                                            <AddressInput
                                                label="State"
                                                placeholder="e.g. Odisha"
                                                {...register("state", {
                                                    required: "State is required",
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <AddressInput
                                                label="Pincode"
                                                placeholder="e.g. 752015"
                                                type="number"
                                                {...register("pincode", {
                                                    required: "Pincode is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Pincode should be 6 digits",
                                                    },
                                                    maxLength: {
                                                        value: 6,
                                                        message: "Pincode should be 6 digits",
                                                    },
                                                })}
                                            />
                                        </div>
                                        <div>
                                            <AddressInput
                                                label="Country"
                                                placeholder="e.g. India"
                                                {...register("country", { // Control with RHF
                                                    required: "Country is required",
                                                })}
                                                // Removed value and onChange previously tied to manualAddress
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <AddressInput
                                            label="Phone Number"
                                            name="phoneNumber"
                                            placeholder="e.g. +917847875599"
                                            {
                                                ...register("phoneNumber", {
                                                    required: "Phone Number is required",
                                                    pattern: {
                                                        value: /^\+?[1-9]\d{1,14}$/,
                                                        message: "Invalid phone number format",
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">Address Type</label>
                                        <div className="flex space-x-2 justify-center items-center">
                                            {['home', 'work', 'other'].map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                        setManualAddress(prev => ({ ...prev, addressType: type }));
                                                        setValue("addressType", type, { shouldDirty: true }); // Update RHF as well
                                                    }}
                                                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                                                        ${manualAddress.addressType === type // Visual state can still use manualAddress
                                                            ? 'bg-blue-600 border-blue-600 text-white ring-2 ring-blue-400 ring-offset-1 ring-offset-transparent'
                                                            : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={handleCreateAddress} // Use the new handler
                                                disabled={createAddressMutaton.isLoading}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                            >
                                                {createAddressMutaton.isLoading ? 'Creating...' : 'Create '}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Removed mock savedUserAddresses.length check, rely on fetched addresses */}
                                    {/* Button to choose from saved addresses, shown if form is active but there are addresses */}
                                    {isAddingNewAddress && addresses && addresses.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => { setIsAddingNewAddress(false); setShowAddressModal(true); }}
                                            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Choose from saved addresses
                                        </button>
                                    )}
                                </form>
                            )}
                        </div>
                        {/* Order Summary Section (Items + Subtotal) */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                            <h2 className="text-lg sm:text-xl font-medium text-gray-200 mb-4 sm:mb-6">
                                Order Summary
                            </h2>
                            <div className="space-y-3 sm:space-y-4 mb-6">
                                {
                                    status === 'loading' ? (
                                        <div className="flex justify-center items-center h-32">
                                            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.07A8 8 0 0112 20v4c-6.627 0-12-5.373-12-12h4a8 8 0 006.93 6.07zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2.93-6.07A8 8 0 0112 4V0c6.627 0 12 5.373 12 12h-4z"></path>
                                            </svg>
                                        </div>
                                    )
                                        : (
                                            items.map(item => (
                                                <OrderSummeryCard
                                                    name={item?.product.name}
                                                    id={item?.product._id}
                                                    image={item?.product.mainImage.url}
                                                    quantity={item.quantity}
                                                    price={item?.product.price * item.quantity}
                                                />
                                            ))
                                        )
                                }
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-sm sm:text-base font-medium">
                                    <span className="text-gray-200">Subtotal</span>
                                    <span className="text-gray-200">${cartTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Price Details (Shipping, Tax, Total) & Payment Button */}
                    <div className="lg:col-span-2 mt-6 lg:mt-0">
                        <div className="lg:sticky lg:top-8"> {/* Sticky container for the right column content */}
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl font-medium text-gray-200 mb-4 sm:mb-6">
                                    Price Details
                                </h2>
                                <div className="space-y-2 sm:space-y-3 mb-6">
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span className="text-gray-300">Shipping</span>
                                        <span className="text-gray-200">$0</span>
                                    </div>
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span className="text-gray-300">Tax</span>
                                        <span className="text-gray-200">$0</span>
                                    </div>
                                    <div className="flex justify-between text-base sm:text-lg font-semibold border-t border-gray-200 pt-3 mt-3">
                                        <span className="text-gray-300">Total</span>
                                        <span className="text-gray-200">${cartTotal}</span>
                                    </div>
                                </div>

                                {/* Payment Button */}
                                <button
                                    onClick={handlePayment}
                                    className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md hover:shadow-lg"
                                >
                                    Pay ${cartTotal}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="bg-white bg-opacity-5 backdrop-blur-xl p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-200">Select Shipping Address</h3>
                            <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {isAddresssLoading && <p className="text-gray-300 text-center">Loading addresses...</p>}
                            {addressesError && <p className="text-red-400 text-center">Error: {addressesError.message || "Could not load addresses"}</p>}
                            {!isAddresssLoading && !addressesError && addresses && addresses.map(address => (
                                <div
                                    key={address._id || address.id}
                                    className={`p-4 border rounded-md bg-white bg-opacity-10 cursor-pointer
                                        ${selectedAddress?._id === (address._id || address.id) // Consistent ID check
                                            ? 'border-blue-500 ring-2 ring-blue-500'
                                            : 'border-gray-600 hover:border-gray-400'}`} // Adjusted inactive border
                                    onClick={() => handleSelectAddress(address)} // Make whole div clickable
                                >
                                    {/* Removed nested div with onClick, parent div handles it */}
                                    <p className="font-medium text-gray-100">{address?.addressLine1}</p>
                                    {address?.addressLine2 && <p className="text-sm text-gray-200">{address.addressLine2}</p>}
                                    <p className="text-sm text-gray-200">{`${address?.city}, ${address?.state} - ${address?.pincode}`}</p>
                                    <p className="text-sm text-gray-200">{address?.country}</p>
                                    <p className="text-xs text-gray-200">Phone: {address?.phoneNumber}</p>
                                    <p className="text-xs text-gray-200 capitalize">Type: {address?.addressType}</p>
                                    {address.isDefault && <span className="mt-1 text-xs text-green-400 font-semibold block">(Default)</span>}

                                    <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
                                        {!address.isDefault && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent selecting address
                                                    setAddressdefault(address._id || address.id);
                                                }}
                                                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                        <div className="flex space-x-2"> {/* Wrapper for Update/Delete */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // handleStartUpdate(address); // Placeholder for update
                                                    console.log("Update address:", address._id || address.id);
                                                }}
                                                className="text-xs text-yellow-400 hover:text-yellow-300 font-medium"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm("Are you sure you want to delete this address?")) {
                                                        deleteAddressMutation.mutate(address._id || address.id);
                                                    }
                                                }}
                                                disabled={deleteAddressMutation.isLoading && deleteAddressMutation.variables === (address._id || address.id)}
                                                className="text-xs text-red-400 hover:text-red-300 font-medium disabled:opacity-50"
                                            >
                                                {deleteAddressMutation.isLoading && deleteAddressMutation.variables === (address._id || address.id) ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!isAddresssLoading && !addressesError && addresses && addresses.length === 0 && (
                                <p className="text-gray-400 text-center">No saved addresses found. Please add one.</p>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                toggleAddNewAddress(); // This will set isAddingNewAddress to true and clear selectedAddress
                                setShowAddressModal(false);
                            }}
                            className="mt-6 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Add New Address
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckouT;