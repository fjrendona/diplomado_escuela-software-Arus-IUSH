import json
import sqlite3
from municipios.dominio.municipio_d import municipio

def municipio_por_id_dep(id):
    mun = []

    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute(f"SELECT idMunicipio, NombreMunicipio FROM municipios WHERE Departamentos_idDepartamentos = '36bfb4ee-f191-4104-ac04-23fd12db169d'")
    for fila in resultado:
        mun.append(municipio(fila[0], fila[1]))
    resultado.close()
    conexion.close()
    return to_json(mun)

def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)
