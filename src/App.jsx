import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePortfolioPage = lazy(() => import('./pages/HomePortfolioPage'));
const SeedsOfThymeCasePage = lazy(() => import('./pages/SeedsOfThymeCasePage'));
const EssentialLifeCasePage = lazy(() => import('./pages/EssentialLifeCasePage'));
const CamsAtmCasePage = lazy(() => import('./pages/CamsAtmCasePage'));
const SafetyWalletCasePage = lazy(() => import('./pages/SafetyWalletCasePage'));
const LlmRagCasePage = lazy(() => import('./pages/LlmRagCasePage'));
const VegaCasePage = lazy(() => import('./pages/VegaCasePage'));
const MovieVaultCasePage = lazy(() => import('./pages/MovieVaultCasePage'));
const VideoStudioCasePage = lazy(() => import('./pages/VideoStudioCasePage'));

const routeFallbackStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #f7f3ec 0%, #ebe4d8 100%)',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-body)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontSize: '0.72rem',
};

const App = () => (
  <Suspense fallback={<div style={routeFallbackStyle}>Loading portfolio</div>}>
    <Routes>
      <Route path="/" element={<HomePortfolioPage />} />
      <Route path="/projects/seeds-of-thyme" element={<SeedsOfThymeCasePage />} />
      <Route path="/projects/essential-life" element={<EssentialLifeCasePage />} />
      <Route path="/projects/cams-atm" element={<CamsAtmCasePage />} />
      <Route path="/projects/safety-wallet" element={<SafetyWalletCasePage />} />
      <Route path="/projects/llm-rag-pipelines" element={<LlmRagCasePage />} />
      <Route path="/projects/vega" element={<VegaCasePage />} />
      <Route path="/projects/movie-vault" element={<MovieVaultCasePage />} />
      <Route path="/projects/video-studio" element={<VideoStudioCasePage />} />
    </Routes>
  </Suspense>
);

export default App;
