from flask import Flask
from departamentos.casos_uso.departamentos_casos_uso import dame_todos_los_departamentos
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app)


@app.route("/departamento", methods=["GET"])
def get_todos_los_departamentos():
    return dame_todos_los_departamentos()
