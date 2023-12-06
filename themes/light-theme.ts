import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const ligthTheme = createTheme({
    palette: {
        mode: 'light',

        background: {
            default: grey[400],
        },
        primary: {
            main: '#4A148C',
        },
        secondary: {
            main: '#19857B',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
        },
    },
});
