
import { createSlice,configureStore } from '@reduxjs/toolkit';
import { logDOM } from '@testing-library/react';


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

const initialAuthState = {isAuthenticated: false};

const authSlice = createSlice({
    name:'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
          state.isAuthenticated = false;
        }
    }

});


// const counterReducer = (state= initialState, action) =>{
//     if(action.type === 'increment'){
//         return{
//             counter: state.counter + 1,
//             showCounter: state.showCounter
//         }
//     }
//     if(action.type === 'decrement'){
//         return{
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         }
//     }
//     if(action.type === 'increase'){
//         return{
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         }
//     }

//     if(action.type === 'toggle'){
//         return{
//             counter: state.counter,
//             showCounter: !state.showCounter
//         } 
//     }
//     return state;
// }


//const store = createStore(counterReducer);

// const store = configureStore({
//     reducer: counterSlice.reducer
// })

const store = configureStore({
    reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}
})

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;