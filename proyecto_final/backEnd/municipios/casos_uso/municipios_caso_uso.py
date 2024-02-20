from municipios.infra.repositorio_db import municipio_por_id_dep
def dame_municipios_por_id_departamento(id):
    return municipio_por_id_dep(id)