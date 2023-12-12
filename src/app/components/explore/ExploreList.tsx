import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TrendCard from '../VideoCard';
import { videos } from '@/app/Data/videos';
import { useSearchContext } from '@/app/context/gloablConext';
import { videoDataType, videoLinkCreator, videoThumbnailLinkCreator } from '@/app/Data/videoHelper';
import { ytDataAPI } from '@/app/context/yt_api';

export default function ExploreList() {
    const [explore, setExplore] = useState<videoDataType[]>([]);
    const { search } = useSearchContext();

    const ytFetch = async (): Promise<videoDataType[]> => {
        const data = await ytDataAPI(search);
        const ytFilter: videoDataType[] = data.items
            .filter((movie: any) => movie.id.kind === "youtube#video")
            .map((movie: any) => {
                const _id = movie.id.videoId;
                return {
                    _id: _id,
                    videoLink: videoLinkCreator(_id),
                    categoryName: "Youtube Search",
                    thumbnail: videoThumbnailLinkCreator(_id),
                    title: movie.snippet.title,
                    description: movie.snippet.description,
                };
            });

        return ytFilter;
    };

    useEffect(() => {
        const fetchData = async () => {
            const filteredMovies = videos.filter(
                (movie) =>
                ((movie.title && movie.title.toLowerCase().includes(search.toLowerCase())) ||
                    (movie.description && movie.description.toLowerCase().includes(search.toLowerCase())))
            );

            if (filteredMovies.length < 8 && search) {
                const ytData = await ytFetch();
                setExplore([...filteredMovies, ...ytData]);
            } else {
                setExplore(filteredMovies)
            }
        };

        fetchData();
    }, [search]);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(auto-fit, minmax(320px, auto))',
                    lg: 'repeat(3, minmax(320px, auto))',
                    xl: 'repeat(4, minmax(320px, auto))',
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
