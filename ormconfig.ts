import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migrations/*.ts'],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'history',
})