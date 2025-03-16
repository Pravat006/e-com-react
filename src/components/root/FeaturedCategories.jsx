import { FaLaptop, FaGamepad, FaMobileAlt, FaWifi } from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Laptops & Computers",
    description: "Premium workstations",
    icon: <FaLaptop className="text-blue-600 text-3xl" />,
    color: "bg-blue-100",
  },
  {
    id: 2,
    // name: "Gaming Accessories",
    name: "watch  ",
    description: "Pro gaming gear",
    icon: <FiWatch className="text-purple-600 text-3xl" />,
    color: "bg-purple-100",
  },
  {
    id: 3,
    name: "Mobile Devices",
    description: "Smart accessories",
    icon: <FaMobileAlt className="text-green-600 text-3xl" />,
    color: "bg-green-100",
  },
  {
    id: 4,
    name: "Networking",
    description: "Connect & share",
    icon: <FaWifi className="text-red-600 text-3xl" />,
    color: "bg-red-100",
  },
];


export default function FeaturedCategories() {

  const navigate = useNavigate();

  const handleSearch = (searchedText) => {
    if (searchedText.trim()) {
      const params = new URLSearchParams({ search: searchedText.trim() });
      navigate(`/products/c/?${params.toString()}`);
    }
  };


 
  return (
    <div className="w-full px-4 py-10 
    bg-[var(--section-bg)] rounded-3xl  shadow-2xl mb-6"
    
    >
      <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: "var(--comp-bg)",
            }}
          >
            {/* Icon */}
            <div className={`p-4 rounded-full ${category.color}`}>{category.icon}</div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold mt-4">{category.name}</h3>
            
            {/* Description */}
            <p className="text-gray-500 text-sm">{category.description}</p>
            
            {/* Shop Now Link */}
            <button
              
             
              onClick={() => handleSearch(category.name)}
              className="text-blue-600 font-semibold mt-2 flex items-center gap-1 hover:underline"
            >
              Shop Now →
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all">
          View All Categories →
        </button>
      </div>
    </div>
  );
}
