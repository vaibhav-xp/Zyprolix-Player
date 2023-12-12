'use client'
import { Box, Grid, Paper, Typography } from '@mui/material';
import Layout from '@/app/components/Layout';
import VideoCard from '@/app/components/VideoCard';
import { useSearchParams } from 'next/navigation';
import { useSearchContext } from '@/app/context/gloablConext';
import { videoDataType, videoLinkCreator, videoThumbnailLinkCreator } from '@/app/Data/videoHelper';

interface ParamsProps {
    _id: string;
}

export default function Page({ params }: { params: ParamsProps }) {
    const { history } = useSearchContext();
    const query = useSearchParams()
    const movie: videoDataType = {
        _id: params._id,
        videoLink: videoLinkCreator(params._id),
        thumbnail: videoThumbnailLinkCreator(params._id),
        categoryName: query.get('categoryName'),
        title: query.get('title'),
        description: query.get('description')
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xl={7} lg={12} xs={12}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: {
                                xs: '560px',
                                md: '800px',
                                lg: '1000px',
                            },
                            height: {
                                xs: '315px',
                                md: '450px',
                                lg: '562.5px',
                            },
                            overflow: 'hidden',
                            margin: {
                                sm: 'auto',
                                lg: "auto",
                                xl: 0
                            },
                        }}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${movie._id}`}
                            title="YouTube video player"
                            allow="autoplay;"
                            allowFullScreen
                            style={{
                                width: '100%',
                                height: '100%',
                                border: '0',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xl={4} xs={12}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography variant="h5" component="h1" my={2} fontWeight={600} mx={'auto'}>
                            Video Details
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong style={{ fontSize: '20px' }}>Title:</strong> <br /> {movie.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong style={{ fontSize: '20px' }}>Category Name:</strong> <br /> {movie.categoryName}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong style={{ fontSize: '20px' }}>Description:</strong> <br /> {movie.description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} pr={2}>
                    <Box
                        style={{
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h1"
                            fontSize={30}
                            fontWeight={600}
                            mt={2}
                            mb={3}
                        >
                            Recent History
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: `repeat(${history.length}, 320px)`,
                                },
                                width: "100%",
                                height: {
                                    xs: "auto",
                                },
                                gap: 2,
                                overflow: "auto"
                            }}
                        >
                            {history.slice(0, history.length).map((video, index) => (
                                <Grid key={index}>
                                    <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
                                        <VideoCard movie={video} />
                                    </Paper>
                                </Grid>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}
