const express = require('express');
const news = express.Router();
const axios = require('axios');
const cors = require('cors');

const app = express(); // Express 앱 생성
app.use(cors());// CORS 미들웨어 추가

// localhost:4000/news
// localhost:4000/news/section?s=culture

//국내 API
news.get('/', async function (req,res){
    try {
        const api = await axios.get(`https://api-v2.deepsearch.com/v1/articles?&api_key=d5ba36f176854710896bcdfb40a9f2a8`);
        res.json(api.data);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// 카테고리별 API
news.get('/section', async function (req,res){
    const { m, s } = req.query;
    if (!m || !s) {
        return res.status(400).json({ error: 'Missing query parameters: m and s are required' });
    }
    try {
        const api = await axios.get(`https://api-v2.deepsearch.com/v1/${m}/${s}?api_key=d5ba36f176854710896bcdfb40a9f2a8`);
        console.log(api.data);
        res.json(api.data);
    } catch (error) {
        console.error("Error fetching section articles:", error);
        res.status(500).json({ error: 'Failed to fetch section articles' });
    }
});

// 검색어별 API
news.get('/search', async function (req,res){
    const { keyword } = req.query; // 검색어 파라미터 추가
    try {
        const api = await axios.get(`https://api-v2.deepsearch.com/v1/articles?keyword=${keyword}&api_key=d5ba36f176854710896bcdfb40a9f2a8`);
        res.json(api.data);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

//해외 API
news.get('/global', async function (req,res){
    try {
        const api = await axios.get(`https://api-v2.deepsearch.com/v1/global-articles?&api_key=d5ba36f176854710896bcdfb40a9f2a8`);
        res.json(api.data);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});



module.exports = news;

