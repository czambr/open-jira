import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';
import mongoose from 'mongoose';

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: `El id ${id} no es valido` });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);

        case 'GET':
            return getEntry(req, res);

        case 'DELETE':
            return deleteEntry(req, res);

        default:
            return res.status(400).json({ message: 'Metodo no existente' });
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: `No hay entrada con ese ID ${id}` });
    }

    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;
    try {
        const updateEntry = await Entry.findByIdAndUpdate(
            id,
            { description, status },
            { runValidators: true, new: true }
        );

        await db.disconnect();
        return res.status(200).json(updateEntry!);
    } catch (error: any) {
        await db.disconnect();
        return res.status(400).json({ message: error.errors.status.message });
    }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const entryDB = await Entry.findById(id);
    await db.disconnect();

    if (!entryDB) {
        return res.status(400).json({ message: `No hay entrada con ese ID ${id}` });
    }

    return res.status(200).json(entryDB!);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToDelete = await Entry.findById(id);
    if (!entryToDelete) {
        await db.disconnect();
        return res.status(400).json({ message: `No hay entrada con ese ID ${id}` });
    }

    try {
        const entryDelted = await Entry.findByIdAndDelete(id, { returnDocument: 'before' });

        await db.disconnect();
        return res.status(200).json(entryDelted!);
    } catch (error: any) {
        await db.disconnect();
        return res.status(400).json({ message: error.errors.status.message });
    }
};
