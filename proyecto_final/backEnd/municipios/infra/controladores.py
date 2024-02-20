from flask import Flask
from flask_cors import CORS
from municipios.casos_uso.municipios_caso_uso import dame_municipios_por_id_departamento

app = Flask(__name__)
cors = CORS(app)


@app.route("/municipio/<id>", methods=["GET"])
def buscar_municipio_por_id_departamento(id):
    return dame_municipios_por_id_departamento(id)
