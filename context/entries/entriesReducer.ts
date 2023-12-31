import { EntriesState } from './';
import { Entry } from '../../interfaces';

type EntriesActionType =
    | { type: '[Entries] Add-Entry'; payload: Entry }
    | { type: '[Entries] Update'; payload: Entry }
    | { type: '[Entries] Refresh-Data'; payload: Entry[] }
    | { type: '[Entries] Delete'; payload: Entry };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entries] Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload],
            };

        case '[Entries] Update':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                }),
            };

        case '[Entries] Refresh-Data':
            return {
                ...state,
                entries: [...action.payload],
            };

        case '[Entries] Delete':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload._id),
            };
        default:
            return state;
    }
};
