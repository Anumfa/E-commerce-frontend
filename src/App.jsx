import React, { useState } from 'react';
import StoreHome from './components/Store/StoreHome';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';

function App() {
  const [view, setView] = useState('store'); // 'store' | 'admin'

  return (
    <div className="App">
      {view === 'store' ? (
        <StoreHome setView={setView} />
      ) : (
        <AdminDashboard setView={setView} />
      )}
    </div>
  );
}

export default App;

