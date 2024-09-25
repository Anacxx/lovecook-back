
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL 
);
CREATE TABLE recipes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    title TEXT NOT NULL,
    creator TEXT NOT NULL,
    image TEXT,
    category TEXT,
    ingredients TEXT NOT NULL,
    method TEXT NOT NULL,
    additional_instructions TEXT,
    total_rating INTEGER,
    average_rating INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    author TEXT NOT NULL,
    recipe_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,  
    FOREIGN KEY (recipe_id) REFERENCES recipes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE favorites (
    user_id TEXT NOT NULL,
    recipe_id TEXT NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);