import { Persona } from "@/app/Domain/Entities/Persona";
import { IRepositoryPersonas } from "@/app/Domain/Repositories/IRepositoryPersonas";
import { injectable } from "inversify";

@injectable()
export class PersonasRepository implements IRepositoryPersonas{
    getListadoCompletoPersonas(): Persona[] {
        return [
  new Persona(1, "Juan", "Pérez", new Date("1990-01-15"), "Calle 1", "555-1001", "img1.jpg", 1),
  new Persona(2, "María", "Gómez", new Date("1988-03-22"), "Calle 2", "555-1002", "img2.jpg", 2),
  new Persona(3, "Luis", "Ramírez", new Date("1995-07-10"), "Calle 3", "555-1003", "img3.jpg", 3),
  new Persona(4, "Ana", "Torres", new Date("1992-11-05"), "Calle 4", "555-1004", "img4.jpg", 1),
  new Persona(5, "Carlos", "López", new Date("1985-09-18"), "Calle 5", "555-1005", "img5.jpg", 2),
  new Persona(6, "Lucía", "Martínez", new Date("1999-12-01"), "Calle 6", "555-1006", "img6.jpg", 3),
  new Persona(7, "Miguel", "Duarte", new Date("1991-06-07"), "Calle 7", "555-1007", "img7.jpg", 4),
  new Persona(8, "Sofía", "Navarro", new Date("1996-08-19"), "Calle 8", "555-1008", "img8.jpg", 1),
  new Persona(9, "Jorge", "Fernández", new Date("1987-02-14"), "Calle 9", "555-1009", "img9.jpg", 2),
  new Persona(10, "Paula", "Rivas", new Date("1993-10-26"), "Calle 10", "555-1010", "img10.jpg", 3),

  new Persona(11, "Andrés", "Suárez", new Date("1994-04-04"), "Calle 11", "555-1011", "img11.jpg", 4),
  new Persona(12, "Valeria", "Cano", new Date("1998-07-29"), "Calle 12", "555-1012", "img12.jpg", 2),
  new Persona(13, "Diego", "Mendoza", new Date("1989-12-15"), "Calle 13", "555-1013", "img13.jpg", 1),
  new Persona(14, "Florencia", "Silva", new Date("1997-03-30"), "Calle 14", "555-1014", "img14.jpg", 5),
  new Persona(15, "Hernán", "Aguilar", new Date("1986-11-09"), "Calle 15", "555-1015", "img15.jpg", 3),
  new Persona(16, "Camila", "Morales", new Date("1991-05-21"), "Calle 16", "555-1016", "img16.jpg", 4),
  new Persona(17, "Ricardo", "Santos", new Date("1990-09-11"), "Calle 17", "555-1017", "img17.jpg", 2),
  new Persona(18, "Daniela", "Prieto", new Date("1996-01-08"), "Calle 18", "555-1018", "img18.jpg", 1),
  new Persona(19, "Tomás", "Benítez", new Date("1988-06-25"), "Calle 19", "555-1019", "img19.jpg", 5),
  new Persona(20, "Ariana", "Castro", new Date("1994-02-17"), "Calle 20", "555-1020", "img20.jpg", 3),

  new Persona(21, "Sebastián", "Vega", new Date("1992-08-04"), "Calle 21", "555-1021", "img21.jpg", 1),
  new Persona(22, "Julia", "Herrera", new Date("1999-10-20"), "Calle 22", "555-1022", "img22.jpg", 4),
  new Persona(23, "Mateo", "Zúñiga", new Date("1985-03-12"), "Calle 23", "555-1023", "img23.jpg", 2),
  new Persona(24, "Abril", "Campos", new Date("1997-11-27"), "Calle 24", "555-1024", "img24.jpg", 5),
  new Persona(25, "Eduardo", "Pizarro", new Date("1990-01-06"), "Calle 25", "555-1025", "img25.jpg", 3),
  new Persona(26, "Carolina", "Serrano", new Date("1998-04-18"), "Calle 26", "555-1026", "img26.jpg", 1),
  new Persona(27, "Álvaro", "Ponce", new Date("1989-09-02"), "Calle 27", "555-1027", "img27.jpg", 4),
  new Persona(28, "Romina", "Vargas", new Date("1996-12-23"), "Calle 28", "555-1028", "img28.jpg", 2),
  new Persona(29, "Gonzalo", "Correa", new Date("1987-07-16"), "Calle 29", "555-1029", "img29.jpg", 5),
  new Persona(30, "Elena", "Montoya", new Date("1993-05-09"), "Calle 30", "555-1030", "img30.jpg", 3),

  new Persona(31, "Franco", "Soria", new Date("1992-02-13"), "Calle 31", "555-1031", "img31.jpg", 1),
  new Persona(32, "Bianca", "Rivera", new Date("1999-06-28"), "Calle 32", "555-1032", "img32.jpg", 4),
  new Persona(33, "Marcelo", "Quiroz", new Date("1985-10-07"), "Calle 33", "555-1033", "img33.jpg", 2),
  new Persona(34, "Pilar", "Salgado", new Date("1998-01-19"), "Calle 34", "555-1034", "img34.jpg", 5),
  new Persona(35, "Adrián", "Roldán", new Date("1991-09-30"), "Calle 35", "555-1035", "img35.jpg", 3),
  new Persona(36, "Victoria", "Bravo", new Date("1996-04-11"), "Calle 36", "555-1036", "img36.jpg", 1),
  new Persona(37, "Leonardo", "Bustos", new Date("1988-12-02"), "Calle 37", "555-1037", "img37.jpg", 4),
  new Persona(38, "Gabriela", "Salinas", new Date("1997-07-24"), "Calle 38", "555-1038", "img38.jpg", 2),
  new Persona(39, "Hugo", "Valdés", new Date("1989-03-14"), "Calle 39", "555-1039", "img39.jpg", 5),
  new Persona(40, "Marina", "Ruiz", new Date("1994-11-08"), "Calle 40", "555-1040", "img40.jpg", 3),

  new Persona(41, "Alan", "Miranda", new Date("1990-06-05"), "Calle 41", "555-1041", "img41.jpg", 1),
  new Persona(42, "Natalia", "Escobar", new Date("1999-09-17"), "Calle 42", "555-1042", "img42.jpg", 4),
  new Persona(43, "Iván", "Alvarado", new Date("1986-02-01"), "Calle 43", "555-1043", "img43.jpg", 2),
  new Persona(44, "Diana", "Araya", new Date("1995-08-29"), "Calle 44", "555-1044", "img44.jpg", 5),
  new Persona(45, "Esteban", "Oliva", new Date("1992-01-27"), "Calle 45", "555-1045", "img45.jpg", 3),
  new Persona(46, "Nicole", "Garrido", new Date("1997-10-04"), "Calle 46", "555-1046", "img46.jpg", 1),
  new Persona(47, "Benjamín", "Arcos", new Date("1988-05-13"), "Calle 47", "555-1047", "img47.jpg", 4),
  new Persona(48, "Alicia", "Reyes", new Date("1996-12-28"), "Calle 48", "555-1048", "img48.jpg", 2),
  new Persona(49, "Maximiliano", "Ortiz", new Date("1989-07-22"), "Calle 49", "555-1049", "img49.jpg", 5),
  new Persona(50, "Patricia", "Arriaga", new Date("1993-03-03"), "Calle 50", "555-1050", "img50.jpg", 3)]

    }
    
}