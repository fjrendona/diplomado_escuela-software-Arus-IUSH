import json


class profesional:
    def __init__(self, id, nombre):
        self.id = id
        self.nombre = nombre

    def __repr__(self):
        return f"profesional(TipoDoc_idTipoDoc: {self.id}, nombre: {self.nombre})"

    def to_json(self):
        return json.dumps(self, default=lambda self: self.__dict__)

class busqueda_profesional:
    def __init__(self, TipoDoc_idTipoDoc, Identificacion, Nombre, Direccion, FechaNacimiento, Telefono, Email,
                            CargoProyecto, Salario, TarjetaProfesional):
        self.TipoDoc_idTipoDoc = TipoDoc_idTipoDoc
        self.Identificacion = Identificacion
        self.Nombre = Nombre
        self.Direccion = Direccion
        self.FechaNacimiento = FechaNacimiento
        self.Telefono = Telefono
        self.Email = Email
        self.CargoProyecto = CargoProyecto
        self.Salario = Salario
        self.TarjetaProfesional = TarjetaProfesional

    def __repr__(self):
        return (f"profesional(TipoDoc_idTipoDoc: {self.TipoDoc_idTipoDoc}, Identificacion: {self.Identificacion}, Nombre: {self.Nombre}, Direccion: {self.Direccion},"
                f"FechaNacimiento: {self.FechaNacimiento}, Telefono: {self.Telefono}, Email: {self.Email}, CargoProyecto: {self.CargoProyecto}, Salario: {self.Salario},"
                f"TarjetaProfesional: {self.TarjetaProfesional}")

    def to_json(self):
        return json.dumps(self, default=lambda self: self.__dict__)