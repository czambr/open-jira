import moongose, { mongo } from 'mongoose';

/*
0: disconnected,
1: connected
2: connecting
3: disconnecting
*/

const mongooConnection = {
    isConnected: 0,
};

export const connect = async () => {
    if (mongooConnection.isConnected) {
        console.log('Ya estabamos conectados');
        return;
    }

    if (moongose.connections.length > 0) {
        mongooConnection.isConnected = moongose.connections[0].readyState;

        if (mongooConnection.isConnected === 1) {
            console.log('Usando conexion anterior');
            return;
        }

        await moongose.disconnect();
    }

    await moongose.connect(process.env.MONGO_URL || '');
    mongooConnection.isConnected = 1;
    console.log('Conectado a MongoDB', process.env.MONGO_URL);
};

export const disconnect = async () => {
    if (mongooConnection.isConnected === 0) return;
    await moongose.disconnect();
    console.log('Desconectado de MongoDB');
};
