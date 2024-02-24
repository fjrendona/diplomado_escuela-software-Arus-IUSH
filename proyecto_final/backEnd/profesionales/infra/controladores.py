import json

from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from profesionales.casos_uso.profesionales_casos_uso import dame_todos_los_profesionales, crear_nuevo_profesional, \
    eliminar_prof, dame_profesional_por_id, act_profesional

app = Flask(__name__)

cors = CORS(app)


@app.route("/profesional", methods=["GET"])
def get_todos_los_profesionales():
    return dame_todos_los_profesionales()


@app.route("/profesional", methods=["POST"])
def adicionar_profesionales():
    request_data = request.get_json()

    TipoDoc_idTipoDoc = request_data['tipoDocumento']
    Identificacion = request_data['documento']
    Nombre = request_data['nombreCompleto']
    Direccion = request_data['direccion']
    FechaNacimiento = request_data['fechaNacimiento']
    Telefono = request_data['telefono']
    Email = request_data['email']
    CargoProyecto = request_data['cargoProyecto']
    Salario = request_data['salario']
    TarjetaProfesional = request_data['tarjetaProfesional']

    crear_nuevo_profesional(TipoDoc_idTipoDoc, Identificacion, Nombre,
                            Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional)

    return Response(
        status=201
    )


@app.route("/profesional/<Identificacion>", methods=["GET"])
def buscar_profesional_por_id(Identificacion):
    profesional = dame_profesional_por_id(Identificacion)
    print(profesional)
    if profesional:
        return jsonify(profesional.__dict__)
    else:
        return Response(
            response=json.dumps({'error': 'Profesional no encontrado'}),
            status=404,
            mimetype='application/json'
        )


@app.route("/profesional/<Identificacion>", methods=["DELETE"])
def eliminar_profesional(Identificacion):
    eliminar_prof(Identificacion)

    return Response(
        status=204
    )


@app.route("/profesional/<int:identificacion>", methods=["PUT"])
def actualizar_profesional(identificacion):
    request_data = request.get_json()
    print(f"Respuesta {request_data}")
    TipoDoc_idTipoDoc = request_data['TipoDoc_idTipoDoc']
    Nombre = request_data['Nombre']
    Direccion = request_data['Direccion']
    FechaNacimiento = request_data['FechaNacimiento']
    Telefono = request_data['Telefono']
    Email = request_data['Email']
    CargoProyecto = request_data['CargoProyecto']
    Salario = request_data['Salario']
    TarjetaProfesional = request_data['TarjetaProfesional']

    act_profesional(TipoDoc_idTipoDoc, identificacion, Nombre,
                    Direccion, FechaNacimiento, Telefono, Email,
                    CargoProyecto, Salario, TarjetaProfesional)

    return Response(
        status=205
    )