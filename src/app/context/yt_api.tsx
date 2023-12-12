'use client';
import axios from "axios";
const API = process.env.NEXT_PUBLIC_YT_API

const youtubeAPI = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        part: "snippet",
        maxResults: 50,
        key: API
    },
    headers: {}
});

const ytDataAPI = async (keyword: string) => {
    try {
        const res = await youtubeAPI.get('/search', {
            params: {
                q: keyword
            }
        })

        return res.data
    } catch (error: any) {
        console.log(error.message)
    }
}

export { ytDataAPI };
