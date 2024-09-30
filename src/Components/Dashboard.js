import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/FirebaseConfig'
import products from './assets'

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