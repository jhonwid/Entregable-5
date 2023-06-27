import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {

    const nameTrainer = useSelector((store) => store.nameTrainer)

    if(nameTrainer){
        return <Outlet />
    }else {
        return <Navigate to="/"/>
    }  
}

export default ProtectedRoutes