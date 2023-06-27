import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/nameTrainer.slice";

export default configureStore({
    reducer: {
        //* Aqui van todos los estados globales (slices)
        nameTrainer
    }
})