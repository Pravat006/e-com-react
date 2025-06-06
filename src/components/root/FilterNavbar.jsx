import React, { useState, useEffect } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible'; // Import Radix Collapsible
import { ChevronDown, X, Filter as FilterIcon, Star } from 'lucide-react'; // ChevronDown will be used for rotation

// Mock data for filter options (remains the same)
const CATEGORIES = [
    'Laptops', 'Smartphones', 'Tablets', 'Desktops', 'Monitors', 'TVs',
    'Cameras', 'Audio', 'Wearables', 'Gaming Consoles', 'Accessories'
];
const BRANDS = ['Apple', 'Samsung', 'Google', 'Sony', 'Dell', 'HP', 'Lenovo', 'LG', 'Asus', 'Bose'];
const RAM_OPTIONS = ['4GB', '8GB', '16GB', '32GB', '64GB+'];
const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB', '2TB+'];
const RATING_OPTIONS = [5, 4, 3, 2, 1];

// cn utility function (simplified version for this example)
function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

// Updated FilterGroup using Radix Collapsible
const FilterGroup = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <Collapsible.Root
            open={isOpen}
            onOpenChange={setIsOpen}
            className="border-b border-gray-200 py-3 group" // Added 'group' for data-state targeting
        >
            <Collapsible.Trigger asChild>
                <button
                    className={cn(
                        "flex justify-between items-center w-full text-left py-1", // Adjusted padding slightly
                        "text-gray-700 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-sm"
                    )}
                >
                    <span className="font-semibold text-sm">{title}</span>
                    <ChevronDown
                        size={20}
                        className={cn(
                            "transition-transform duration-300",
                            isOpen ? "rotate-180" : "rotate-0" // Direct rotation based on state
                        )}
                    />
                </button>
            </Collapsible.Trigger>
            <Collapsible.Content
                className={cn(
                    "overflow-hidden transition-all data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up", // Radix recommended animation classes
                    // Fallback if custom animations aren't defined in tailwind.config.js
                    // "data-[state=open]:mt-3 data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=open]:max-h-[500px] data-[state=closed]:max-h-0",
                    "mt-3" // Ensure margin is applied when open
                )}
            >
                {/* This div handles the actual content visibility and scrolling if needed */}
                <div className="space-y-2 pr-1 max-h-60 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};


// Main Filter Navigation Component (mostly unchanged, uses updated FilterGroup)
const FilterNavbar = ({ onFiltersApply }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedRam, setSelectedRam] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);

    const handleCheckboxChange = (setter, value, currentSelection) => {
        if (currentSelection.includes(value)) {
            setter(currentSelection.filter(item => item !== value));
        } else {
            setter([...currentSelection, value]);
        }
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(prevRating => prevRating === rating ? 0 : rating);
    };

    const handleApplyFilters = () => {
        const filters = {
            categories: selectedCategories,
            brands: selectedBrands,
            price: priceRange,
            ram: selectedRam,
            storage: selectedStorage,
            rating: selectedRating,
        };
        console.log("Applied Filters:", filters);
        if (onFiltersApply) {
            onFiltersApply(filters);
        }
        setIsSidebarOpen(false);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange({ min: '', max: '' });
        setSelectedRam([]);
        setSelectedStorage([]);
        setSelectedRating(0);
        if (onFiltersApply) {
            onFiltersApply({
                categories: [], brands: [], price: { min: '', max: '' },
                ram: [], storage: [], rating: 0,
            });
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidebarOpen]);


    const renderCheckboxes = (options, selectedItems, setter) => (
        options.map(option => (
            <label key={option} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    checked={selectedItems.includes(option)}
                    onChange={() => handleCheckboxChange(setter, option, selectedItems)}
                />
                <span>{option}</span>
            </label>
        ))
    );

    const filterContent = (
        // Removed space-y-4 from here as FilterGroup handles its own vertical spacing (py-3)
        <div className="p-4 md:p-6">
            <div className="flex justify-between items-center md:hidden mb-4"> {/* Added mb-4 for spacing */}
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>

            <FilterGroup title="Product Category" defaultOpen={true}>
                {renderCheckboxes(CATEGORIES, selectedCategories, setSelectedCategories)}
            </FilterGroup>

            <FilterGroup title="Brand" defaultOpen={true}>
                {renderCheckboxes(BRANDS, selectedBrands, setSelectedBrands)}
            </FilterGroup>

            <FilterGroup title="Price Range">
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={e => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={e => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                </div>
            </FilterGroup>

            <FilterGroup title="RAM">
                {renderCheckboxes(RAM_OPTIONS, selectedRam, setSelectedRam)}
            </FilterGroup>

            <FilterGroup title="Storage">
                {renderCheckboxes(STORAGE_OPTIONS, selectedStorage, setSelectedStorage)}
            </FilterGroup>

            <FilterGroup title="Customer Rating">
                <div className="space-y-1">
                    {RATING_OPTIONS.map(rate => (
                        <button
                            key={rate}
                            onClick={() => handleRatingChange(rate)}
                            className={`w-full flex items-center justify-start text-left p-1 rounded hover:bg-gray-100 ${selectedRating === rate ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600'}`}
                        >
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={`${i < rate ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                            <span className="ml-2 text-sm">{rate} Star{rate > 1 ? 's' : ''} & Up</span>
                        </button>
                    ))}
                </div>
            </FilterGroup>

            <div className="pt-6 space-y-3 sticky bottom-0 bg-white pb-4 md:static md:bg-transparent md:pb-0"> {/* Adjusted pt and space-y */}
                <button
                    onClick={handleApplyFilters}
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleClearFilters}
                    className="w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm font-medium"
                >
                    Clear All
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden p-4 sticky top-0 bg-white z-10 border-b border-gray-200">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg shadow"
                >
                    <FilterIcon size={20} />
                    <span>Filters</span>
                </button>
            </div>

            {/* Sidebar for Mobile */}
            <div
                className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-black bg-opacity-50`}
                onClick={() => setIsSidebarOpen(false)}
            >
                <div
                    className="fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl overflow-y-auto custom-scrollbar"
                    onClick={e => e.stopPropagation()}
                >
                    {filterContent}
                </div>
            </div>

            {/* Sidebar for Desktop */}
            <aside className="hidden md:block md:w-72 lg:w-80 h-screen sticky top-0 border-r border-gray-200 bg-white overflow-y-auto custom-scrollbar">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                </div>
                {filterContent}
            </aside>
        </>
    );
};


// Example App component to demonstrate FilterNav
export default function FilterNav() { // Renamed to FilterNavbar as per your last version
    const [products, setProducts] = useState([
        { id: 1, name: 'Laptop Pro X', category: 'Laptops', brand: 'Dell', price: 1200, ram: '16GB', storage: '512GB', rating: 5 },
        { id: 2, name: 'Smartphone S23', category: 'Smartphones', brand: 'Samsung', price: 800, ram: '8GB', storage: '256GB', rating: 4 },
        { id: 3, name: 'Tablet TabMax', category: 'Tablets', brand: 'Apple', price: 600, ram: '8GB', storage: '128GB', rating: 5 },
        { id: 4, name: 'Gaming PC Titan', category: 'Desktops', brand: 'Asus', price: 2200, ram: '32GB', storage: '1TB', rating: 5 },
        { id: 5, name: 'Ultra HD TV', category: 'TVs', brand: 'LG', price: 1500, ram: 'N/A', storage: 'N/A', rating: 4 },
        { id: 6, name: 'Wireless Buds', category: 'Audio', brand: 'Sony', price: 150, ram: 'N/A', storage: 'N/A', rating: 4 },
        { id: 7, name: 'Slim Laptop Air', category: 'Laptops', brand: 'Apple', price: 1500, ram: '8GB', storage: '256GB', rating: 5 },
        { id: 8, name: 'Smartwatch Fit', category: 'Wearables', brand: 'Google', price: 250, ram: 'N/A', storage: 'N/A', rating: 3 },
    ]);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currentFilters, setCurrentFilters] = useState(null);

    const handleApplyFilters = (filters) => {
        setCurrentFilters(filters);
        console.log("Filters received in App:", filters);
        let newFilteredProducts = [...products];

        if (filters.categories && filters.categories.length > 0) {
            newFilteredProducts = newFilteredProducts.filter(p => filters.categories.includes(p.category));
        }
        if (filters.brands && filters.brands.length > 0) {
            newFilteredProducts = newFilteredProducts.filter(p => filters.brands.includes(p.brand));
        }
        if (filters.price) {
            if (filters.price.min) {
                newFilteredProducts = newFilteredProducts.filter(p => p.price >= parseFloat(filters.price.min));
            }
            if (filters.price.max) {
                newFilteredProducts = newFilteredProducts.filter(p => p.price <= parseFloat(filters.price.max));
            }
        }
        if (filters.ram && filters.ram.length > 0) {
            newFilteredProducts = newFilteredProducts.filter(p => filters.ram.includes(p.ram));
        }
        if (filters.storage && filters.storage.length > 0) {
            newFilteredProducts = newFilteredProducts.filter(p => filters.storage.includes(p.storage));
        }
        if (filters.rating && filters.rating > 0) {
            newFilteredProducts = newFilteredProducts.filter(p => p.rating >= filters.rating);
        }

        setFilteredProducts(newFilteredProducts);
    };

    // Custom scrollbar style
    const scrollbarStyle = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #c4c4c4;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a1a1a1;
    }
    /* Radix Collapsible animations (if not defined in tailwind.config.js) */
    @keyframes collapsible-down {
      from { height: 0; opacity: 0; }
      to { height: var(--radix-collapsible-content-height); opacity: 1; }
    }
    @keyframes collapsible-up {
      from { height: var(--radix-collapsible-content-height); opacity: 1; }
      to { height: 0; opacity: 0; }
    }
    .animate-collapsible-down {
      animation: collapsible-down 0.2s ease-out;
    }
    .animate-collapsible-up {
      animation: collapsible-up 0.2s ease-out;
    }
  `;
    // Note: For Radix animations like 'animate-collapsible-down' and 'animate-collapsible-up' 
    // to work correctly with 'height', you might need to define them in your tailwind.config.js 
    // if you want to use the --radix-collapsible-content-height variable effectively.
    // The CSS-in-JS approach for keyframes is a fallback.

    return (
        <>
            <style>{scrollbarStyle}</style>
            <div className="flex min-h-screen bg-gray-50 font-sans">
                <FilterNav onFiltersApply={handleApplyFilters} />

                <main className="flex-1 p-4 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tech Products</h1>
                        {currentFilters && (
                            <div className="mt-2 text-sm text-gray-600">
                                Showing {filteredProducts.length} of {products.length} products.
                            </div>
                        )}
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400">Image</span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>{product.name}</h3>
                                        <p className="text-sm text-gray-500">{product.category} - {product.brand}</p>
                                        <p className="text-xl font-bold text-indigo-600 mt-2">${product.price}</p>
                                        <div className="text-xs text-gray-500 mt-1">
                                            <span>RAM: {product.ram}</span> | <span>Storage: {product.storage}</span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                                            ))}
                                            <span className="ml-1 text-xs text-gray-600">({product.rating})</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <h2 className="text-xl text-gray-700">No products match your current filters.</h2>
                            <p className="text-gray-500">Try adjusting your filter criteria.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
