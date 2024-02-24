from profesionales.infra.repositorio_db import retornar_todos_los_profesionales, adicionar_prof_r, eliminar_prof_r, \
    profesional_por_id, actualizar_prof


def dame_todos_los_profesionales():
    return retornar_todos_los_profesionales()


def crear_nuevo_profesional(TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional):
    return adicionar_prof_r(TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional)


def act_profesional(TipoDoc_idTipoDoc, identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                    CargoProyecto, Salario, TarjetaProfesional):
    return actualizar_prof(TipoDoc_idTipoDoc, identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional)


def dame_profesional_por_id(Identificacion):
    return profesional_por_id(Identificacion)


def eliminar_prof(Identificacion):
    return eliminar_prof_r(Identificacion)
