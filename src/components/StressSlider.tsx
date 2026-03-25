import React, { useState, useEffect, useRef } from 'react';

const StressSlider: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const [containerWidth, setContainerWidth] = useState(220);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(localValue), 300);
    return () => clearTimeout(timeout);
  }, [localValue, onChange]);

  const getStressLevelEmoji = (value: number) => {
    if (value <= 20) return '😌';
    if (value <= 40) return '🙂';
    if (value <= 60) return '😐';
    if (value <= 80) return '😟';
    return '😱';
  };

  const emojiSize = 32;
  const percent = localValue / 100;
  const left = (emojiSize / 2) + percent * (containerWidth - emojiSize);

  return (
    <div className="stress-slider" ref={containerRef}>
      <input
        type="range"
        min={0}
        max={100}
        value={localValue}
        onChange={(e) => setLocalValue(Number(e.target.value))}
        className="stress-slider-input"
      />
      <span className="stress-slider-emoji" style={{ left }}>
        {getStressLevelEmoji(localValue)}
      </span>
    </div>
  );
};

export default StressSlider;