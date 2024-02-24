from profesionales.infra.repositorio_db import retornar_todos_los_profesionales, adicionar_prof_r, eliminar_prof_r


def dame_todos_los_profesionales():
    return retornar_todos_los_profesionales()


def crear_nuevo_profesional(TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional):
    return adicionar_prof_r(TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional)

def eliminar_prof(Identificacion):
    return eliminar_prof_r(Identificacion)