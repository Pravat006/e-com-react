import productService from '@/services/product.service'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function ShopByFetaturedCategory() {
    const [searchParam] = useSearchParams();
    const [products, setProducts] = React.useState([]);
    const [error, setError] = React.useState(null);

    // Get the category name from the URL
    const searchQuery = searchParam.get('search');
    console.log('Search Params:', searchParam.toString());
    // console.log('Search Query:', searchQuery);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await productService.getSearchedProducts(searchQuery.trim());
                if (res) {
                    setProducts(res?.data);
                    // console.log(res?.data)
                }
                if (res?.data.length === 0) {
                    setError("No products found");
                }
            } catch (error) {
                setError(error?.message);
            }
        };
        if (searchQuery) {
            fetchData();
        }
    }, [searchQuery]);

    return (
        <div>
            <h1>Shop By Featured Category</h1>
            {error && <p>{error}</p>}
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
}

export default ShopByFetaturedCategory;