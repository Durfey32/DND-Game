import { Request, Response } from 'express';
import { ConvaiClient } from "convai-web-sdk"
import dotenv from 'dotenv';3
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
const openai = new OpenAIApi(configuration);

const convaiClient = new ConvaiClient({
    apiKey: process.env.CONVAI_API_KEY,
    characterId: "your-character-id",
    enableAudio: false,
    sessionId: "your-session-id",
    disableAudioGeneration: true,
    });

app.post('/generate-character', async (req, res) => {
    try {
        const { name, characterType } = req.body;
        const prompt = `Generate a detailed character profile for a ${characterType} named ${name} in a Dungeons and Dragons-like fantasy world.`;
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            maxTokens: 150,
    });

    const characterDescription = completion.data.choices[0].text.trim();

    res.json({ name, characterType, description: characterDescription });
    } catch (err) {
        console.error('Error in generateCharacter:', err);
        res.status(500).json({ error: 'Failed to generate character profile.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;



