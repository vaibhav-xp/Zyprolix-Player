'use client'
import { trendingVideos } from '@/app/Data/trending'
import { Box, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TrendCard from '../VideoCard'
import { videoDataType } from '@/app/Data/videoHelper'
import { useSearchContext } from '@/app/context/gloablConext'

export default function MoviesTrendList({ isVideo = false }) {
    const [toDisplay, setToDisplay] = useState<videoDataType[]>(trendingVideos)
    const { history } = useSearchContext()

    useEffect(() => {
        if (isVideo) {
            setToDisplay(history)
        }
    }, [isVideo])

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(320px, auto))",
                gap: 2,
                overflowX: "auto"
            }}
        >
            {toDisplay.map((movie) => (
                <Grid key={movie._id}>
                    <Paper
                        elevation={0}
                        sx={{ backgroundColor: 'transparent' }}
                    >
                        <TrendCard movie={movie} />
                    </Paper>
                </Grid>
            ))}
        </Box>
    )
}
