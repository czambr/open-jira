import moongose, { mongo } from 'mongoose';

/*
0: disconnected,
1: connected
2: connecting
3: disconnecting
*/

const mongoConnection = {
    isConnected: 0,
};

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log('Ya estabamos conectados');
        return;
    }

    if (moongose.connections.length > 0) {
        mongoConnection.isConnected = moongose.connections[0].readyState;

        if (mongoConnection.isConnected === 1) {
            console.log('Usando conexion anterior');
            return;
        }

        await moongose.disconnect();
    }

    await moongose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB', process.env.MONGO_URL);
};

export const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return;
    if (mongoConnection.isConnected === 0) return;

    await moongose.disconnect();
    mongoConnection.isConnected = 0;

    console.log('Desconectado de MongoDB');
};
