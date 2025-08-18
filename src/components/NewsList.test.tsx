
import { render } from '@testing-library/react';
import NewsList from './NewsList';
jest.mock('axios');

describe('NewsList', () => {
  it('renders without crashing', () => {
    render(
  <NewsList stressLevel={50} selectedTags={[]} setPopularTags={() => undefined} />
    );
  });
});
