import addressService from "@/services/address.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import Input from "../root/Input";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import StyledUnput from "../styledComponent/StyledUnput";
import orderService from "@/services/order.service";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addressId, setAddressId] = useState(null);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const { register, handleSubmit } = useForm({
    defaultValues: {
      country: "India",
    },
  });

  const customerDetails =  useSelector((state) => state.auth.userData);
  const discountedTotal= useSelector((state) => state.cart.discountedTotal);
  

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  

  // Handle Payment
  const handlePayment = async () => {
    setLoading(true);

    // Load Razorpay SDK
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      // Request a new order from backend
      const razorPayOrder = await orderService.generateOrder({
        addressId: addressId.toString(),
      });
      setToPayAmount(razorPayOrder?.data.amount);
      console.log("Razorpay Order:", razorPayOrder);

      // Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Public Key
        amount: razorPayOrder.data.amount,
        currency: razorPayOrder.data.currency,
        description: "Test Transaction",
        order_id: razorPayOrder.data.id, // Razorpay Order ID

        handler: async (response) => {
          console.log("Payment Success Response:", response);

          // Send payment response to backend for verification
          const verifyRes = await orderService.verifyPayment({
            response
          });
          if(verifyRes){
            console.log("Payment verified:", verifyRes);
          }
         
        },
        prefill: {
          
          email: customerDetails.user.email,
          
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Try again.");
    }

    setLoading(false);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < 3) setCurrentPage(currentPage + 1);
  };

  const { data: addresses, isLoading: isAddressesLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      try {
        const res = await addressService.getAllAddress();
        return res?.success ? res?.data?.addresses : [];
      } catch (error) {
        console.log("failed to fetch data");
        return error?.message;
      }
    },
  });

  const createAddress = async (data) => {
    try {
      const res = await addressService.createAddress(data);
      return res?.success ? res?.data : null;
    } catch (error) {
      console.log("failed to create address ");
      return error?.message;
    }
  };

  const deleteAddress = async (id) => {
    try {
      const res = await addressService.deleteAddress(id);
      return res?.success ? res?.data : null;
    } catch (error) {
      console.log("failed to delete address");
      return error?.message;
    }
  };

  const queryClient = useQueryClient();

  const creatMmutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("addresses");
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("addresses");
    },
  });

  const onSubmit = async (data) => {
    creatMmutation.mutate(data);
  };

  const handleDelete = (id) => {
    deleteAddressMutation.mutate(id);
  };

  const handleDeliverHere = (id) => {
    setAddressId(id);
    setCurrentPage(2);
  };

  console.log("checkout address : ", addressId);

  return (
    <div className="w-screen sm:w-[80%] lg:w-[70%] p-4 border rounded shadow-lg h-[70vh] my-7  flex flex-col justify-between">
      {/* Page 1 */}
      {currentPage === 1 && (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">
            Choose your delivery address
          </h2>
          {isAddressesLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="overflow-y-auto h-[50vh]">
              {addresses.length > 0 &&
                addresses.map((address, index) => (
                  <div
                    key={index}
                    className="items-center flex justify-between sm:p-2 px-0  border-b   gap-2"
                  >
                    <div className=" w-[60%] flex flex-wrap flex-col text-start lg:flex-row ">
                      <p className="overflow-x-hidden">
                        {`${address.addressLine1}`}
                      </p>
                      <p>
                        {""} {address.city}/
                      </p>
                      <p>Pincode: {address.pincode}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 ">
                      <button
                        onClick={() => handleDelete(address._id)}
                        className="bg-red-100
                      text-red-800 px-3 py-1 rounded-md"
                      >
                        <MdDeleteForever />
                      </button>

                      <button
                        className="bg-gray-200 px-3 py-1 text-gray-800  rounded-md"
                        onClick={() => handleDeliverHere(address._id)}
                      >
                        <FaArrowAltCircleRight />
                      </button>
                    </div>
                  </div>
                ))}
              <div className="py-4 bg-blue-100">
                <Dialog>
                  <DialogTrigger>
                    <span className="flex text-center text-blue-900">
                      Create new <Plus />
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create new address</DialogTitle>
                      {/* form handling the address creation */}
                      <form
                        action=""
                        className="py-4 flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Input
                          label="Address Line 1 :"
                          placeholder="@eg. New lane central, D-203"
                          {...register("addressLine1", {
                            required: "Address Line 1 is required",
                          })}
                        />
                        <Input
                          label="Address Line 2 :"
                          placeholder="@eg. Opposite to central park"
                          {...register("addressLine2", {
                            required: "Address Line 2 is required",
                          })}
                        />
                        <Input
                          label="City :"
                          placeholder="@eg. Mumbai"
                          {...register("city", {
                            required: "City is required",
                          })}
                        />
                        <Input
                          label="State :"
                          placeholder="@eg. Maharashtra "
                          {...register("state", {
                            required: "State is required",
                          })}
                        />
                        <Input
                          label="Pin : "
                          placeholder="@eg. 400001"
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

                        <button className="mx-auto mt-2 bg-green-600 text-white font-bold py-2 px-6 rounded-[20px]">
                          Create
                        </button>
                      </form>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Page 2 */}
      {currentPage === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Pay now
          </h2>
          <div>
            <button onClick={handlePayment} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? "Processing..." : "Pay ₹" + discountedTotal}
            </button>
          </div>
        </div>
      )}

      {/* Page 3 */}
      {currentPage === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summery</h2>
          {/* info about product and  */}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        {currentPage < 3 ? (
          <button
            type="button"
            onClick={goToNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Confirm order
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;