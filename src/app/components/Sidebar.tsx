'use client';
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Bookmark, Explore, History, LocalMovies, Tv } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { Box, Hidden, Typography } from '@mui/material';
import Link from 'next/link';

const navLinks = [
    {
        name: "Home",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        name: "Explore",
        icon: <Explore />,
        link: "/explore"
    },
    {
        name: "Movies",
        icon: <LocalMovies />,
        link: "/movies"
    },
    {
        name: "Tv Series",
        icon: <Tv />,
        link: "/tv-series"
    },
    {
        name: "Bookmarks",
        icon: <Bookmark />,
        link: "/bookmarks"
    },
    {
        name: "History",
        icon: <History />,
        link: "/history"
    },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <Box
            sx={{
                backgroundColor: "#161d2f",
                my: {
                    xs: 2,
                    lg: 0
                },
                padding: 0,
                borderRadius: 2,
                display: "flex",
                flexDirection: {
                    xs: "row",
                    lg: "column"
                },
                alignItems: "center",

                width: {
                    sm: "100%",
                    lg: 200
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        sx: "row",
                        lg: "column"
                    },
                    gap: 5,
                    alignItems: {
                        xs: "center",
                        ls: "start",
                    },
                    justifyContent: "center",
                    width: "100%",
                    px: {
                        sx: 0,
                        lg: 8
                    }
                }}
            >
                <Hidden smDown>
                    <Typography
                        variant='h5'
                        component="h1"
                        my={2}
                        fontWeight={600}
                        fontSize="30px"
                    >
                        Zyprolix
                    </Typography>
                </Hidden>
                <Box
                    sx={{
                        py: {
                            xs: "0px",
                            ls: "16px"
                        },
                        display: "flex",
                        flexDirection: {
                            xs: 'row',
                            lg: 'column'
                        },
                        gap: 4
                    }}
                >
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            style={{ textDecoration: "none" }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    py: {
                                        xs: 2,
                                        lg: 0
                                    },
                                    gap: 2,
                                    color: `${pathname === item.link
                                        ? "cyan" : "white"
                                        }`,
                                    textDecoration: "none"
                                }}
                            >
                                {item.icon}
                                <Hidden lgDown>
                                    <Typography>{item.name}</Typography>
                                </Hidden>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
