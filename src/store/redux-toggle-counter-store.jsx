
import { createSlice,configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux-toggle-counter-store-counter';
import authReducer from './redux-toggle-counter-store-auth';



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
    reducer: {counter: counterReducer, auth: authReducer}
})


export default store;