from flask import Flask
from flask_cors import CORS
from profesionales.casos_uso.profesionales_casos_uso import dame_todos_los_profesionales

app = Flask(__name__)

cors = CORS(app)


@app.route("/profesional", methods=["GET"])
def get_todos_los_profesionales():
    return dame_todos_los_profesionales()
