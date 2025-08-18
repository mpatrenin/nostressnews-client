export const getTitleStyle = (opacity: number) => ({
  opacity: Math.max(opacity / 100, 0.10),
  transition: 'opacity 0.6s ease',
});