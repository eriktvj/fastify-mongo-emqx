import { App } from './app';
import { buildConfig } from './config';
import { Logger } from 'pino';
import { NOSQL_DB } from './database/mongo-db';

export default function gracefulShutdown(
	app: App,
	logger: Logger,
	noslqDB: NOSQL_DB
): () => Promise<void> {
	const config = buildConfig();
	return async (): Promise<void> => {
		try {
			logger.info(`Shutting down ${config.projectName}.`);
			await app.close();
			await noslqDB.close();
			logger.info('Shutdown complete. Exit now.');
			process.exit(0);
		} catch (error) {
			logger.error('error while shutting down.', error);
			process.exit(1);
		}
	};
}
