import json
import sqlite3

from profesionales.dominio.profesional_d import profesional


def retornar_todos_los_profesionales():
    los_profesionales = []
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute("SELECT * FROM profesional")
    for fila in resultado:
        los_profesionales.append(profesional(fila[1], fila[2]))
    resultado.close()
    conexion.close()
    return to_json(los_profesionales)


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)