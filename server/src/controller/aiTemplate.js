import { type Request, type Response } from 'express';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import dotenv from 'dotenv';

dotenv.config();

const openai = process.env.OPENAI_API_KEY;
let model: OpenAI;

if (openai) {

    model = new OpenAI(openai);
} else {
    console.error('No OpenAI API key found. Please set one in your .env file.');
}
const promptTemplate = new PromptTemplate ('you are a a DND DM and you are guiding a story for your players you are not allow to break your character and you need to keep narrating the story');




const aiTemplate = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const promptTemplate = new PromptTemplate(prompt);
    const response = await model.complete(promptTemplate);
    const outputParser = new StructuredOutputParser(response);
    const output = outputParser.parse();

    res.json(output);
};

