'use client'
import { trendingVideos } from '@/app/Data/trending'
import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import TrendCard from '../VideoCard'

export default function MoviesTrendList() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(320px, auto))",
                gap: 2,
                overflowX: "auto"
            }}
        >
            {trendingVideos.map((movie) => (
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
