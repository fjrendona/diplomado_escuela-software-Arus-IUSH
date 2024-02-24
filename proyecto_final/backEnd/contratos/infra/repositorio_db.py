import json
import sqlite3

from contratos.dominio.contrato_d import contrato


def retornar_todos_los_contratos():
    los_contratos = []
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute("SELECT * FROM contratos")
    for fila in resultado:
        los_contratos.append(contrato(fila[0], fila[3]))
    resultado.close()
    conexion.close()
    return to_json(los_contratos)


def adicionar_cont_r(idContrato, FechaInicio, FechaFin, ObjetoContrato, ValorContrato, Profesional_Identificacion,
                     Proyectos_idProyecto):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    sql = (
        f"INSERT INTO contratos VALUES('{idContrato}','{FechaInicio}','{FechaFin}', '{ObjetoContrato}','{ValorContrato}',"
        f"'{Profesional_Identificacion}','{Proyectos_idProyecto}')")
    resultado = conexion.execute(sql)
    conexion.commit()
    resultado.close()
    conexion.close()


def eliminar_cont_r(idContrato):
    conexion = sqlite3.connect('../../share/infra/fundacaqueta.db')
    resultado = conexion.execute(f"DELETE FROM contratos WHERE idContrato = '{idContrato}'")
    conexion.commit()
    resultado.close()
    conexion.close()


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)
