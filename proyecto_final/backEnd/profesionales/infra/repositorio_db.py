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


def adicionar_prof_r(TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                     CargoProyecto, Salario, TarjetaProfesional):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    sql = (f"INSERT INTO profesional VALUES('{TipoDoc_idTipoDoc}',"
           f"'{Identificacion}','{Nombre}', '{Direccion}','{FechaNacimiento}',"
           f"'{Telefono}','{Email}','{CargoProyecto}','{Salario}','{TarjetaProfesional}')")
    resultado = conexion.execute(sql)
    conexion.commit()
    resultado.close()
    conexion.close()


def eliminar_prof_r(Identificacion):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute(f"DELETE FROM profesional WHERE Identificacion = '{Identificacion}'")
    conexion.commit()
    resultado.close()
    conexion.close()


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)
