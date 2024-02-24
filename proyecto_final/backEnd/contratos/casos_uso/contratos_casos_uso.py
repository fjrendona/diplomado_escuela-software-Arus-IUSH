from contratos.infra.repositorio_db import adicionar_cont_r, eliminar_cont_r, retornar_todos_los_contratos

def dame_todos_los_contratos():
    return retornar_todos_los_contratos()

def crear_nuevo_contrato(idContrato, FechaInicio, FechaFin, ObjetoContrato, ValorContrato, Profesional_Identificacion, Proyectos_idProyecto):
    return adicionar_cont_r(idContrato, FechaInicio, FechaFin, ObjetoContrato, ValorContrato, Profesional_Identificacion, Proyectos_idProyecto)

def eliminar_cont(idContrato):
    return eliminar_cont_r(idContrato)