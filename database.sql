CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    uuid character varying(10) COLLATE pg_catalog."default",
    name character varying(15) COLLATE pg_catalog."default",
    email character varying(30) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)