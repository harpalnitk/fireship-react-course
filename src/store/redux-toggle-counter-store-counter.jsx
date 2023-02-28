import { createSlice } from '@reduxjs/toolkit';



const initialState= {counter:0, showCounter: true, isAuthenticated: false};

const counterSlice = createSlice({
    name:'counter',
    initialState: initialState,
    reducers:{
        increment(state){
            //we are allowed to mutate the state
            //redux-toolkit internally uses imgur to clone the state
            //and allow us to mutate the state; it creates new object of
            //state automatically
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state,action){
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state){
            state.showCounter= !state.showCounter
        }
    }
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;