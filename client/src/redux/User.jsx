import { createSlice } from "@reduxjs/toolkit";


export const userSlice=createSlice({
    name:"user", //This is our state name like (useStae we give name)
    initialState: {value:{UserId:"",FirstName:" ",SecondName:" ",Email:" "}},
    reducers:{
        loginn:(state,action)=>{
            state.value=action.payload;// payload is where the new data is stored in value

        }
    }
})

export const {loginn}=userSlice.actions
export default userSlice.reducer