import mockData from './mockData.json';

async function getRoutes() {
  const data = await new Promise(resolve => setTimeout(() => resolve(mockData), 1000));

  return data;
}

export {
  getRoutes,
}
