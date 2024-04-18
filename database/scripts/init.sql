CREATE TABLE public.todo (
    todo_id int NOT NULL,
    text character varying(50) NOT NULL
);
ALTER TABLE ONLY public.todo 
    ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);
  ALTER TABLE public.todo OWNER TO postgres;
 