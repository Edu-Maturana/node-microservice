module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST         || 'bkabj8wc6zhqrkc6juvw-mysql.services.clever-cloud.com',
        user: process.env.MYSQL_USER         || 'u3ld0sazbrzmmcpa',
        password: process.env.MYSQL_PASSWORD || '2pCUIaAlXSm2F7PQKFa0',
        database: process.env.MYSQL_DATABASE || 'bkabj8wc6zhqrkc6juvw',
    },
}