CREATE TABLE IF NOT EXISTS profesortable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    phone TEXT,
    email TEXT
);
CREATE TABLE IF NOT EXISTS materiatable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    profesor TEXT
);

CREATE TABLE IF NOT EXISTS todotable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT, 
    materia TEXT,
    fecha DATE,
    tipoTodo NUMERIC,    
    notas TEXT,
    foto TEXT
);

INSERT or IGNORE INTO profesortable(id, name,phone,email) VALUES (1, 'Profesor 1', '6181234567','test@gmail.com');
INSERT or IGNORE INTO profesortable(id, name,phone,email) VALUES (2, 'Profesor 2', '6181234567','test@gmail.com');


INSERT or IGNORE INTO materiatable(id, name,profesor) VALUES (1, 'Calculo diferencial', "Juan Perez");
