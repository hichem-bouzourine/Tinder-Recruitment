import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar'; 
import Offers from './pages/Offers';
import Login from './pages/Login';
import Register from './pages/Register';
import Submit from './pages/Submit';
import Footer from './components/Footer'; 

import Settings from './pages/Settings';
import PostsOuverts from './pages/PostsOuverts';
// import NotFound from './components/Not-found';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} /> 
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/postsOuverts" element={<PostsOuverts />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
        <Footer />  {/* Ajout du footer ici */}
      </div>
    </BrowserRouter>
  );
}

export default App;
