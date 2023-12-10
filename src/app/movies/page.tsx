'use client';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { Box, InputAdornment, InputBase, Paper, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import MoviesList from '../components/movies/MovieList';
import { useSearchContext } from '../context/gloablConext';

export default function Page() {
    const { search, setSearch } = useSearchContext()

    useEffect(() => {
        return () => setSearch("")
    }, [])

    return (
        <Layout>
            <Box>
                <Paper
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "default",
                        p: 1,
                        backgroundColor: "#10141f",
                        border: "none"
                    }}
                >
                    <InputBase
                        placeholder="Search for movies or TV series"
                        sx={{
                            ml: 1,
                            flex: 1,
                            color: "white",
                            border: "none"
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon htmlColor="white" />
                            </InputAdornment>
                        }
                    />
                </Paper>
            </Box>
            <Box py={2} px={4}>
                <Box width="100%">
                    <Box width="100%">
                        <Typography
                            variant="h5"
                            component="h1"
                            my={6}
                            fontWeight={400}
                        >
                            Movies
                        </Typography>
                        <MoviesList />
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}
