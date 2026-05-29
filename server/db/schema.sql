CREATE table users(
	user_id BIGSERIAL PRIMARY KEY,
	name TEXT,
	email TEXT,
	password_hash TEXT
);
CREATE table recipes(
	user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
	recipe_id BIGSERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	difficulty TEXT CONSTRAINT valid_difficulty CHECK (difficulty IN ('easy','medium','difficult')),
	prep_time INTEGER CONSTRAINT positive_prep_time CHECK(prep_time>0),
	cook_time INTEGER CONSTRAINT positive_cook_time CHECK(cook_time>0),
	source TEXT,
	image_url TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 
CREATE TABLE instructions(
recipe_id BIGINT NOT NULL REFERENCES recipes(recipe_id) ON DELETE CASCADE,
instruction_id BIGSERIAL PRIMARY KEY,
step_number INTEGER NOT NULL,
instruction TEXT
);

CREATE TABLE ingredients(
ingredient_id BIGSERIAL PRIMARY KEY,
name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE recipe_ingredients(
recipe_id BIGINT REFERENCES recipes (recipe_id) ON DELETE CASCADE,
ingredient_id BIGINT REFERENCES ingredients(ingredient_id),
quantity TEXT,
PRIMARY KEY (recipe_id,ingredient_id)
)