import json
import sqlite3

from proyectos.dominio.proyecto_d import proyecto


def retornar_todos_los_proyectos():
    los_proyectos = []
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute("SELECT * FROM proyectos")
    for fila in resultado:
        los_proyectos.append(proyecto(fila[0], fila[1]))
    resultado.close()
    conexion.close()
    return to_json(los_proyectos)


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)