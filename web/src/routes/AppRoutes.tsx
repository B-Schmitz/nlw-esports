import { Routes, Route } from 'react-router-dom';
import AdsGame from '../pages/AdsGame';

import Home from '../pages/Home'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:id/ads" element={<AdsGame />} />
    </Routes>
  );
}