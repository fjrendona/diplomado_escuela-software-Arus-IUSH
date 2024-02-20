import json
import sqlite3

from departamentos.dominio.departamento_d import departamento


def retornar_todos_los_departamentos():
    los_departamentos = []
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute("SELECT * FROM departamentos")
    for fila in resultado:
        los_departamentos.append(departamento(fila[0], fila[1]))
    resultado.close()
    conexion.close()
    return to_json(los_departamentos)


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)
