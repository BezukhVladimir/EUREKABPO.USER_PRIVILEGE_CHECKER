const app = require('./server.js');

const PORT = 8080;
let server;

if (require.main === module) {
    server = app.listen(PORT, () => {
        console.log(`Server is running: http://localhost:${PORT}`);
    });
}

module.exports = {
    app,
    start: (port = PORT) => {
        server = app.listen(port, () => {
            console.log(`Server is running: http://localhost:${port}`);
        });

        return server;
    },
    close: () => {
        if (server) {
            server.close();
        }
    }
};
