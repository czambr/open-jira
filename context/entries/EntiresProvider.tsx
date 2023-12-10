import { PropsWithChildren, FC, useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        const { data } = await entriesAPI.post<Entry>('/entries', { description });
        dispatch({ type: '[Entries] Add-Entry', payload: data });
    };

    const updateEntry = async (entry: Entry, showSnackBar = false) => {
        try {
            const { _id, description, status } = entry;
            const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });

            dispatch({ type: '[Entries] Update', payload: data });

            if (showSnackBar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refresEntries = async () => {
        const { data } = await entriesAPI.get<Entry[]>('/entries');
        dispatch({ type: '[Entries] Refresh-Data', payload: data });
    };

    const deleteEntry = async (entry: Entry) => {
        const { _id } = entry;
        const { data } = await entriesAPI.delete<Entry>(`/entries/${_id}`);

        dispatch({ type: '[Entries] Delete', payload: data });
        enqueueSnackbar('Entrada borrada con exito', {
            variant: 'info',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
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
                deleteEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
