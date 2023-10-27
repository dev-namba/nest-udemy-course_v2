import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'history',
})