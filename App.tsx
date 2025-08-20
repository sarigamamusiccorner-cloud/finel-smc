
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Music from './pages/Music';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import JoinUs from './pages/JoinUs';
import Contact from './pages/Contact';
import Playlists from './pages/Playlists';
import Events from './pages/Events';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="music" element={<Music />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/:slug" element={<ArtistDetail />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="events" element={<Events />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsDetail />} />
          <Route path="join" element={<JoinUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;