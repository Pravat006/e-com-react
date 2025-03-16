export default function YourOrder() {
  return (
    <div className="min-h-screen  flex justify-center py-10">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="border p-2 rounded w-full" />
              <input type="text" placeholder="Last Name" className="border p-2 rounded w-full" />
            </div>
            <input type="email" placeholder="Email Address" className="border p-2 rounded w-full mt-4" />
            <input type="text" placeholder="Street Address" className="border p-2 rounded w-full mt-4" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="City" className="border p-2 rounded w-full" />
              <input type="text" placeholder="ZIP Code" className="border p-2 rounded w-full" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center mb-4">
              <input type="radio" id="credit-card" name="payment" className="mr-2" checked readOnly />
              <label htmlFor="credit-card" className="text-sm">Credit Card</label>
            </div>
            <input type="text" placeholder="Card Number" className="border p-2 rounded w-full" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="MM/YY" className="border p-2 rounded w-full" />
              <input type="text" placeholder="CVV" className="border p-2 rounded w-full" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 mt-6 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="flex justify-between text-sm mt-2">
            <span>Subtotal (3 items)</span>
            <span>$279.97</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Tax</span>
            <span>$28.00</span>
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>$307.97</span>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Place Order</button>
        </div>
      </div>
    </div>
  );
}
