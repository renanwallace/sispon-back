const env = require('dotenv');
const app = require('./app');

env.config();

app.listen(process.env.PORT || 3000, () => {
  console.info(`
  Server rodando em: http://localhost:${process.env.PORT || 3000}
  `);
});

app.listen(3333);
