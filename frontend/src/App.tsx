import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Sidebar from './components/layouts/Sidebar';
import Header from './components/layouts/Header';

import Home from './pages/Home.tsx';
import BookManage from './pages/BookManage';
import UserManage from './pages/UserManage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'ระบบบรรณารักษ์ ห้องสมุด'
  })

  return (
    <Router>
      <div className="app flex">
        <Sidebar />
        <div className='flex-1'>
          <Header />
          <div className='bg-gray-100 min-h-screen ml-16 rounded-tl-[30px] overflow-hidden'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/bookManage' element={<UserManage />} />
              <Route path='/userManage' element={<BookManage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

