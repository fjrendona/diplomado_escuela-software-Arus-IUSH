from flask import Flask
from flask_cors import CORS
from tipoDoc.casos_uso.tipoDoc_casos_uso import dame_tipoDoc

app = Flask(__name__)
cors = CORS(app)


@app.route("/tipoDoc", methods=["GET"])
def get_tipoDoc():
    return dame_tipoDoc()