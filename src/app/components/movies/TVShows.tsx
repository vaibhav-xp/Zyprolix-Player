import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TrendCard from '../VideoCard';
import { videos } from '@/app/Data/videos';
import { useSearchContext } from '@/app/context/gloablConext';
import { videoDataType } from '@/app/Data/videoHelper';

interface MovieListProps {
    limit?: number;
}

export default function TVShows({ limit = 0 }: MovieListProps) {
    const [tvShowList, setTvShowList] = useState<videoDataType[]>([]);
    const { search } = useSearchContext()

    useEffect(() => {
        const filteredTvShows = videos.filter((tvShow) =>
            (tvShow.title.toLowerCase().includes(search.toLowerCase()) ||
                tvShow.description.toLowerCase().includes(search.toLowerCase())) && tvShow.categoryName === 'tv-show'
        );

        setTvShowList(filteredTvShows);
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
            {tvShowList.slice(limit).map((tvShow) => (
                <Grid key={tvShow._id}>
                    <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <TrendCard movie={tvShow} />
                    </Paper>
                </Grid>
            ))}
        </Box>
    );
}
