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
    tipoTarea NUMERIC,
    tipoExamen TEXT,
    notas TEXT
);

INSERT or IGNORE INTO profesortable(id, name,phone,email) VALUES (1, 'Test 1', '6181234567','test@gmail.com');
INSERT or IGNORE INTO profesortable(id, name,phone,email) VALUES (2, 'Test 2', '6181234567','test@gmail.com');


INSERT or IGNORE INTO materiatable(id, name,profesor) VALUES (1, 'Calculo diferencial', "Juan Perez");
