import { Bookmark, LocalMovies, LocalMoviesOutlined, Movie, PlayCircle } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function VideoCard({ movie }) {
    const { title, thumbnail, categoryName, videoLink, description } = movie
    const newTitle = title.split(' ').splice(0, 5).join(" ")

    return (
        <Card
            key={movie._id}
            elevation={0}
            style={{ backgroundColor: "transparent", color: "white" }}
        >
            <CardContent
                style={{
                    padding: 0,
                    position: "relative",
                    display: "flex",
                }}
            >
                <Image
                    src={thumbnail}
                    alt=""
                    width={320}
                    height={240}
                    style={{
                        borderRadius: '8px',
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgcolor="rgba(0,0,0,0.7)"
                    borderRadius="8px"
                />
                <Stack
                    mt="6"
                    spacing={0}
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p={4}
                >
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography
                                fontSize={14}
                                color="#E0E0E0"
                                aria-label="year of movie"
                            >
                                {categoryName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{
                                    width: "1rem",
                                    height: "1rem",
                                    bg: "#E0E0E0",
                                    borderRadius: "full",
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{
                                    width: "1rem",
                                    height: "1rem",
                                    bg: "#E0E0E0",
                                    borderRadius: "full",
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography
                        color="#E0E0E0"
                        padding={0}
                        fontSize={20}
                        fontWeight={600}
                        aria-label="movie title">
                        {newTitle}
                    </Typography>
                </Stack>
                <Box
                    style={{
                        position: "absolute",
                        top: "-2px",
                        left: 0,
                        right: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer"
                    }}
                >
                    <Bookmark />
                </Box>
                <Link
                    style={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                        height: "60px",
                        width: "60px",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                    href={`/video/${movie._id}`}
                >
                    <PlayCircle
                        sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            color: 'white',
                            opacity: 0.8,
                            transition: 'all 0.2s',
                            '&:hover': {
                                opacity: 1,
                                transform: 'scale(1.2)'
                            },
                            '&:active': {
                                transform: 'scale(0.9)'
                            }
                        }}
                    />
                </Link>
            </CardContent>
        </Card >
    )
}