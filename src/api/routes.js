const mockData = ['AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1'];

async function getRoutes() {
  await new Promise(resolve => setTimeout(() => resolve(), 1000));

  return mockData;
}

export {
  getRoutes,
}
