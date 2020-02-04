module.exports = {
    dialect: 'postgres',
    host: 'db',
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};
