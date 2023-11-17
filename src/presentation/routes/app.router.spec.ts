import { appRouter } from '@presentation/routes/app.router';

describe('Express App Routes', () => {
  const routes = [
    { path: '/provider', method: 'get' },
    { path: '/provider/:provider/search', method: 'get' },
  ];

  it.each(routes)('Route `$method $path` exists', (route) => {
    expect(
      appRouter.stack.some((s) => s.route.path === route.path && s.route.methods[route.method]),
    ).toBeTruthy();
  });
});
