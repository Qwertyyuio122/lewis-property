import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import BeforeAfter from './pages/BeforeAfter';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/before-after" element={<BeforeAfter />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
