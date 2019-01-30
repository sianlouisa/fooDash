export const generateRandomPosition = (y) => {
  const timesByX = Math.round(Math.random()) ? 0.4 : -0.4;
  const timesByZ = Math.round(Math.random()) ? 0.4 : -0.4;
  return [Math.random() * timesByX, y, Math.random() * timesByZ];
};
