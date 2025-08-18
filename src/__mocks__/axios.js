const mockAxios = {
  get: jest.fn(() => Promise.resolve({
    data: [
      {
        id: '1',
        title: 'Test News 1',
        sources: [{ url: 'http://example.com', publisher: 'Example' }],
        stressLevel: 'medium',
        tags: ['health', 'science']
      },
      {
        id: '2',
        title: 'Test News 2',
        sources: [{ url: 'http://example2.com', publisher: 'Example2' }],
        stressLevel: 'high',
        tags: ['politics']
      }
    ]
  })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
export default mockAxios;
