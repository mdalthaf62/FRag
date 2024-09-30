import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Dashboard