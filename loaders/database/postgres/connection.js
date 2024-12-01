import { Sequelize } from 'sequelize';
import { exec } from 'child_process';

let sequelize;

export default (config) => {
  function defineORMInstance() {
    if (!config) throw new Error('Connection config could not found!');
    sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
      host: config.db.host,
      port: config.db.port,
      dialect: config.db.dialect
    });
  }

  async function connectToPostgres() {
    if (!sequelize) {
      defineORMInstance();
    }
    try {
      await sequelize.authenticate();
      console.info('Connected to PostgreSQL!');
      const tables = await sequelize.getQueryInterface().showAllTables();
      if (tables.length === 0) {
        await runMigrations();
      }
      if (config.db.seedDatabase) {
        const { seedDatabase } = await import('./seeder');
        await seedDatabase();
      }
    } catch (err) {
      console.error('PostgreSQL connection error:', err);
      setTimeout(connectToPostgres, 5000);
    }
  }

  async function runMigrations() {
    await new Promise((resolve, reject) => {
      const migrate = exec(
        `NODE_ENV=${process.env.NODE_ENV} yarn migration:run`,
        err => (err ? reject(err) : resolve())
      );

      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });
  }

  return {
    connectToPostgres,
    sequelize
  };
}
