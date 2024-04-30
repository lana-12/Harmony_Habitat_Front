const { createProxyMiddleware } = require('http-proxy-middleware');

   module.exports = function(app) {
     app.use(
       '/connexion/oauth2',
       createProxyMiddleware({
         target: 'https://entreprise.pole-emploi.fr',
         changeOrigin: true,
       })
     );
   };