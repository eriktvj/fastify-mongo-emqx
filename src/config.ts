import convict from 'convict';

export type Config = {
    env: 'production' | 'development' | 'test';
    projectName: string;
    log: {
        level: string;
        enabled: boolean;
    };
    http: {
        host: string;
        port: number;
    };
    mongo: {
        host: string;
        port: number;
        database: string;
    };
    mqtt: {
        host: string;
    };
};

export function buildConfig(): Config {
    const config = convict<Config>({
        projectName: {
            doc: 'Fastify project',
            format: String,
            default: 'Default Project',
            env: 'PROJECT_NAME'
        },
        env: {
            doc: 'The application environment.',
            format: ['production', 'development', 'test'],
            default: 'development',
            env: 'NODE_ENV'
        },
        log: {
            level: {
                doc: 'The log level (default info).',
                format: String,
                default: 'info',
                env: 'LOG_LEVEL'
            },
            enabled: {
                doc: 'enable log (default true).',
                format: Boolean,
                default: true,
                env: 'LOG_ENABLED'
            }
        },
        http: {
            host: {
                doc: 'The host ip address to bind the http server.',
                format: String,
                default: '0.0.0.0',
                env: 'HTTP_HOST'
            },
            port: {
                doc: 'The port to bind the http server.',
                format: 'port',
                default: 3099,
                env: 'HTTP_PORT'
            }
        },
        mongo: {
            host: {
                doc: 'The host ip address to bind the MongoDB server.',
                format: String,
                default: '0.0.0.0',
                env: 'MONGO_HOST'
            },
            port: {
                doc: 'The port to bind the MongoDB server.',
                format: 'port',
                default: 27017,
                env: 'MONGO_PORT'
            },
            database: {
                doc: 'The database name to bind the MongoDB server.',
                format: String,
                default: 'teamcamp',
                env: 'MONGO_DATABASE_NAME'
            }
        },
        mqtt: {
            host: '0.0.0.0',
            env: 'MQTT_HOST'
        }
    });
    config.validate({ allowed: 'strict' });
    return config.getProperties();
}
