--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.1

-- Started on 2022-04-17 18:28:46 +03

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
-- TOC entry 215 (class 1259 OID 57415)
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
-- TOC entry 219 (class 1259 OID 98330)
-- Name: meetingdates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetingdates (
    expert_id integer NOT NULL,
    patient_id integer NOT NULL,
    numberofmeetings integer DEFAULT 0,
    session_id_prev integer DEFAULT 0,
    session_id_next integer DEFAULT 0
);


ALTER TABLE public.meetingdates OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 49192)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    expert_id integer NOT NULL,
    title text,
    totalviews integer DEFAULT 0,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP(2),
    session_id integer NOT NULL
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
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- TOC entry 218 (class 1259 OID 65616)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    patient_id integer NOT NULL,
    expert_id integer NOT NULL,
    isapproved boolean,
    request timestamp without time zone DEFAULT CURRENT_TIMESTAMP(2),
    session_id integer NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 57453)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    session_id integer NOT NULL,
    expert_id integer NOT NULL,
    clink text NOT NULL,
    session_title text,
    re_interval integer,
    session_date date,
    session_time text,
    isprivate boolean,
    price integer,
    patient_ids text NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 57452)
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
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 216
-- Name: sessions_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_session_id_seq OWNED BY public.sessions.session_id;


--
-- TOC entry 213 (class 1259 OID 57370)
-- Name: user_experts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_experts (
    expert_id integer NOT NULL,
    religion boolean,
    totalrating double precision,
    relationships real,
    goals real,
    approach real,
    description text,
    graduate_school text,
    tckn text NOT NULL,
    specialties text,
    patient_ids text,
    numofvotes integer DEFAULT 0
);


ALTER TABLE public.user_experts OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 57382)
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
-- TOC entry 3666 (class 0 OID 0)
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
-- TOC entry 3470 (class 2604 OID 73755)
-- Name: sessions session_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN session_id SET DEFAULT nextval('public.sessions_session_id_seq'::regclass);


--
-- TOC entry 3464 (class 2604 OID 73756)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3654 (class 0 OID 57415)
-- Dependencies: 215
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complaints (reporting_id, reported_id, reason, report_time) FROM stdin;
20	16	Rahatsız Edici Davranış	2022-04-17 18:25:46.2
\.


--
-- TOC entry 3658 (class 0 OID 98330)
-- Dependencies: 219
-- Data for Name: meetingdates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meetingdates (expert_id, patient_id, numberofmeetings, session_id_prev, session_id_next) FROM stdin;
18	16	0	0	9
19	16	0	0	10
20	17	0	0	11
21	17	0	0	12
\.


--
-- TOC entry 3651 (class 0 OID 49192)
-- Dependencies: 212
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (post_id, expert_id, title, totalviews, creation_date, session_id) FROM stdin;
3	18	Pandemi ve Depresyon	0	2022-04-17 18:08:40.1	9
4	19	Günümüzde Anksiyete	0	2022-04-17 18:08:40.1	10
5	20	Mucize Uygulama Dengel	0	2022-04-17 18:08:40.1	11
6	21	Uyku Bozukluklari	0	2022-04-17 18:08:40.1	12
\.


--
-- TOC entry 3657 (class 0 OID 65616)
-- Dependencies: 218
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (patient_id, expert_id, isapproved, request, session_id) FROM stdin;
16	18	t	2022-04-17 17:59:14.75	9
16	19	t	2022-04-17 17:59:14.75	10
17	20	t	2022-04-17 17:59:14.75	11
17	21	t	2022-04-17 17:59:14.75	12
\.


--
-- TOC entry 3656 (class 0 OID 57453)
-- Dependencies: 217
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (session_id, expert_id, clink, session_title, re_interval, session_date, session_time, isprivate, price, patient_ids) FROM stdin;
9	18	sessionlink.com	Session 1	2	2022-05-20	14:30	t	250	16
10	19	sessionlink2.com	Session 2	7	2022-05-17	15:30	t	350	16
11	20	sessionlink.com	Session 3	14	2022-05-07	16:30	t	300	17
12	21	sessionlink3.com	Session 4	5	2022-05-12	17:30	t	400	17
\.


--
-- TOC entry 3652 (class 0 OID 57370)
-- Dependencies: 213
-- Data for Name: user_experts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_experts (expert_id, religion, totalrating, relationships, goals, approach, description, graduate_school, tckn, specialties, patient_ids, numofvotes) FROM stdin;
18	t	4.8	\N	\N	\N	\N	\N	102	depresyon, panik atak	1, 2	0
19	f	1	\N	\N	\N	\N	\N	100	anksiyete, öfke kontrolü	1	0
20	t	2.3	\N	\N	\N	\N	\N	101	fobi, depresyon	2	0
21	f	3.9	\N	\N	\N	\N	\N	103	bağimlılık, panik atak	1, 2	0
\.


--
-- TOC entry 3653 (class 0 OID 57382)
-- Dependencies: 214
-- Data for Name: user_patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_patients (patient_id, psy, dep, okb, par, hos, anx, "int", som, phob, tckn) FROM stdin;
16	4.6	8.9	3.2	6.7	8.5	4.2	2.7	9.1	5.5	104
17	3.9	6.7	1.4	9	7.5	2.2	0.7	3.1	6.6	105
\.


--
-- TOC entry 3649 (class 0 OID 49179)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, password, email, age, user_type, reported, created, last_login, sex, tckn) FROM stdin;
16	Karya	ÇETİNKAYA	heypell2	kÇetink@gmail.com	35	patient	0	2022-04-17 14:51:01	2022-04-17 14:51:01	female	104
18	Vitali	MOZ	tirebsd3	vmoz@gmail.com	40	expert	0	2022-04-17 14:51:01	2022-04-17 14:51:01	male	102
19	Derev	TARKAN	davaldl0	dTarkan@gmail.com	65	expert	0	2022-04-17 14:51:01	2022-04-17 14:51:01	male	100
20	Alek	TUNCEL	8757abc	aTuncel@gmail.com	41	expert	0	2022-04-17 14:51:01	2022-04-17 14:51:01	male	101
21	Sermin	YORUK	heyyoo11	sYoruk@gmail.com	29	expert	0	2022-04-17 14:51:01	2022-04-17 14:51:01	female	103
17	Zeynel	KOCABIYIK	asdfgh8	zKocabiyik@gmail.com	37	patient	0	2022-04-17 14:51:01	2022-04-17 14:51:01	male	105
\.


--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 6, true);


--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 216
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_session_id_seq', 12, true);


--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- TOC entry 3490 (class 2606 OID 57422)
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (reporting_id, reported_id);


--
-- TOC entry 3496 (class 2606 OID 98335)
-- Name: meetingdates meetingdates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetingdates
    ADD CONSTRAINT meetingdates_pkey PRIMARY KEY (expert_id, patient_id);


--
-- TOC entry 3480 (class 2606 OID 49200)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3494 (class 2606 OID 65621)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--



--
-- TOC entry 3492 (class 2606 OID 57460)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- TOC entry 3482 (class 2606 OID 57376)
-- Name: user_experts user_experts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_experts
    ADD CONSTRAINT user_experts_pkey PRIMARY KEY (expert_id);


--
-- TOC entry 3484 (class 2606 OID 90171)
-- Name: user_experts user_experts_tckn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_experts
    ADD CONSTRAINT user_experts_tckn_key UNIQUE (tckn);


--
-- TOC entry 3486 (class 2606 OID 57388)
-- Name: user_patients user_patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_patients
    ADD CONSTRAINT user_patients_pkey PRIMARY KEY (patient_id);


--
-- TOC entry 3488 (class 2606 OID 90173)
-- Name: user_patients user_patients_tckn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_patients
    ADD CONSTRAINT user_patients_tckn_key UNIQUE (tckn);


--
-- TOC entry 3476 (class 2606 OID 49187)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3478 (class 2606 OID 90169)
-- Name: users users_tckn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tckn_key UNIQUE (tckn);


--
-- TOC entry 3502 (class 2606 OID 57428)
-- Name: complaints complaints_reported_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_reported_id_fkey FOREIGN KEY (reported_id) REFERENCES public.users(id);


--
-- TOC entry 3501 (class 2606 OID 57423)
-- Name: complaints complaints_reporting_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_reporting_id_fkey FOREIGN KEY (reporting_id) REFERENCES public.users(id);


--
-- TOC entry 3507 (class 2606 OID 98336)
-- Name: meetingdates meetingdates_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetingdates
    ADD CONSTRAINT meetingdates_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.user_experts(expert_id);


--
-- TOC entry 3508 (class 2606 OID 98341)
-- Name: meetingdates meetingdates_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetingdates
    ADD CONSTRAINT meetingdates_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.user_patients(patient_id);


--
-- TOC entry 3497 (class 2606 OID 49201)
-- Name: posts posts_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3498 (class 2606 OID 98395)
-- Name: posts posts_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.sessions(session_id);


--
-- TOC entry 3504 (class 2606 OID 65622)
-- Name: requests requests_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--


--
-- TOC entry 3505 (class 2606 OID 65627)
-- Name: requests requests_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--


--
-- TOC entry 3506 (class 2606 OID 98400)
-- Name: requests requests_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--


--
-- TOC entry 3503 (class 2606 OID 57461)
-- Name: sessions sessions_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3499 (class 2606 OID 57377)
-- Name: user_experts user_experts_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_experts
    ADD CONSTRAINT user_experts_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.users(id);


--
-- TOC entry 3500 (class 2606 OID 57389)
-- Name: user_patients user_patients_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_patients
    ADD CONSTRAINT user_patients_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.users(id);


-- Completed on 2022-04-17 18:28:46 +03

--
-- PostgreSQL database dump complete
--

