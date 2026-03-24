import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './NewsList.css';

interface NewsItem {
  id: string;
  title: string;
  sources: { url: string; publisher: string }[];
  stressLevel: string;
  tags?: string[];
}

interface NewsListProps {
  stressLevel: number;
  selectedTags?: string[];
  setPopularTags?: (tags: string[]) => void;
}

const NewsList: React.FC<NewsListProps> = ({ stressLevel, selectedTags = [], setPopularTags }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiBaseUrl}/api/news`);
      const fetchedNews = response.data;
      setAllNews(fetchedNews);
      setNews(filterNews(fetchedNews, stressLevel, selectedTags));
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [stressLevel, selectedTags]);

  // Silent background refresh — preserves current filtered view while updating allNews
  const silentRefresh = useCallback(async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiBaseUrl}/api/news`);
      const fetchedNews = response.data;
      setAllNews(fetchedNews);
      setNews(filterNews(fetchedNews, stressLevel, selectedTags));
    } catch (err) {
      console.error('Silent refresh failed:', err);
    }
  }, [stressLevel, selectedTags]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        silentRefresh();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [silentRefresh]);

  useEffect(() => {
    if (!allNews.length) {
      fetchNews();
    } else {
      const filtered = filterNews(allNews, stressLevel, selectedTags);
      setNews(filtered);
      // Calculate popular tags from filtered news
      if (setPopularTags) {
        const tagCount: Record<string, number> = {};
        filtered.forEach(item => {
          (item.tags ?? []).forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        });
        const tags = Object.entries(tagCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([tag]) => tag);
        setPopularTags(tags);
      }
    }
  }, [stressLevel, selectedTags, allNews, fetchNews, setPopularTags]);

  const filterNews = (news: NewsItem[], stressLevel: number, selectedTags: string[]): NewsItem[] => {
    const targetLevel =
      stressLevel <= 20 ? 'veryLow' :
      stressLevel <= 40 ? 'low' :
      stressLevel <= 60 ? 'medium' :
      stressLevel <= 80 ? 'high' :
      'veryHigh';
    let filtered = news.filter(item => item.stressLevel === targetLevel);
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item =>
        selectedTags.every(tag => (item.tags ?? []).includes(tag))
      );
    }
    return filtered;
  };

  const loadingMessages = [
    'Finding the best articles...',
    'Reading top stories...',
    'Stressing news...',
    'Adjusting the slider...',
    'Mixing everything...'
  ];
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [fade, setFade] = useState(true);
  
  useEffect(() => {
    if (loading && !allNews.length) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setLoadingMsgIdx(idx => (idx + 1) % loadingMessages.length);
          setFade(true);
        }, 300);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading, allNews.length, loadingMessages.length]);

  if (loading && !allNews.length) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className={fade ? 'fade-loading-msg-in' : 'fade-loading-msg-out'}>
          {loadingMessages[loadingMsgIdx]}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-spinner">
        <p>Could not load news. Please check your connection.</p>
        <button onClick={fetchNews} style={{ marginTop: '1em', padding: '0.5em 1.5em', cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="news-list">
        {news.map(item => (
          <a
            href={item.sources[0].url}
            key={item.id}
            className="news-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* TAGS */}
            <div className="news-tags">
              {item.tags && item.tags.map(tag => (
                <span className="news-source-icon" key={tag}>{tag}</span>
              ))}
            </div>
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{item.title}</span>
              <span
                className="news-source-icon"
                tabIndex={0}
                data-publisher={item.sources[0].publisher}
              >
                {item.sources[0].publisher.length > 25
                  ? item.sources[0].publisher.slice(0, 25) + '...'
                  : item.sources[0].publisher}
                <span className="news-source-popup">
                  {item.sources[0].url}
                </span>
              </span>
            </h2>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsList;