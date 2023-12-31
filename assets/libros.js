const libros = [
    'Genesis', 
    'Exodo', 
    'Levitico', 
    'Numeros', 
    'Deuteronomio', 
    'Josue', 
    'Jueces', 
    'Rut',
    '1 Samuel', 
    '2 Samuel',
    '1 Reyes', 
    '2 Reyes', 
    '1 Cronicas',
    '2 Cronicas',
    'Esdras',
    'Nehemias',
    'Ester',
    'Job',
    'Salmos',
    'Proverbios',
    'Eclesiastes',
    'Cantar de los Cantares',
    'Isaias',
    'Jeremias',
    'Lamentaciones',
    'Ezequiel',
    'Daniel',
    'Oseas',
    'Joel',
    'Amos',
    'Abdias',
    'Jonas',
    'Miqueas',
    'Nahum',
    'Habacuc',
    'Sofonías',
    'Hageo',
    'Zacarías',
    'Malaquías',
    'Mateo',
    'Marcos',
    'Lucas',
    'Juan',
    'Hechos',
    'Romanos',
    '1 Corintios',
    '2 Corintios',
    'Galatas',
    'Efesios',
    'Filipenses',
    'Colosenses',
    '1 Tesalonicenses',
    '2 Tesalonicenses',
    '1 Timoteo',
    '2 Timoteo',
    'Tito',
    'Filemon',
    'Hebreos',
    'Santiago',
    '1 Pedro',
    '2 Pedro',
    '1 Juan',
    '2 Juan',
    '3 Juan',
    'Judas',
    'Apocalipsis'
];

//funcion buscar libro
function buscarLibro(nombre){
    let index = libros.indexOf(nombre);
    switch (index) {
        case 0:
            return genesis;
        case 1:
            return exodo;
        case 2:
            return levitico;
        case 3:
            return numeros;
        case 4:
            return deuteronomio;
        case 5:
            return josue;
        case 6:
            return jueces;
        case 7:
            return rut;
        case 8:
            return samuel_1;
        case 9:
            return samuel_2;
        case 10:
            return reyes_1;
        case 11:
            return reyes_2;
        case 12:
            return cronicas_1;
        case 13:
            return cronicas_2;
        case 14:
            return esdras;
        case 15:
            return nehemias;
        case 16:
            return ester;
        case 17:
            return job;
        case 18:
            return salmos;
        case 19:
            return proverbios;
        case 20:
            return eclesiastes;
        case 21:
            return cantares;
        case 22:
            return isaias;
        case 23:
            return jeremias;
        case 24:
            return lamentaciones;
        case 25:
            return ezequiel;
        case 26:
            return daniel;
        case 27:
            return oseas;
        case 28:
            return joel;
        case 29:
            return amos;
        case 30:
            return abdias;
        case 31:
            return jonas;
        case 32:
            return miqueas;
        case 33:
            return nahum;
        case 34:
            return habacuc;
        case 35:
            return sofonias;
        case 36:
            return hageo;
        case 37:
            return zacarias;
        case 38:
            return malaquias;
        case 39:
            return mateo;
        case 40:
            return marcos;
        case 41:
            return lucas;
        case 42:
            return juan;
        case 43:
            return hechos;
        case 44:
            return romanos;
        case 45:
            return corintios_1;
        case 46:
            return corintios_2;
        case 47:
            return galatas;
        case 48:
            return efesios;
        case 49:
            return filipenses;
        case 50:
            return colosenses;
        case 51:
            return tesalonicenses_1;
        case 52:
            return tesalonicenses_2;
        case 53:
            return timoteo_1;
        case 54:
            return timoteo_2;
        case 55:
            return tito;
        case 56:
            return filemon;
        case 57:
            return hebreos;
        case 58:
            return santiago;
        case 59:
            return pedro_1;
        case 60:
            return pedro_2;
        case 61:
            return juan_1;
        case 62:
            return juan_2;
        case 63:
            return juan_3;
        case 64:
            return judas;
        case 65:
            return apocalipsis;
      default:
        //console.log("sin coincidencias");
        break;
    }
  }
