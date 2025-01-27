import { useEffect, FC } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Details from './Pages/Details';
import ErrorPage from './Pages/ErrorPage';
import MainLayout from './layouts/MainLayout';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Products from './Pages/Products';

const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!['/', '/about', '/products'].some(path => location.pathname.includes(path))) {
      navigate('/');
    }
  }, [navigate, location.pathname]);
  
  return (
    <Routes>
      <Route index element={<MainLayout><Home /></MainLayout>} />
      <Route path="about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/products/:id" element={<MainLayout><Details /></MainLayout>} />
      <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Cart/></MainLayout>} />
      <Route path="*" element={<ErrorPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />


    </Routes>
  );
}

export default App;
