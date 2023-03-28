module.exports = {
  client: 'mysql2',
  connection: process.env.DB_URL,
  seeds: {
    directory: 'D:\\Projetos\\Estudo\\Node\\final-project\\backend-final-project\\src\\database\\seeds',
  },
  migrations: {
    directory: 'D:\\Projetos\\Estudo\\Node\\final-project\\backend-final-project\\src\\database\\migrations'
  },
  useNullAsDefault: true
};
