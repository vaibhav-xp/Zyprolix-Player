import { Box } from '@mui/material';
import Layout from '@/app/components/Layout';

interface ParamsProps {
    _id: string;
}

export default function Page({ params }: { params: ParamsProps }) {
    return (
        <Layout>
            <Box
                sx={{
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
                        lg: 0,
                    },
                }}
            >
                <iframe
                    src={`https://www.youtube.com/embed/${params._id}`}
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
        </Layout>
    );
}
