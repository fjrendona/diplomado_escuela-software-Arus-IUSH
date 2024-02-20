from flask import Flask
from flask_cors import CORS
from proyectos.casos_uso.proyectos_casos_uso import dame_todos_los_proyectos

app = Flask(__name__)

cors = CORS(app)


@app.route("/proyecto", methods=["GET"])
def get_todos_los_proyectos():
    return dame_todos_los_proyectos()
