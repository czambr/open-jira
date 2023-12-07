import { PropsWithChildren, FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'task1',
            status: 'pending',
            createdAt: 1701892330708 - 100,
        },
        {
            _id: uuidv4(),
            description: 'task2',
            status: 'in-progress',
            createdAt: 1701892331155,
        },
        {
            _id: uuidv4(),
            description: 'task3',
            status: 'finished',
            createdAt: 1701892330708,
        },
    ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending',
        };

        dispatch({ type: '[Entries] Add-Entry', payload: newEntry });
    };

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entries] Update', payload: entry });
    };

    return (
        <EntriesContext.Provider
            value={{
                ...state,

                //Methods
                addNewEntry,
                updateEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
