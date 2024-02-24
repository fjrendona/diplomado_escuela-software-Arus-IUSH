import json
import sqlite3

from tipoDoc.dominio.tipoDoc_d import Doc


def retornar_tipoDoc():
    los_tipoDoc = []
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute("SELECT * FROM tipodoc")
    for fila in resultado:
        los_tipoDoc.append(Doc(fila[0], fila[1]))
    resultado.close()
    conexion.close()
    return to_json(los_tipoDoc)


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)
