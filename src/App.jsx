import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePortfolioPage from './pages/HomePortfolioPage';
import SeedsOfThymeCasePage from './pages/SeedsOfThymeCasePage';
import EssentialLifeCasePage from './pages/EssentialLifeCasePage';
import CamsAtmCasePage from './pages/CamsAtmCasePage';
import SafetyWalletCasePage from './pages/SafetyWalletCasePage';
import LlmRagCasePage from './pages/LlmRagCasePage';
import MovieVaultCasePage from './pages/MovieVaultCasePage';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePortfolioPage />} />
    <Route path="/projects/seeds-of-thyme" element={<SeedsOfThymeCasePage />} />
    <Route path="/projects/essential-life" element={<EssentialLifeCasePage />} />
    <Route path="/projects/cams-atm" element={<CamsAtmCasePage />} />
    <Route path="/projects/safety-wallet" element={<SafetyWalletCasePage />} />
    <Route path="/projects/llm-rag-pipelines" element={<LlmRagCasePage />} />
    <Route path="/projects/movie-vault" element={<MovieVaultCasePage />} />
  </Routes>
);

export default App;
