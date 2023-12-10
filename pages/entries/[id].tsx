import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
    capitalize,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    IconButton,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { dbEntries } from '../../database';
import { Entry, EntryStatus } from '../../interfaces';
import { Layout } from '../../components/layouts';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const inNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const router = useRouter();
    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    };

    const onSaved = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            description: inputValue,
            status,
        };
        updateEntry(updatedEntry, true);
    };

    const onDelete = () => {
        deleteEntry(entry);
        setTimeout(() => {
            router.push('/');
        }, 900);
    };

    return (
        <Layout title={inputValue.substring(0, 20).trim() + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                >
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={` Creada ${dateFunctions.getFormatDistanceToNow(
                                entry.createdAt
                            )}`}
                        />

                        <CardContent>
                            <TextField
                                placeholder='Nueva Entrada'
                                label='Nueva entrada'
                                sx={{ marginTop: 2, margiBottom: 1 }}
                                fullWidth
                                autoFocus
                                multiline
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onInputValueChanged}
                                helperText={inNotValid && 'Ingrese un valor'}
                                error={inNotValid && touched}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {validStatus.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSaved}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
                onClick={onDelete}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Layout>
    );
};

// SSR - (Server Side Rendering)
// Get information by user request's
export const getServerSideProps: GetServerSideProps = async ctx => {
    const { id } = ctx.params as { id: string };
    const entry = await dbEntries.getEntryByID(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { entry },
    };
};

export default EntryPage;
