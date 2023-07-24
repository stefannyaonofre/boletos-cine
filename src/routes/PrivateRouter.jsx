import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = ({isAutenticate}) => {
  return (
    <div>
        {
            isAutenticate ? <Outlet /> : <Navigate to={'/home'}/>
        }
    </div>
  )
}

export default PrivateRouter