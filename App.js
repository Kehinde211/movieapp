import './App.css';
import MovieApp from './main';
import Footer from './footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MovieApp />} />
        <Route path="/about" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
