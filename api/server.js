import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { userQuery, systemPrompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Chave da API do Gemini não encontrada no servidor.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const fullPrompt = `${systemPrompt}\n\n${userQuery}`;
    const payload = { contents: [{ parts: [{ text: fullPrompt }] }] };

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
        const errorBody = await geminiResponse.text();
        console.error('Erro da API Gemini:', errorBody);
        return res.status(geminiResponse.status).json({ error: 'Erro ao se comunicar com a API do Gemini.', details: errorBody });
    }
    
    const data = await geminiResponse.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
}