import React from 'react'

function OrderSummeryCard({id, image, name, quantity, price}) {
  return (
    <div key={id} className="flex items-center space-x-3 sm:space-x-4">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-medium  truncate">
          {name}
        </h3>
        <p className="text-xs sm:text-sm ">
          Qty: {quantity}
        </p>
      </div>
      <div className="text-sm sm:text-base font-medium flex-shrink-0">
        ${price}
      </div>
    </div>
  )
}

export default OrderSummeryCard