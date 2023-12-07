import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging, isDragging } = useContext(UIContext);

    const { createdAt, description } = entry;

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);

        //Modificar el estado para indicar que se esta haciendo el drag
        startDragging();
    };

    const onDragEnd = () => {
        endDragging();
    };

    return (
        <Card
            sx={{
                marginBottom: 1,
            }}
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
                    <Typography variant='body2'>{createdAt}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
