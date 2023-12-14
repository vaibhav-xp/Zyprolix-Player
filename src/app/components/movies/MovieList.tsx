import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TrendCard from '../VideoCard';
import { videos } from '@/app/Data/videos';
import { videoDataType } from '@/app/Data/videoHelper';
import { useSearchContext } from '@/app/context/gloablConext';

interface MovieListProps {
    limit?: number;
}

export default function MoviesList({ limit = 0 }: MovieListProps) {
    const [movieList, setMovieList] = useState<videoDataType[]>([]);
    const { search } = useSearchContext()

    useEffect(() => {
        const filteredMovies = videos.filter((movie) =>
            ((movie.title && movie.title.toLowerCase().includes(search.toLowerCase())) ||
                (movie.description && movie.description.toLowerCase().includes(search.toLowerCase()))) &&
            movie.categoryName !== 'tv-show' && movie.categoryName !== 'education'
        );
        setMovieList(filteredMovies);
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
            {movieList.slice(limit).map((video) => (
                <Grid key={video._id}>
                    <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <TrendCard movie={video} />
                    </Paper>
                </Grid>
            ))}
        </Box>
    );
}
