import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlice = createSlice({
    initialState: localStorage.getItem("nameTrainer") ?? "", 
    name: "nameTrainer", //? Guardar en localStorage
    reducers: {
        setNameTrainer: (state, action) => {
            
            //? Guardar en localStorage 
            localStorage.setItem("nameTrainer", action.payload)
        
            return action.payload
        }
    }
})

export const {setNameTrainer} = nameTrainerSlice.actions

export default nameTrainerSlice.reducer