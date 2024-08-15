
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL 
);

SELECT * FROM users;
DROP TABLE users;
CREATE TABLE recipes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    title TEXT NOT NULL,
    creator TEXT NOT NULL,
    image TEXT,
    ingredients TEXT NOT NULL,
    method TEXT NOT NULL,
    additional_instructions TEXT,
    rating INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE recipes;
SELECT * FROM recipes;

CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    recipe_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
    FOREIGN KEY (recipe_id) REFERENCES recipes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);