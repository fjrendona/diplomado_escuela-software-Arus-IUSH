from flask import Flask, request, Response
from flask_cors import CORS
from contratos.casos_uso.contratos_casos_uso import crear_nuevo_contrato, eliminar_cont, dame_todos_los_contratos

app = Flask(__name__)

cors = CORS(app)


@app.route("/contrato", methods=["GET"])
def get_todos_los_contratos():
    return dame_todos_los_contratos()

@app.route("/contrato", methods=["POST"])
def adicionar_contratos():
    request_data = request.get_json()

    idContrato = request_data['idContrato']
    FechaInicio = request_data['FechaInicio']
    FechaFin = request_data['FechaFin']
    ObjetoContrato = request_data['ObjetoContrato']
    ValorContrato = request_data['ValorContrato']
    Profesional_Identificacion = request_data['Profesional_Identificacion']
    Proyectos_idProyecto = request_data['Proyectos_idProyecto']

    crear_nuevo_contrato(idContrato, FechaInicio, FechaFin, ObjetoContrato, ValorContrato, Profesional_Identificacion, Proyectos_idProyecto)

    return Response(
        status=201
    )


@app.route("/contrato/<idContrato>", methods=["DELETE"])
def eliminar_contrato(idContrato):
    eliminar_cont(idContrato)

    return Response(
        status=204
    )