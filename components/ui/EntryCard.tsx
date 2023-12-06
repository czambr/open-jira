import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { FC } from 'react';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { createdAt, description } = entry;

    return (
        <Card
            sx={{ marginBottom: 1 }}
            // Enventos de darg
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{createdAt}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
