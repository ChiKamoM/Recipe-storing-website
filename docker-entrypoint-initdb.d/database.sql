
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL NOT NULL ,
    uuid character varying(10),
    name character varying(15) ,
    email character varying(30),
    password character varying(255) ,
    account_role character varying(5),
    access character varying(6),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS recipes
(
    recipe_id SERIAL NOT NULL,
    recipe_name character varying(100) ,
    user_id integer NOT NULL,
    dish_type character varying(7),
    CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id),
    CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS ingredients
(
    ingredient_id SERIAL,
    ingredient_name character varying(25),
    recipe_id integer ,
    quantity character varying(25),
    CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id),
    CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE

);


CREATE TABLE IF NOT EXISTS instructions
(
    instruction_id SERIAL ,
    instruction character varying(255),
    recipe_id integer,
    CONSTRAINT instructions_pkey PRIMARY KEY (instruction_id),
    CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE

);






