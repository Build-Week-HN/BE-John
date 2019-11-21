const server = require('./src/api/server.js');

require('./src/services');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT}`);
});
