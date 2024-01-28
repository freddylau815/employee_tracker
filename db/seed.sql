USE company_db;

INSERT INTO departments (name) VALUES
    (Production),
    (Creative),
    (Marketing);

INSERT INTO roles (title, salary, department_id) VALUES 
    (Producer, $250,000, 1),
    (Director, $100,000, 1),
    (Production Assistant, $61,500, 1),
    (Writer, $75,000, 2),
    (Videographer, $69,000, 2),
    (Editor, $62,000, 2),
    (Senior Marketer, $85,000, 3),
    (Marketing Strategist, $72,000, 3),
    (Publicist, $65,500, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    (Alice Smith, 1, NULL)
    (Bob Johnson, 2, 1)
    (Carol Williams, 3, 1)
    (David Brown, 4, 1)
    (Emily Jones, 4, 1)
    (Frank Davis, 5, 2)
    (Grace Taylor, 6, 1)
    (Henry Martinez, 7, NULL)
    (Irene Rodriguez, 8, 7)
    (Jack Wilson, 9, 7)
    (Kelly Garcia, 9, 7)
    (Liam Miller, 5, 2)
    (Megan Anderson, 5, 2)
    (Nathan Thomas, 6, 1)
    (Olivia Hernandez, 8, 7)