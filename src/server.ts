import fastify, { FastifyInstance, FastifySchema } from 'fastify';
import type { Logger } from 'pino';
import { NOSQL_DB } from './database/mongo-db';

const VersionSchema: FastifySchema = {
    response: {
        '200': {
            type: 'object',
            properties: {
                version: { type: 'string' }
            }
        }
    }
};

export type ServerDeps = {
    logger: Logger;
    dbNoSql: NOSQL_DB;
};
export function buildServer({ logger, dbNoSql }: ServerDeps): FastifyInstance {
    const server = fastify({ logger });

    server.get('/version', { schema: VersionSchema }, (req, reply) => {
        reply
            .status(200)
            .headers({ 'content-type': 'application/json' })
            .send({ version: '0.0.1' });
    });

    return server;
}
