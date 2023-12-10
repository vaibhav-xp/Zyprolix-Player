'use client';
import { Box, InputAdornment, InputBase, Paper, Typography } from "@mui/material";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { data } from "./context/yt_api";
import MoviesTrendList from "./components/movies/MoviesTrendList";
import MoviesList from "./components/movies/MovieList";

export default function Home() {

  useEffect(() => {
    data('trending movies')
  }, [])

  return (
    <Layout>
      <Box py={2} px={4}>
        <Box width="100%">
          <Box width="100%">
            <Typography
              variant="h5"
              component="h1"
              my={6}
              fontWeight={400}
            >
              Trending
            </Typography>
            <MoviesTrendList />
          </Box>
        </Box>
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
              Recommended for you
            </Typography>
            <MoviesList limit={-8} />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
