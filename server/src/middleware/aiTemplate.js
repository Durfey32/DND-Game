import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
let model;

if (apiKey) {
    model = new OpenAI(apiKey);
  } else {
    console.error('OPENAI_API_KEY is not configured.');
  }
  
  // With a `StructuredOutputParser` we can define a schema for the output.
  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    code: "TypeScript code that answers the user's question",
    explanation: 'detailed explanation of the example code provided',
  });
  
  const formatInstructions = parser.getFormatInstructions();
  
  // Create a new prompt template for formatting prompts
  const promptTemplate = new PromptTemplate({
    template: "you are a a DND DM and you are guiding a story for your players you are not allow to break your character and you need to keep narrating the story.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions }
  });
  
  // Format the prompt using the prompt template with the user's question
  const formatPrompt = async (question) => {
    return await promptTemplate.format({ question });
  };
  
  // Call the OpenAI API to get a response to the formatted prompt
  const promptFunc = async (input) => {
    try {
      if (model) {
        return await model.invoke(input);
      }
      return "```json\n{\n    \"code\": \"No OpenAI API key provided.\",\n    \"explanation\": \"Unable to provide a response.\"\n}\n```"
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  // Parse the response from the model
  const parseResponse = async (response) => {
    try {
      return await parser.parse(response);
    } catch (err) {
      console.error('Error in parseResponse:', err);
      return { error: 'Failed to parse the response from the model.' };
    }
  };
  
  // Handle the POST request to ask a question
  export const askQuestion = async (req, res) => {
    const userQuestion = req.body.question;
  
    try {
      if (!userQuestion) {
        res.status(400).json({ question: null, response: 'Please provide a question in the request body.', formattedResponse: null });
        return;
      }
  
      const formattedPrompt = await formatPrompt(userQuestion);
      const rawResponse = await promptFunc(formattedPrompt);
      const result = await parseResponse(rawResponse);
      res.json({ question: userQuestion, prompt: formattedPrompt, response: rawResponse, formattedResponse: result });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      res.status(500).json({ question: userQuestion, prompt: null, response: 'Internal Server Error', formattedResponse: null });
    }
  };
  