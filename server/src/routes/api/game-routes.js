import { Request, Response } from 'express';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/openai';
import dotenv from 'dotenv';
import { Game } from '../../models/game';
dotenv.config();

const openai = process.env.OPENAI_API_KEY;
let model;

if (apiKey) {
    model = new OpenAI(apiKey);
} else {
    console.error('No OpenAI API key found. Please set one in your .env file.');
}

