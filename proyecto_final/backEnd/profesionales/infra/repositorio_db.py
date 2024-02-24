import json
import sqlite3

from profesionales.dominio.profesional_d import profesional, busqueda_profesional


def retornar_todos_los_profesionales():
    los_profesionales = []
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute("SELECT * FROM profesional")
    for fila in resultado:
        los_profesionales.append(busqueda_profesional(fila[0], fila[1], fila[2], fila[3], fila[4], fila[5], fila[6], fila[7], fila[8], fila[9]))
    resultado.close()
    conexion.close()
    return to_json(los_profesionales)


def adicionar_prof_r(TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                     CargoProyecto, Salario, TarjetaProfesional):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    sql = (f"INSERT INTO profesional VALUES('{TipoDoc_idTipoDoc}',"
           f"'{Identificacion}','{Nombre}', '{Direccion}','{FechaNacimiento}',"
           f"'{Telefono}','{Email}','{CargoProyecto}','{Salario}','{TarjetaProfesional}')")
    try:
        resultado = conexion.execute(sql)
        conexion.commit()
        resultado.close()
        conexion.close()
        respuesta = 201
    except sqlite3.Error:
        respuesta = 400
    return to_json(respuesta)


def profesional_por_id(Identificacion):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute(f"SELECT * FROM profesional WHERE Identificacion = {Identificacion}").fetchone()
    conexion.close()
    if resultado:
        return busqueda_profesional(resultado[0], resultado[1], resultado[2], resultado[3], resultado[4], resultado[5],
                                    resultado[6],
                                    resultado[7], resultado[8],
                                    resultado[9])  # Suponiendo que la posición 1 y 2 son los campos necesarios
    else:
        return None


def eliminar_prof_r(Identificacion):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute(f"DELETE FROM profesional WHERE Identificacion = '{Identificacion}'")
    conexion.commit()
    resultado.close()
    conexion.close()


def actualizar_prof(TipoDoc_idTipoDoc, identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                    CargoProyecto, Salario, TarjetaProfesional):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    sql = (f"UPDATE profesional SET TipoDoc_idTipoDoc = '{TipoDoc_idTipoDoc}',"
           f"Nombre = '{Nombre}', Direccion = '{Direccion}', FechaNacimiento = '{FechaNacimiento}',"
           f"Telefono = '{Telefono}', Email = '{Email}', CargoProyecto = '{CargoProyecto}',"
           f"Salario = '{Salario}', TarjetaProfesional = '{TarjetaProfesional}'"
           f"WHERE Identificacion = '{identificacion}'")
    resultado = conexion.execute(sql)
    conexion.commit()
    resultado.close()
    conexion.close()


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)
