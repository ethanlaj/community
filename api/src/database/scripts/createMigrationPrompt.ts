import readlineSync from 'readline-sync';
import { execSync } from 'child_process';

const migrationName = readlineSync.question('Please enter the migration name: ');

if (migrationName) {
	try {
		execSync(`npx sequelize-cli migration:generate --name ${migrationName}`, { stdio: 'inherit' });
		console.log('Migration created successfully.');
	} catch (error) {
		console.error('Error creating migration:', error);
	}
} else {
	console.log('You must provide a name for the migration.');
}