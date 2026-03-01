const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Se estiver usando Node 18+, o 'fetch' já é nativo, senão use o node-fetch
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // ou o modelo que você usa
              messages: [
            {
                role: "system",
                content: "Você é um assistente que gera código HTML e CSS com base em descrições fornecidas pelo usuário, responda SOMENTE com códigos puro. NUNCA use crase, markdown ou qualquer explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXTAMENTE oque o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            },
            {
                role: "user",
                content: message
            }
        ]
      })
    });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao conectar com a Groq" });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando em https://luccaskoe.github.io/CSS-gerador-com-IA/`));