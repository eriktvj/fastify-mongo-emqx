import { FastifyInstance } from 'fastify';
import { buildServer } from './server';
import { Logger } from 'pino';
import { NOSQL_DB } from './database/mongo-db';

export type AppDeps = {
	logger: Logger;
	dbNoSql: NOSQL_DB;
};
export async function buildApp(deps: AppDeps) {
	const server = buildServer(deps);
	return {
		async close(): Promise<void> {
			await server.close();
		},
		getServer(): FastifyInstance {
			return server;
		},
	};
}

export type App = Awaited<ReturnType<typeof buildApp>>;
