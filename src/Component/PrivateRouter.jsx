import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {

  const {currentUser} = useContext(AuthContext);


    if(!currentUser){
      return <Navigate to ='/login' />
    }
    
  return <Outlet />
}

export default PrivateRouter;