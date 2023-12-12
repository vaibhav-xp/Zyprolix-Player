'use client';
import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image';
import { Logout } from '@mui/icons-material';
import { useSearchContext } from '../context/gloablConext';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../context/firebase';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { user, setUser, setApiRequestCounter, setBookmark, setHistory } = useSearchContext();
    const router = useRouter()

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(undefined);
            router.push('/')
            setApiRequestCounter(0)
            setBookmark([])
            setHistory([])
        } catch (error: any) {
            throw new Error(error.message)
        }
    };


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
                height: "100vh",
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: "100%",
                    overflowY: "auto",
                    pb: 6
                }}
            >
                {user &&
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            position: 'absolute',
                            right: '50%',
                            top: '10px',
                            transform: 'translateX(50%)',
                            zIndex: 9999,
                            background: "#10141f",
                            padding: "0 10px 10px 10px",
                            borderRadius: "10px"
                        }}
                    >
                        <Image
                            priority
                            src={user?.img}
                            width={20}
                            height={20}
                            alt="profile"
                            style={{
                                borderRadius: '100%'
                            }}
                        />
                        <Box component={'span'}>{user?.name}</Box>
                        <Logout
                            sx={{
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'cyan'
                                },
                                "&:active": {
                                    transform: "scale(0.9)"
                                }
                            }}
                            onClick={() => logout()}
                        />
                    </Box>}
                {children}
            </Box>
        </Box>
    )
}
