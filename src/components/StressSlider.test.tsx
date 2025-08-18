import { render } from '@testing-library/react';
import StressSlider from './StressSlider';

describe('StressSlider', () => {
  it('renders without crashing', () => {
  render(<StressSlider value={50} onChange={() => undefined} />);
  });
});
