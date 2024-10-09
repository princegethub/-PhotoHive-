import {createSlice} from '@reduxjs/toolkit';

const  initialState = {
  user: null,
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    //actions
    setAtuhUser:(state, action) => {
      state.user = action.payload;
    }
  }
})


export const {setAtuhUser} = authSlice.actions;
export default authSlice.reducer;
