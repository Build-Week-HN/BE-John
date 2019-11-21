const server = require('./src/api/server.js');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT}`);
});
