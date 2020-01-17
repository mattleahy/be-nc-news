const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news",
      user: "matthew",
      password: "password"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      user: "matthew",
      password: "password"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
