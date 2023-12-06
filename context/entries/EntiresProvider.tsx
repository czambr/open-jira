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
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'task2',
            status: 'in-progress',
            createdAt: 123213123123123,
        },
        {
            _id: uuidv4(),
            description: 'task3',
            status: 'finished',
            createdAt: 151554544555,
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

    return (
        <EntriesContext.Provider
            value={{
                ...state,

                //Methods
                addNewEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
