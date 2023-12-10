import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TrendCard from '../VideoCard';
import { videos } from '@/app/Data/videos';
import { useSearchContext } from '@/app/context/gloablConext';
import { videoDataType } from '@/app/Data/videoHelper';

export default function ExploreList() {
    const [explore, setExplore] = useState<videoDataType[]>([])
    const { search } = useSearchContext()

    useEffect(() => {
        const filteredMovies = videos.filter((movie) =>
            (movie.title.toLowerCase().includes(search.toLowerCase()) ||
                movie.description.toLowerCase().includes(search.toLowerCase())) &&
            movie.categoryName !== 'tv-show'
        );
        setExplore(filteredMovies);
    }, [search]);


    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(auto-fit, minmax(320px, auto))',
                    lg: "repeat(3, minmax(320px, auto))",
                    xl: "repeat(4, minmax(320px, auto))",
                },
                gap: 2,
            }}
        >
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
