import { Request, Response } from 'express';
import { ConvaiClient } from "convai-web-sdk"
import { PromptTemplate } from '@langchain/openai';
import dotenv from 'dotenv';

dotenv.config();

const convaiClient = new ConvaiClient({
    apiKey: process.env.CONVAI_API_KEY,
    characterId: string,
    enableAudio: boolean,
    sessionId: string,
    disableAudioGeneration: false,
});
