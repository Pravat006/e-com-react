import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        totalQuntity: 0,
        totalPrice: 0,
    },
    reducers: {
        // Add product to cart
        addProduct: (state, action) => {
            // before ading the product to the cart, we need to check if the product is already in the cart, then we will increase the quantity of the product
            const productData = action.payload;
            const existingProduct = state.products.find(item => item.id === productData.id);
            if(existingProduct){
                existingProduct.quantity += productData.quantity;
               
            }else{
                state.products.push(productData);
            }
            state.totalQuntity+= productData.quantity;
            state.totalPrice += productData.price * productData.quantity;          
        },
        // remove product from cart
        removeFromCart : (state, action) => {
           // before removing a product from the cart , firs twe need to identify the perticular product in the cart
           // then we will remove the product from the cart and update (decrease) the total quantity and total price as well
           const id = action.payload;
           const product= state.products.find(item => item.id === id);
           if(product){
            state.totalQuntity -= product.quantity;
            state.totalPrice -=  product.quantity * product.price;
            state.products = state.products.filter(item => item.id !== id);
           }
        },
        clearCart: (state) => {
            state.products = [];
            state.totalQuntity = 0;
            state.totalPrice = 0;
        }
    }

});
export const{ addProduct, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

