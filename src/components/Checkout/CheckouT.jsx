import React, { useEffect, useState } from 'react';
import AddressInput from './AddressInput';
import OrderSummeryCard from './OrderSummeryCard';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import addressService from '@/services/address.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import orderService from '@/services/order.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};


function CheckouT() {
    // React Hook Form setup for address fields
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

    // Redux selectors for user and cart data
    const userDetails = useSelector((state) => state.auth.userData);
    const { items, cartTotal, status, error: cartError, coupon } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    // Local state for address and modal management
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    // Watch pincode value for auto-filling city/state
    const pincodeValue = watch("pincode");

    // Razorpay payment state
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');

    // Load Razorpay script on mount
    useEffect(() => {
        loadScript('https://checkout.razorpay.com/v1/checkout.js').then(loaded => {
            if (!loaded) {
                setPaymentError("Failed to load Razorpay SDK. Please refresh and try again.");
            }
        });
    }, []);

    // Auto-fill city/state/country based on pincode
    useEffect(() => {
        const fetchAddressDetails = async () => {
            if (pincodeValue && pincodeValue.length === 6) {
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${pincodeValue}`);
                    if (!response.ok) {
                        setValue("city", "", { shouldDirty: true });
                        setValue("state", "", { shouldDirty: true });
                        return;
                    }
                    const data = await response.json();
                    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
                        const postOffice = data[0].PostOffice[0];
                        setValue("city", postOffice.District || '', { shouldValidate: true, shouldDirty: true });
                        setValue("state", postOffice.State || '', { shouldValidate: true, shouldDirty: true });
                        setValue("country", postOffice.Country || 'India', { shouldValidate: true, shouldDirty: true });
                    } else {
                        setValue("city", "", { shouldValidate: true, shouldDirty: true });
                        setValue("state", "", { shouldValidate: true, shouldDirty: true });
                    }
                } catch (error) {
                    setValue("city", "", { shouldDirty: true });
                    setValue("state", "", { shouldDirty: true });
                }
            } else if (pincodeValue && pincodeValue.length > 0 && pincodeValue.length < 6) {
                const currentCity = watch("city");
                if (currentCity) {
                    setValue("city", "", { shouldDirty: true });
                    setValue("state", "", { shouldDirty: true });
                }
            }
        };
        fetchAddressDetails();
    }, [pincodeValue, setValue, watch]);

    // Fetch saved addresses using React Query
    const { data: addresses, isLoading: isAddresssLoading, error: addressesError } = useQuery({
        queryKey: ["addresses"],
        queryFn: async () => {
            try {
                const res = await addressService.getAllAddress();
                return res?.success ? res?.data?.addresses : [];
            } catch (error) {
                throw error;
            }
        }
    });

    // Set default address or show add new address form if none exist
    useEffect(() => {
        if (isAddresssLoading) return;
        if (addresses && !selectedAddress && !isAddingNewAddress) {
            if (Array.isArray(addresses) && addresses.length > 0) {
                const defaultAddress = addresses.find(addr => addr.isDefault);
                setSelectedAddress(defaultAddress || addresses[0]);
                setIsAddingNewAddress(false);
            } else if (Array.isArray(addresses) && addresses.length === 0) {
                setIsAddingNewAddress(true);
            }
        }
    }, [addresses, selectedAddress, isAddingNewAddress, isAddresssLoading]);

    // React Query client for cache invalidation
    const queryClient = useQueryClient();

    // Create address API call
    const createAddress = async (data) => {
        try {
            const res = await addressService.createAddress(data);
            return res?.success ? (res.data?.address || res.data) : null;
        } catch (error) {
            throw error;
        }
    };

    // Delete address API call
    const deleteAddress = async (id) => {
        try {
            const res = await addressService.deleteAddress(id);
            return res?.success ? res?.data : null;
        } catch (error) {
            throw error;
        }
    };

    // Mutation for creating address
    const createAddressMutaton = useMutation({
        mutationFn: createAddress,
        onSuccess: (newlyCreatedAddress) => {
            queryClient.invalidateQueries("addresses");
            reset({
                addressLine1: '', addressLine2: '', city: '', state: '',
                pincode: '', phoneNumber: '', addressType: 'home', country: 'India',
            });
            setIsAddingNewAddress(false);
            if (newlyCreatedAddress) {
                setSelectedAddress(newlyCreatedAddress);
            }
        },
        onError: (error) => {
            console.error("Error creating address:", error.message);
        }
    });

    // Mutation for deleting address
    const deleteAddressMutation = useMutation({
        mutationFn: deleteAddress,
        onSuccess: (data, addressId) => {
            queryClient.invalidateQueries("addresses");
            if (selectedAddress && (selectedAddress._id === addressId || selectedAddress.id === addressId)) {
                setSelectedAddress(null);
            }
        },
        onError: (error) => {
            console.error("Error deleting address:", error.message);
        }
    });

    // Set address as default
    const setAddressdefault = async (addressid) => {
        try {
            const res = await addressService.setDefaultAddress(addressid);
            if (res?.success) {
                queryClient.invalidateQueries("addresses");
            }
            return res;
        } catch (error) {
            console.log("failed to set the address to default");
        }
    };

    // Handle payment with Razorpay
    const handlePayment = async () => {
        // Ensure a saved address is selected and valid
        if (!selectedAddress || !selectedAddress._id) {
            alert('Please select a saved shipping address to proceed with payment. If you are adding a new address, please save it first and then select it.');
            return;
        }
        const addressForPayment = selectedAddress;
        if (!addressForPayment.addressLine1 || !addressForPayment.city || !addressForPayment.pincode || !addressForPayment.phoneNumber) {
            alert('The selected shipping address appears to be incomplete. Please ensure all details are present.');
            return;
        }
        if (cartTotal <= 0) {
            alert('Your cart is empty or total is zero. Cannot proceed to payment.');
            return;
        }
        setIsProcessingPayment(true);
        setPaymentError('');
        setPaymentSuccess('');
        try {
            // 1. Create Razorpay Order by calling your backend
            const orderData = await orderService.generateOrder({
                addressId: addressForPayment._id
            });
            // 2. Configure Razorpay Options
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: orderData?.data?.amount,
                currency: orderData?.data?.currency,
                name: "Tech cart",
                description: `Payment for Order ${orderData?.data?.id}`,
                order_id: orderData?.data?.id,
                handler: async function (razorpayHandlerResponse) { 
                    setIsProcessingPayment(true);
                    setPaymentSuccess('Payment received. Verifying...');
                    try {
                        // 3. Verify Payment with backend
                        const backendVerificationResult = await orderService.verifyPayment(
                            razorpayHandlerResponse
                        );
                        if (backendVerificationResult && backendVerificationResult.success === true) {
                            setPaymentSuccess(`Payment Successful! Payment ID: ${razorpayHandlerResponse.razorpay_payment_id}. Order ID: ${razorpayHandlerResponse.razorpay_order_id}`);
                        } else {
                            let errorMessage = "Payment verification failed. Please contact support.";
                            if (backendVerificationResult && backendVerificationResult.message) {
                                errorMessage = backendVerificationResult.message;
                                if (backendVerificationResult.errors && backendVerificationResult.errors.length > 0) {
                                    const specificErrors = backendVerificationResult.errors.map(e => e.msg || JSON.stringify(e)).join(', ');
                                    errorMessage += ` Details: ${specificErrors}`;
                                }
                            }
                            setPaymentError(errorMessage);
                        }
                    } catch (error) {
                        let detailedErrorMessage = error.message || "An unexpected error occurred during payment verification.";
                        if (error.response && error.response.data && error.response.data.message) {
                            detailedErrorMessage = error.response.data.message;
                        } else if (error.data && error.data.message) {
                            detailedErrorMessage = error.data.message;
                        }
                        setPaymentError(`Verification Error: ${detailedErrorMessage}. Please contact support with your Payment ID: ${razorpayHandlerResponse.razorpay_payment_id}`);
                    } finally {
                        setIsProcessingPayment(false);
                    }
                },
                prefill: {
                    name: userDetails?.user?.username || userDetails?.username || 'Guest User',
                    email: userDetails?.user.email,
                    contact: addressForPayment?.phoneNumber
                },
                notes: {
                    address: `${addressForPayment.addressLine1}, ${addressForPayment.city} - ${addressForPayment.pincode}`,
                    customer_id: userDetails?._id || userDetails?.id || 'guest_user',
                },
                theme: {
                    color: "#3B82F6"
                },
                modal: {
                    ondismiss: function () {
                        if (!paymentSuccess && !isProcessingPayment) {
                            setPaymentError("Payment modal closed by user.");
                        }
                        setIsProcessingPayment(false);
                    }
                }
            };
            // 3. Open Razorpay Checkout
            if (window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    setPaymentError(`Payment Failed: ${response.error.description} (Code: ${response.error.code}). ${response.error.metadata?.order_id ? `Order ID: ${response.error.metadata.order_id}` : ''}`);
                    setIsProcessingPayment(false);
                });
                rzp.open();
            } else {
                setPaymentError("Razorpay SDK could not be loaded. Please check your internet connection or refresh the page.");
                setIsProcessingPayment(false);
            }
        } catch (error) {
            setPaymentError(`Error: ${error.message}`);
            setIsProcessingPayment(false);
        }
    };

    // Handle selecting an address from the modal
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        setIsAddingNewAddress(false);
        setShowAddressModal(false);
    };

    // Show add new address form and reset form values
    const toggleAddNewAddress = () => {
        setIsAddingNewAddress(true);
        setSelectedAddress(null);
        const defaultFormValues = {
            addressLine1: '', addressLine2: '', city: '', state: '',
            pincode: '', phoneNumber: '', addressType: 'home', country: 'India',
        };
        reset(defaultFormValues);
    };

    // Handle creating a new address
    const handleCreateAddress = (data) => {
        createAddressMutaton.mutate(data);
    };

    // Helper for payment button text
    const getPaymentButtonText = () => {
        if (isProcessingPayment) return "Processing Payment...";
        if (paymentSuccess && !isProcessingPayment) return "Payment Successful!";
        return `Pay ₹${cartTotal.toFixed(2)}`;
    };

    // Redirect to home page after successful payment (with a delay)
    useEffect(() => {
        if (paymentSuccess && !isProcessingPayment) {
            const timeout = setTimeout(() => {
                navigate("/");
                toast.success("Payment Successful! Your order has been placed.");
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [paymentSuccess, isProcessingPayment, navigate]);

    // --- JSX Render ---
    return (
        <div className="min-h-screen bg-white bg-opacity-5 backdrop-blur-lg py-4 px-6 sm:px-10 lg:px-8 rounded-lg mt-2">
            {/* Main container for checkout */}
            <div className="mx-auto w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-center text-gray-100 mb-6 sm:mb-8 lg:mb-12 [text-shadow:0_0_5px_#FFF,0_0_8px_#FFF,0_0_12px_#60A5FA,0_0_15px_#60A5FA]">
                    Checkout
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8">
                    {/* Address and order summary section */}
                    <div className="lg:col-span-3 space-y-6 overflow-hidden min-w-0">
                        <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6 lg:p-8 w-full bg-opacity-10">
                            {/* Show selected address or address form */}
                            {selectedAddress && !isAddingNewAddress ? (
                                <div className="p-4 border border-gray-200 rounded-md bg-gray-100 bg-opacity-15 w-full">
                                    {/* Display selected address details */}
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
                                // Address form for adding a new address
                                <form className="space-y-4"
                                    onSubmit={handleSubmit(handleCreateAddress)}
                                >
                                    {/* Address input fields */}
                                    <AddressInput
                                        label="Address Line 1"
                                        placeholder="House No, Building, Street, Area"
                                        {...register("addressLine1", {
                                            required: "Address Line 1 is required",
                                        })}
                                    />
                                    <div>
                                        <AddressInput
                                            label="Address Line 2"
                                            name="addressLine2"
                                            placeholder="New lane central, D-203"
                                            {...register("addressLine2")}
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
                                                {...register("country", {
                                                    required: "Country is required",
                                                })}
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
                                    {/* Address type selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">Address Type</label>
                                        <div className="flex space-x-2 justify-center items-center">
                                            {['home', 'work', 'other'].map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                        setValue("addressType", type, { shouldDirty: true });
                                                    }}
                                                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                                                        ${watch("addressType") === type
                                                            ? 'bg-blue-600 border-blue-600 text-white ring-2 ring-blue-400 ring-offset-1 ring-offset-transparent'
                                                            : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                        }`}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            ))}
                                            <button
                                                type="submit"
                                                disabled={createAddressMutaton.isLoading}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                            >
                                                {createAddressMutaton.isLoading ? 'Saving...' : 'Save Address'}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Option to choose from saved addresses */}
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
                        {/* Order summary section */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                            <h2 className="text-lg sm:text-xl font-medium text-gray-200 mb-4 sm:mb-6">
                                Order Summary
                            </h2>
                            <div className="space-y-3 sm:space-y-4 mb-6">
                                {
                                    status === 'loading' ? (
                                        <div className="flex justify-center items-center h-32">
                                            {/* Loading spinner */}
                                            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.07A8 8 0 0112 20v4c-6.627 0-12-5.373-12-12h4a8 8 0 006.93 6.07zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2.93-6.07A8 8 0 0112 4V0c6.627 0 12 5.373 12 12h-4z"></path>
                                            </svg>
                                        </div>
                                    )
                                        : (
                                            items.map(item => (
                                                <OrderSummeryCard
                                                    key={item?.product._id}
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
                                    <span className="text-gray-200">₹{cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Price details and payment button */}
                    <div className="lg:col-span-2 mt-6 lg:mt-0">
                        <div className="lg:sticky lg:top-8">
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl font-medium text-gray-200 mb-4 sm:mb-6">
                                    Price Details
                                </h2>
                                <div className="space-y-2 sm:space-y-3 mb-6">
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span className="text-gray-300">Shipping</span>
                                        <span className="text-gray-200">₹0.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span className="text-gray-300">Tax</span>
                                        <span className="text-gray-200">₹0.00</span>
                                    </div>
                                    <div className="flex justify-between text-base sm:text-lg font-semibold border-t border-gray-200 pt-3 mt-3">
                                        <span className="text-gray-300">Total</span>
                                        <span className="text-gray-200">₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                {/* Payment button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessingPayment || cartTotal <= 0 || (!!paymentSuccess && !isProcessingPayment)}
                                    className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-md font-semibold text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {getPaymentButtonText()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Address selection modal */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="bg-white bg-opacity-5 backdrop-blur-xl p-5 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-200">Select Shipping Address</h3>
                            <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {isAddresssLoading && <p className="text-gray-300 text-center">Loading addresses...</p>}
                            {addressesError && <p className="text-red-400 text-center">Error: {addressesError.message || "Could not load addresses"}</p>}
                            {!isAddresssLoading && !addressesError && addresses && addresses.map(address => (
                                <div
                                    key={address._id || address.id}
                                    className={`p-4 border rounded-md bg-white bg-opacity-10 cursor-pointer
                                        ${selectedAddress?._id === (address._id || address.id)
                                            ? 'border-blue-500 ring-2 ring-blue-500'
                                            : 'border-gray-600 hover:border-gray-400'}`}
                                    onClick={() => handleSelectAddress(address)}
                                >
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
                                                    e.stopPropagation();
                                                    setAddressdefault(address._id );
                                                }}
                                                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                        <div className="flex space-x-2 ml-auto"> {/* Ensure Update/Delete are to the right */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log("Update address:", address?._id );
                                                    // Placeholder for update logic:
                                                    // setShowAddressModal(false);
                                                    // setIsAddingNewAddress(true); // Show form
                                                    // reset(address); // Populate form with this address
                                                    // setEditingAddressId(address._id || address.id); // Set mode to update
                                                }}
                                                className="text-xs text-yellow-400 hover:text-yellow-300 font-medium"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm("Are you sure you want to delete this address?")) {
                                                        deleteAddressMutation.mutate(address?._id);
                                                    }
                                                }}
                                                disabled={deleteAddressMutation.isLoading && deleteAddressMutation.variables === (address?._id )}
                                                className="text-xs text-red-400 hover:text-red-300 font-medium disabled:opacity-50"
                                            >
                                                {deleteAddressMutation.isLoading && deleteAddressMutation.variables === (address?._id) ? 'Deleting...' : 'Delete'}
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
                                toggleAddNewAddress();
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