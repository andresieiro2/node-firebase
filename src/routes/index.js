import express from 'express';

import userRoutes from './user';

const routes = {
  init: app => {
    app.use('/user', userRoutes());

    // default routes
    app.get('/', (request, response) => {
      response.status(200).send(`Pagina inicial`);
    });

    app.get('*', (request, response) => {
      response.status(404).send(`Esta página não foi encontrada`);
    });
  },
};

export default routes;
