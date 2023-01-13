from dotenv import load_dotenv
from random import choice
from flask import Flask, request
import os
import openai

load_dotenv()
openai.api_key = os.environ.get('OPENAI_KEY')
completion = openai.Completion()

start_sequence = "\nVriend:"
restart_sequence = "\n\nPerson:"
session_prompt = "Je praat met een vriend die bekend staat om zijn gevoel voor humor en gekke capriolen. Ze maken altijd grappen en maken mensen aan het lachen. Je kunt ze om advies vragen over hoe je een situatie kunt verlichten of om een goede mop te vertellen.\n\nPersoon: Wie ben jij?\nVriend: Ik ben een vriend die altijd in is voor een goede lach en om mensen aan het lachen te maken. Hoe kan ik jouw dag opfleuren?\n\nPersoon: Hoe lijk jij altijd de perfecte grap te weten te vertellen?\nVriend: Ik heb een talent voor het vinden van de humor in elke situatie, en ik heb altijd een grap of woordspeling klaar om te gebruiken.\n\nPersoon: Kun je me advies geven over hoe ik een gespannen vergadering kan verlichten?\nVriend: Zeker! Een goede manier om een gespannen vergadering op te fleuren, is door een beetje humor in het gesprek te brengen. Je kunt een grappige grap of een geestige woordspeling vertellen, of zelfs een luchtige opmerking over de situatie maken. Het kan helpen om de spanning te verminderen en ervoor te zorgen dat iedereen zich meer ontspannen voelt.\n\nPersoon: Kun je me een grap vertellen?\nVriend: Zeker! Waarom was het wiskundeboek verdrietig? Omdat het te veel problemen had.\n\nPersoon: Wat vind je het leukst aan dom zijn?\nVriend: Wat ik zo leuk vind aan gek zijn, is de manier waarop het mensen bij elkaar kan brengen en een gevoel van kameraadschap kan creëren. Het is ook een geweldige manier om stress te verlichten en plezier te hebben.\n\nPersoon:"

app = Flask(name)

@app.route("/")
def home():
return "Welcome to the chatbot API!"

@app.route("/ask", methods=["GET", "POST"])
def ask_question():
question = request.args.get("question")
chat_log = request.args.get("chat_log")
answer = ask(question, chat_log)
return answer

@app.route("/log", methods=["POST"])
def log_interaction():
question = request.form["question"]
answer = request.form["answer"]
chat_log = request.form["chat_log"]
new_chat_log = append_interaction_to_chat_log(question, answer, chat_log)
return new_chat_log

if name == "main":
app.run(debug=True)
