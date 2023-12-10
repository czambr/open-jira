import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

import { EntriesProvider } from '../context/entries';
import { UIProvider } from '../context/ui';
import { darkTheme, ligthTheme } from '../themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SnackbarProvider maxSnack={3}>
            <EntriesProvider>
                <UIProvider>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </UIProvider>
            </EntriesProvider>
        </SnackbarProvider>
    );
}

export default MyApp;
