from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import datetime

app = Flask(__name__)
CORS(app)

def load_questions():
    filename = "data/question.json"
    if os.path.exists(filename):
        with open(filename, "r") as file:
            questions = json.load(file)[0]["question"]
        return questions
    else:
        return ["Не удалось открыть вопросы."]

def save_responses(user, user_id, responses):
    filename = "data/Ancet.json"
    timestamp = datetime.datetime.now().strftime("%d %m %Y")
    data_to_save = (timestamp, {"user": user["occupation"], "responses": responses})

    if os.path.exists(filename):
        with open(filename, "r") as file:
            data = json.load(file)
    else:
        data = {"edinsts": []}

    institution_found = False
    for institution in data["edinsts"]:
        if institution["edinst"] == user["edinst"]:
            user_found = False
            for u in institution["users"]:
                if u["id"] == user_id:
                    u["data"].append(data_to_save)
                    user_found = True
                    break
            if not user_found:
                institution["users"].append({
                    "id": user_id,
                    "user": user["occupation"],
                    "data": [data_to_save]
                })
            institution_found = True
            break

    if not institution_found:
        data["edinsts"].append({
            "edinst": user["edinst"],
            "users": [{
                "id": user_id,
                "user": user["occupation"],
                "data": [data_to_save]
            }]
        })

    with open(filename, "w") as file:
        json.dump(data, file, indent=2)

@app.route('/api/questions', methods=['GET'])
def get_questions():
    questions = load_questions()
    return jsonify(questions)

@app.route('/api/save_responses', methods=['POST'])
def save_responses_endpoint():
    data = request.json
    user = data['user']
    user_id = data['userId']
    responses = data['responses']
    save_responses(user, user_id, responses)
    return jsonify({"message": "Ответы успешно сохранены!"})

if __name__ == '__main__':
    app.run(debug=True)
