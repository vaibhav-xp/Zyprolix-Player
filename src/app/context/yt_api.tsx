'use client';
import axios from "axios";
const API = process.env.NEXT_PUBLIC_YT_API

// export const fetchVideos = createAsyncThunk('fetchVideos', async (keyword) => {
//     console.log(keyword)
//     const response = await youtubeAPI.get("/search", {
//         params: {
//             q: keyword
//         }
//     });
//     return response.data.pageInfo.totalResults; // Use response.data.items to get the videos
// });

const youtubeAPI = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        part: "snippet",
        maxResults: 8,
        key: API
    },
    headers: {}
});

const data = async (keyword: string) => {
    try {
        const res = await youtubeAPI.get('/search', {
            params: {
                q: keyword
            }
        })
        // const res = await youtubeAPI.get('/videoCategories')
        console.log(res.data)
        return res.data
    } catch (error) {
        // console.log(error.message)
        console.log("hello")
    }
}

export { youtubeAPI, data };
