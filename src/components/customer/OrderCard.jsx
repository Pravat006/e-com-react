const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered':
            return 'text-green-500';
        case 'Cancelled':
            return 'text-red-500';
        case 'On the way':
            return 'text-blue-500';
        default:
            return 'text-gray-400';
    }
};

const OrderCard = ({ order }) => (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-4 border-none  bg-white/5 shadow-sm rounded-lg min-h-[140px] sm:min-h-[120px]">
        {/* Image Section - Fixed width */}

        <div className="flex flex-row items-center ">

            <div className="flex-shrink-0 w-24 h-24 mr-4 mb-4 sm:mb-0">
                <img
                    src={order.items[0].product?.mainImage?.url}
                    alt={order.items[0].product?.name}
                    className="w-full h-full object-contain rounded-md"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/96x96/E0E0E0/333333?text=No+Image';
                    }}
                />
            </div>

            {/* Product Info Section - Takes available space with consistent width */}
            <div className="flex-grow mb-4 sm:mb-0 min-w-0 sm:min-w-[200px]">
                <p className="text-lg font-medium text-gray-200 truncate text-wrap">{order.items[0].product?.name}</p>
                <div className="h-5"> {/* Fixed height container for color */}
                    {/* {color && <p className="text-sm text-gray-300">Color: {color}</p>} */}
                </div>
            </div>
        </div>


        {/* Status and Action Section - Fixed width on all screens */}
        <div className="flex flex-col w-full sm:w-72 ml-0 sm:ml-4 flex-shrink-0 gap-y-2">
            {/* Price - Always present */}
            <p className="text-lg font-semibold text-gray-100">{`₹${order.items[0].product?.price.toLocaleString()}`}</p>

            {/* Status Message */}
            <div className="flex items-center justify-between">
                <p className={`text-base font-medium ${getStatusColor(order.status)} text-left  `}>
                    {order.status === 'Delivered' && `Delivered on ${new Date(order.updatedAt).toLocaleString()}`}
                    {order.status === 'Cancelled' && `Cancelled on ${new Date(order.updatedAt).toLocaleString()}`}
                    {order.status === 'On the way' && `On the way - ${new Date(order.updatedAt).toLocaleString()}`}
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && order.status !== 'On the way' && `${order.status} on ${new Date(order.updatedAt).toLocaleString()}`}
                </p>
                {/* Action Button */}
                {order.status === 'Delivered' && (
                    <button className="text-blue-600 hover:underline text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 self-start sm:self-end">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.085 15.696L16.273 18.06l-1.096-5.811L19.467 9.21l-6.196-.917L11.085 2l-2.186 6.293-6.196.917 4.385 4.032-1.096 5.811L11.085 15.696z" />
                        </svg>
                        Rate & Review Product
                    </button>
                )}

                {/* Cancellation Reason */}
                {order.status === 'Cancelled' && order.cancellationReason && (
                    <p className="text-sm text-gray-600 text-left sm:text-right leading-tight bg-red-50 rounded p-2 border-l-4 border-red-200">
                        {order.cancellationReason}
                    </p>

                )}
            </div>
        </div>
    </div>
);


export default OrderCard;