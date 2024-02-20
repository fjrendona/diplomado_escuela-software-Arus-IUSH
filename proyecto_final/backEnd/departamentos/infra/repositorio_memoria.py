import json
from departamentos.dominio.departamento_d import departamento

los_departamentos = [
    departamento("7aaededd-cf95-47e6-9638-e345a7719f07", "Antioquia"),
    departamento("d8ee762a-5f7d-4dcb-91be-f78ab360cf3a", "Atlantico"),
    departamento("184ba116-97ed-4241-9a35-60a6c87448fb", "Amazonas"),
    departamento("fedb3a48-2a33-432d-aca8-be23866bfdba", "Bolivar"),
    departamento("db8eeb15-2c8d-4968-8b1c-47e9ef9a1179", "Boyaca")
]
def retornar_todos_los_departamentos():
    return to_json(los_departamentos)

def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)