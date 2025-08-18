import React, { useState, useEffect } from 'react';

const StressSlider: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [localValue, onChange]);

  // Map value to stress level and emoji
  const getStressLevelEmoji = (value: number) => {
    if (value <= 20) return '😌'; // veryLow
    if (value <= 40) return '🙂'; // low
    if (value <= 60) return '😐'; // medium
    if (value <= 80) return '😟'; // high
    return '😱'; // veryHigh
  };

  // Calculate thumb position for overlay
  const sliderMin = 0;
  const sliderMax = 100;
  const trackWidth = 220; // px, should match CSS width
  const percent = (localValue - sliderMin) / (sliderMax - sliderMin);
  // Place emoji so its center is flush with slider edges at min/max
  const left = percent * trackWidth;

  return (
    <div className="stress-slider">
      <input
        type="range"
        min={sliderMin}
        max={sliderMax}
        value={localValue}
        onChange={(e) => setLocalValue(Number(e.target.value))}
        className="stress-slider-input"
      />
      <span
        className="stress-slider-emoji"
        style={{ left }}
      >
        {getStressLevelEmoji(localValue)}
      </span>
    </div>
  );
};

export default StressSlider;