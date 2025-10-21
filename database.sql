CREATE TABLE users
(
    id SERIAL NOT NULL,
    uuid character varying(10) COLLATE pg_catalog."default",
    name character varying(15) COLLATE pg_catalog."default",
    email character varying(30) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

CREATE TABLE ingredients(
	ingredient_id SERIAL PRIMARY KEY,
	ingredient_name VARCHAR(25),
	recipe_id SERIAL REFERENCES recipes(recipe_id),
	quantity VARCHAR(25)	
)


CREATE TABLE instructions(
	instruction_id SERIAL PRIMARY KEY,
	instruction VARCHAR(255),
	recipe_id SERIAL REFERENCES recipes(recipe_id)	
)

CREATE TABLE recipes
(
    recipe_id integer NOT NULL DEFAULT nextval('recipes_recipe_id_seq'::regclass),
    recipe_name character varying(25) COLLATE pg_catalog."default",
    user_id integer NOT NULL DEFAULT nextval('recipes_user_id_seq'::regclass),
    dish_type character varying(7) COLLATE pg_catalog."default",
    CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id),
    CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

