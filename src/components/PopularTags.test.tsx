import { render } from '@testing-library/react';
import PopularTags from './PopularTags';

describe('PopularTags', () => {
  it('renders without crashing', () => {
    render(
  <PopularTags popularTags={['tag1', 'tag2']} selectedTags={[]} setSelectedTags={() => undefined} />
    );
  });
});
