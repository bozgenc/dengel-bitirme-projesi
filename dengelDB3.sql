--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.1

-- Started on 2022-04-16 22:27:33 +03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 57415)
-- Name: complaints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaints (
    reporting_id integer NOT NULL,
    reported_id integer NOT NULL,
    reason text NOT NULL,
    report_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP(2)
);


ALTER TABLE public.complaints OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 49192)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    expert_id integer NOT NULL,
    creation_date timestamp without time zone NOT NULL,
    title text,
    totalviews integer DEFAULT 0
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 49191)
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgres;

--
-- TOC entry 3646 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- TOC entry 213 (class 1259 OID 49206)
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    patient_id integer NOT NULL,
    expert_id integer NOT NULL,
    rating double precision
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 65616)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    patient_id integer NOT NULL,
    expert_id integer NOT NULL,
    request date DEFAULT CURRENT_TIMESTAMP(2) NOT NULL,
    appointment date NOT NULL,
    price integer NOT NULL,
    isprivate boolean NOT NULL,
    isapproved boolean
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 57453)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    session_id integer NOT NULL,
    expert_id integer NOT NULL,
    session_date date NOT NULL,
    clink text NOT NULL,
    session_title text,
    re_interval integer
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 57452)
-- Name: sessions_session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_session_id_seq OWNER TO postgres;

--
-- TOC entry 3647 (class 0 OID 0)
-- Dependencies: 217
-- Name: sessions_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_session_id_seq OWNED BY public.sessions.session_id;


--
-- TOC entry 214 (class 1259 OID 57370)
-- Name: user_experts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_experts (
    expert_id integer NOT NULL,
    religion boolean,
    specialties text[],
    totalrating double precision,
    relationships real,
    goals real,
    approach real,
    description text,
    graduate_school text,
    patient_ids integer[],
    tckn text NOT NULL
);


ALTER TABLE public.user_experts OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 57382)
-- Name: user_patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_patients (
    patient_id integer NOT NULL,
    psy real,
    dep real,
    okb real,
    par real,
    hos real,
    anx real,
    "int" real,
    som real,
    phob real,
    tckn text NOT NULL
);


ALTER TABLE public.user_patients OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 49179)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    age integer NOT NULL,
    user_type text NOT NULL,
    reported integer DEFAULT 0,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    last_login timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0),
    sex text NOT NULL,
    tckn text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 49178)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3648 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3466 (class 2604 OID 73754)
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- TOC entry 3468 (class 2604 OID 73755)
-- Name: sessions session_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN session_id SET DEFAULT nextval('public.sessions_session_id_seq'::regclass);


--
-- TOC entry 3464 (class 2604 OID 73756)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3487 (class 2606 OID 57422)
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (reporting_id, reported_id);


--
-- TOC entry 3475 (class 2606 OID 49200)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3477 (class 2606 OID 49210)
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (patient_id, expert_id);


--
-- TOC entry 3491 (class 2606 OID 65621)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (patient_id, expert_id);


--
-- TOC entry 3489 (class 2606 OID 57460)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- TOC entry 3479 (class 2606 OID 57376)
-- Name: user_experts user_experts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_experts
    ADD CONSTRAINT user_experts_pkey PRIMARY KEY (expert_id);


--
-- TOC entry 3481 (class 2606 OID 90171)
-- Name: user_experts user_experts_tckn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_experts
    ADD CONSTRAINT user_experts_tckn_key UNIQUE (tckn);


--
-- TOC entry 3483 (class 2606 OID 57388)
-- Name: user_patients user_patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_patients
    ADD CONSTRAINT user_patients_pkey PRIMARY KEY (patient_id);


--
-- TOC entry 3485 (class 2606 OID 90173)
-- Name: user_patients user_patients_tckn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_patients
    ADD CONSTRAINT user_patients_tckn_key UNIQUE (tckn);


--
-- TOC entry 3471 (class 2606 OID 49187)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3473 (class 2606 OID 90169)
-- Name: users users_tckn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tckn_key UNIQUE (tckn);


--
-- TOC entry 3498 (class 2606 OID 57428)
-- Name: complaints complaints_reported_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_reported_id_fkey FOREIGN KEY (reported_id) REFERENCES public.users(id);


--
-- TOC entry 3497 (class 2606 OID 57423)
-- Name: complaints complaints_reporting_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_reporting_id_fkey FOREIGN KEY (reporting_id) REFERENCES public.users(id);


--
-- TOC entry 3492 (class 2606 OID 49201)
-- Name: posts posts_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3494 (class 2606 OID 49216)
-- Name: ratings ratings_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3493 (class 2606 OID 49211)
-- Name: ratings ratings_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.users(id);


--
-- TOC entry 3500 (class 2606 OID 65622)
-- Name: requests requests_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.user_experts(expert_id);


--
-- TOC entry 3501 (class 2606 OID 65627)
-- Name: requests requests_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.user_patients(patient_id);


--
-- TOC entry 3499 (class 2606 OID 57461)
-- Name: sessions sessions_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3495 (class 2606 OID 57377)
-- Name: user_experts user_experts_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_experts
    ADD CONSTRAINT user_experts_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3496 (class 2606 OID 57389)
-- Name: user_patients user_patients_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_patients
    ADD CONSTRAINT user_patients_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.users(id);


-- Completed on 2022-04-16 22:27:33 +03

--
-- PostgreSQL database dump complete
--

