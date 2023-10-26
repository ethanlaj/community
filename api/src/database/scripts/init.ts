import dotenv from 'dotenv';
dotenv.config();
import sequelize from '../database';
import path from 'path';
import fs from 'fs/promises';

async function markMigrationsAsExecuted() {
	const migrationsDir = path.resolve(__dirname, '../migrations');
	const migrationFiles = await fs.readdir(migrationsDir);

	for (const file of migrationFiles) {
		await sequelize.query(
			'CREATE TABLE IF NOT EXISTS SequelizeMeta (name VARCHAR(255) NOT NULL, PRIMARY KEY (name));'
		);
		await sequelize.query(
			'INSERT IGNORE INTO SequelizeMeta (name) VALUES (?);',
			{
				replacements: [file],
			}
		);
	}
}

sequelize
	.sync({ force: false })
	.then(async () => {
		console.log('Database synced');
		await markMigrationsAsExecuted();
		sequelize.close();
	})
	.catch(console.error);
