const nodePhpAwesomeServer = require('node-php-awesome-server');

const php = nodePhpAwesomeServer({

    port: 9001,
    root: "./src/auth",
    ini_set: {
        max_execution_time: 280
    },
    output: {
        os: true,
        browser: true,
        device: true,
        reqTime: true
    },
    clustersSet: 'auto',
    phpPerCluster: 2

});

php.on('close', () => {
    console.log('php server closed');
});

php.on('connect', () => {
    console.log('All up and running');
});