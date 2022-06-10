import { buildConfig } from './config';
import gracefulShutdown from './graceful-shutdown';
import 'make-promises-safe';
import { buildApp } from './app';
import { buildLogger } from './logger';
import { buildMongoDatabase, NOSQL_DB } from './database/mongo-db';
import { buildMQTTConnection, MQTTCON } from './database/mqtt';

const config = buildConfig();
const logger = buildLogger(config.log);

let dbNoSql: NOSQL_DB;
let mqttCon: MQTTCON;

async function main() {
    logger.info(`Starting ${config.projectName}`);
    const { http, mongo, mqtt } = config;

    dbNoSql = buildMongoDatabase(mongo);

    mqttCon = buildMQTTConnection(mqtt);

    await dbNoSql.init();
    await mqttCon.init();

    const app = await buildApp({ logger, dbNoSql });

    await app.getServer().listen(http.port, http.host);
    process.on('SIGTERM', gracefulShutdown(app, logger, dbNoSql));
    process.on('SIGINT', gracefulShutdown(app, logger, dbNoSql));
}

main().catch(error => {
    logger.error(
        `Error while starting up ${config.projectName}. ${error.message}`
    );
    process.exit(1);
});
