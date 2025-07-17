
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",        
  apiKey: process.env.openrouterkey,       
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",      
    "X-Title": "learning-tracker"
  }
});

module.exports = openai;
