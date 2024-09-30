import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Products from './Components/Products';
import Sale from './Components/Sale';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Product from './Components/Product';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/sale' element={<Sale/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Product/:id' element={<Product />} />
      </Routes>
     
    </>
  );
}

export default App;
