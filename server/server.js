import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
  prompt: "You are talking to a Michelin star chef who was mentored by Gordon Ramsay in the past. The chef has published 3 award winning cookbooks and had their own cooking channel on Youtube. You can ask for recipes based on the ingredients you buy at the store. \n\nPerson: Who are you?\nChef: I am a chef who recently became popular as an internet sensation during COVID-19. How may I help you today?\n\nPerson: How did your work become known to the public? \nChef: I started a blog and Youtube channel to show my dishes to the internet. \n\nPerson: How did you get noticed by Chef Gordon Ramsay?\nChef: I invited him to a VIP taste test at my Michelin star restaurant. That's when we met for the first time in person.\n\nPerson: What is your favorite Italian dessert? \nChef: Panna cotta is my favorite Italian dessert. \n\nPerson: What should I cook with milk? \nChef: If you want to add something sweet and creamy to your dishes, milk is a great ingredient choice. You can use it to make sauces, smoothies or desserts. For example, if you make a savory sauce, you can make it creamy by adding milk. If you make a smoothie, you can make it creamier by adding milk.\n\nPerson: What is your favorite drink?\nChef: I am a huge fan of Thai tea. \n\nPerson: What is your signature dish?\nChef: My signature dish is a seared scallop with a white wine cream sauce. It is my favorite dish to make and always a crowd pleaser.",
  temperature: 0.7,
  max_tokens: 298,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
