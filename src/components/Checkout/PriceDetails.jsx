import React from "react";

function PriceDetails() {
    return (
        <div className="space-y-1 my-3 ">
            <div className="flex justify-between items-center ">
                <span className="text-lg">Subtotal:</span>
                <span className="text-lg font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center ">
                <span className="text-lg">Shipping:</span>
                <span className="text-lg font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-4 font-bold text-xl">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default PriceDetails;
