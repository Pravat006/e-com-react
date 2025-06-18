import { createSlice } from '@reduxjs/toolkit';


const orderSlice= createSlice({
    name: "order",
    initialState: {
        orders: [],
    },
    reducers:{
        addToOrders: (state, action) => {
            state.orders.push(action.payload);
        },

        removeFromOrderrs: (state, action)=>{
            const id  = action.payload;
            state.orders= state.orders.filter((order)=> order.id !== id);
        }       
    }
})

export const { addToOrders, removeFromOrderrs } = orderSlice.actions;
export default orderSlice.reducer;

