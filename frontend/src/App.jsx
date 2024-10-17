// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Offers from './pages/Offers';
import Login from './pages/Login';
import Register from './pages/Register';
import Submit from './pages/Submit';
import PostsOuverts from './pages/PostsOuverts';
// import NotFound from './components/Not-found';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/postsOuverts" element={<PostsOuverts />} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
