import * as mqtt from 'mqtt';

export type MQTTConfig = {
    host: string;
};

export function buildMQTTConnection({ host }: MQTTConfig) {
    function init() {
        const client = mqtt.connect(`mqtt://${host}`);
        client.on('connect', () => {
            client.subscribe('presence', err => {
                if (!err) {
                    client.publish('presence', 'Hello mqtt');
                }
            });
        });

        client.on('message', (topic, message) => {
            console.log(message.toString());
            client.end();
        });
    }

    return {
        init
    };
}

export type MQTTCON = ReturnType<typeof buildMQTTConnection>;
