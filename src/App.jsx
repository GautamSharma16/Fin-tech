import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import Contact from './pages/Contact';

// Placeholder components for other pages
const Loans = () => <div className="container py-3xl"><h1 className="section-title">Loans</h1><p>Content coming soon.</p></div>;
const About = () => <div className="container py-3xl"><h1 className="section-title">About Us</h1><p>Content coming soon.</p></div>;
const Blog = () => <div className="container py-3xl"><h1 className="section-title">Blog</h1><p>Content coming soon.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="loans" element={<Loans />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="subscribe" element={<Subscribe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
