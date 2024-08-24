import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Layout from './components/layouts/Layout';
import AuthLayout from './components/layouts/AuthLayout.tsx';

import Auth from './pages/Auth.tsx';
import Home from './pages/Home.tsx';
import UserManage from './pages/UserManage';
import BookManage from './pages/BookManage';

import { Toaster } from './components/ui/toaster.tsx';

function App() {
  useEffect(() => {
    document.title = 'ระบบบรรณารักษ์ ห้องสมุด'
  })

  return (
    <Router>
      <div className="app flex">
        {/* <Toaster /> */}

        <Routes>
          <Route element={<AuthLayout/>}>
            <Route path='/' element={<Auth />} />
          </Route>

          <Route element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/bookManage' element={<UserManage />} />
            <Route path='/userManage' element={<BookManage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

