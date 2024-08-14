import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Sidebar from './components/layouts/Sidebar';
import Header from './components/layouts/Header';

import Dashboard from './pages/Dashboard';
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
          <div className='bg-gray-100 h-dvh rounded-tl-[30px] p-8'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
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

