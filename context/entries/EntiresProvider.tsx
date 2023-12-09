import { PropsWithChildren, FC, useReducer, useEffect } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesAPI } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async (description: string) => {
        const { data } = await entriesAPI.post<Entry>('/entries', { description });
        dispatch({ type: '[Entries] Add-Entry', payload: data });
    };

    const updateEntry = async (entry: Entry) => {
        try {
            const { _id, description, status } = entry;
            const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });

            dispatch({ type: '[Entries] Update', payload: data });
        } catch (error) {
            console.log(error);
        }
    };

    const refresEntries = async () => {
        const { data } = await entriesAPI.get<Entry[]>('/entries');
        dispatch({ type: '[Entries] Refresh-Data', payload: data });
    };

    useEffect(() => {
        refresEntries();
    }, []);

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
