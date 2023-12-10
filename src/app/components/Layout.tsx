'use client';
import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
    children: ReactNode
}


export default function Layout({ children }: LayoutProps) {
    return (
        <Box
            sx={{
                backgroundColor: "#10141f",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    lg: 'row'
                },
                color: "white",
                padding: 3,
                gap: 3,
                overflowY: "hidden",
                height: "100vh"
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: "100%",
                    overflowY: "auto"
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
