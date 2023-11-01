import Server from '@infrastructure/web/server';

new Server(process.env.PORT || '3000').start();
