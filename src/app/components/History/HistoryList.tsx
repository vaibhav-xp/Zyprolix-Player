import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TrendCard from '../VideoCard';
import { useSearchContext } from '@/app/context/gloablConext';
import { videoDataType } from '@/app/Data/videoHelper';

export default function HistoryList() {
    const [explore, setExplore] = useState<videoDataType[]>([]);
    const { search, history } = useSearchContext();

    useEffect(() => {
        const filteredMovies = history.filter(
            (movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase()) ||
                movie.description.toLowerCase().includes(search.toLowerCase())
        );

        setExplore(filteredMovies);
    }, [search, history]);

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(320px, auto))',
            lg: 'repeat(3, minmax(320px, auto))',
            xl: 'repeat(4, minmax(320px, auto))',
        },
        gap: 2,
    };

    return (
        <Box sx={gridContainerStyle}>
            {explore.map((video) => (
                <Grid key={video._id}>
                    <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <TrendCard movie={video} />
                    </Paper>
                </Grid>
            ))}
        </Box>
    );
}
