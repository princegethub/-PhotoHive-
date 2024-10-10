import {createSlice} from '@reduxjs/toolkit';

const  initialState = {
  user: null,
  suggestedUser: [],
  selectedUserProfile : null,

}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    //actions
    setAtuhUser:(state, action) => {
      state.user = action.payload;
    },
    setSuggestedUser: (state, action) => {
      state.suggestedUser  = action.payload;
    },
    setSleectedUserProfile: (state,action) => {
      state.selectedUserProfile = action.payload;
    }
  
  }
})


export const {setAtuhUser, setSuggestedUser,  setSleectedUserProfile} = authSlice.actions;

export default authSlice.reducer;
