import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);
    const rotuer = useRouter();

    const { createdAt, description } = entry;

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);

        //Modificar el estado para indicar que se esta haciendo el drag
        startDragging();
    };

    const onDragEnd = () => {
        endDragging();
    };

    const onClick = () => {
        rotuer.push(`/entries/${entry._id}`);
    };

    return (
        <Card
            sx={{
                marginBottom: 1,
            }}
            onClick={onClick}
            // Enventos de drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea sx={{}}>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>
                        {dateFunctions.getFormatDistanceToNow(createdAt)}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
