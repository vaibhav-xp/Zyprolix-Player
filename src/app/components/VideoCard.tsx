import { BookmarkAdd, BookmarkAdded, PlayCircle } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSearchContext } from '../context/gloablConext'
import { loginAPI } from '../context/firebase'

export default function VideoCard({ movie }: { movie: any }) {
    const { title, thumbnail, categoryName, description } = movie;
    const newTitle = title.split(' ').splice(0, 5).join(" ");
    const { bookmark, setBookmark, user, setHistory, addDataToFirebase } = useSearchContext();
    const [isBookmark, setIsBookmark] = useState<boolean>(false);

    useEffect(() => {
        const book = bookmark.some((video) => video._id === movie._id);
        setIsBookmark(book);
    }, [bookmark, movie._id]);

    const handleToggleBookmark = async () => {
        if (user) {
            if (isBookmark) {
                const updatedBookmarks = bookmark.filter((video) => video._id !== movie._id);
                setBookmark(() => {
                    addDataToFirebase({ bookmarkData: updatedBookmarks })
                    return updatedBookmarks
                });
            } else {
                setBookmark((prevBookmark) => {
                    const newData = [movie, ...prevBookmark]
                    addDataToFirebase({ bookmarkData: newData })
                    return newData
                });
            }
        } else {
            await loginAPI()
        }
    };

    const saveHistory = async () => {
        if (user) {
            setHistory((prevHistory) => {

                const newData = [movie, ...prevHistory];
                if (prevHistory[0]?._id !== movie._id && prevHistory.length > 0) {
                    addDataToFirebase({ historyData: newData })
                    return newData

                } else if (prevHistory.length === 0) {
                    addDataToFirebase({ historyData: newData })
                    return newData
                }

                return prevHistory

            });
        } else {
            await loginAPI()
        }
    };

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
                    priority
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
                        right: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer"
                    }}
                    onClick={handleToggleBookmark}
                >
                    {isBookmark ? (
                        <BookmarkAdded style={{
                            color: 'green'
                        }} />
                    ) : (
                        <BookmarkAdd />
                    )}
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
                    href={{
                        pathname: user ? `/video/${movie._id}` : "",
                        query: user ? {
                            title,
                            categoryName,
                            description
                        } : "",
                    }}

                    onClick={saveHistory}
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
