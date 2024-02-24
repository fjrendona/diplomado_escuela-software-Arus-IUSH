from flask import Flask, request, Response
from flask_cors import CORS
from profesionales.casos_uso.profesionales_casos_uso import dame_todos_los_profesionales, crear_nuevo_profesional, eliminar_prof

app = Flask(__name__)

cors = CORS(app)


@app.route("/profesional", methods=["GET"])
def get_todos_los_profesionales():
    return dame_todos_los_profesionales()


@app.route("/profesional", methods=["POST"])
def adicionar_profesionales():
    request_data = request.get_json()

    TipoDoc_idTipoDoc = request_data['TipoDoc_idTipoDoc']
    Identificacion = request_data['Identificacion']
    Nombre = request_data['Nombre']
    Direccion = request_data['Direccion']
    FechaNacimiento = request_data['FechaNacimiento']
    Telefono = request_data['Telefono']
    Email = request_data['Email']
    CargoProyecto = request_data['CargoProyecto']
    Salario = request_data['Salario']
    TarjetaProfesional = request_data['TarjetaProfesional']

    crear_nuevo_profesional(TipoDoc_idTipoDoc, Identificacion, Nombre,
                            Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional)

    return Response(
        status=201
    )


@app.route("/profesional/<Identificacion>", methods=["DELETE"])
def eliminar_profesional(Identificacion):
    eliminar_prof(Identificacion)

    return Response(
        status=204
    )
