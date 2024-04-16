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
			'IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = \'dbo\' AND  TABLE_NAME = \'SequelizeMeta\') ' +
			'CREATE TABLE SequelizeMeta (name VARCHAR(255) NOT NULL PRIMARY KEY);'
		);
		await sequelize.query(
			'IF NOT EXISTS (SELECT * FROM SequelizeMeta WHERE name = :file) ' +
			'INSERT INTO SequelizeMeta (name) VALUES (:file);',
			{
				replacements: { file: file }
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
