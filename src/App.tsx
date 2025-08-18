import React, { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import StressSlider from './components/StressSlider';
import PopularTags from './components/PopularTags';
import { getTitleStyle } from './utils';
import './App.css';

const App: React.FC = () => {
  const [stressLevel, setStressLevel] = useState(50);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Clear selectedTags if none are present in the current popularTags (i.e., filtered news)
  useEffect(() => {
    if (selectedTags.length > 0) {
      const stillPresent = selectedTags.filter(tag => popularTags.includes(tag));
      if (stillPresent.length !== selectedTags.length) {
        setSelectedTags([]);
      }
    }
  }, [popularTags, selectedTags]);

  return (
    <div className="app">
      <header className="sticky-header">
        <div className="header-content">
          <a href="/" className="home-link">
            <h1>
              <span style={getTitleStyle(stressLevel <= 50 ? 100 : 100 - stressLevel)}>No</span>{' '}
              <span style={getTitleStyle(100)}>Stress</span>{' '}
              <span style={getTitleStyle(stressLevel >= 50 ? 100 : stressLevel)}>News</span>
            </h1>
          </a>
          <StressSlider value={stressLevel} onChange={setStressLevel} />
        </div>
        <PopularTags
          popularTags={popularTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </header>
      <main>
        <NewsList
          stressLevel={stressLevel}
          selectedTags={selectedTags}
          setPopularTags={setPopularTags}
        />
      </main>
    </div>
  );
};

export default App;