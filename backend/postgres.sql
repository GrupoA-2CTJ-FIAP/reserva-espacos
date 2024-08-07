PGDMP  3    ,                |            postgres    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4813                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    16407    Clients    TABLE     �   CREATE TABLE public."Clients" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Clients";
       public         heap    postgres    false            �            1259    16406    Clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Clients_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Clients_id_seq";
       public          postgres    false    219            �           0    0    Clients_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Clients_id_seq" OWNED BY public."Clients".id;
          public          postgres    false    218            �            1259    16418    Reservations    TABLE     �  CREATE TABLE public."Reservations" (
    id integer NOT NULL,
    "spaceId" integer NOT NULL,
    "clientId" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "totalHours" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."Reservations";
       public         heap    postgres    false            �            1259    16417    Reservations_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Reservations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Reservations_id_seq";
       public          postgres    false    221            �           0    0    Reservations_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Reservations_id_seq" OWNED BY public."Reservations".id;
          public          postgres    false    220            �            1259    16398    Spaces    TABLE       CREATE TABLE public."Spaces" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    capacity integer NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Spaces";
       public         heap    postgres    false            �            1259    16397    Spaces_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Spaces_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Spaces_id_seq";
       public          postgres    false    217            �           0    0    Spaces_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Spaces_id_seq" OWNED BY public."Spaces".id;
          public          postgres    false    216            &           2604    16410 
   Clients id    DEFAULT     l   ALTER TABLE ONLY public."Clients" ALTER COLUMN id SET DEFAULT nextval('public."Clients_id_seq"'::regclass);
 ;   ALTER TABLE public."Clients" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            '           2604    16421    Reservations id    DEFAULT     v   ALTER TABLE ONLY public."Reservations" ALTER COLUMN id SET DEFAULT nextval('public."Reservations_id_seq"'::regclass);
 @   ALTER TABLE public."Reservations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            %           2604    16401 	   Spaces id    DEFAULT     j   ALTER TABLE ONLY public."Spaces" ALTER COLUMN id SET DEFAULT nextval('public."Spaces_id_seq"'::regclass);
 :   ALTER TABLE public."Spaces" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �          0    16407    Clients 
   TABLE DATA           N   COPY public."Clients" (id, name, email, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   #       �          0    16418    Reservations 
   TABLE DATA           �   COPY public."Reservations" (id, "spaceId", "clientId", "startDate", "endDate", status, "totalHours", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   �#       �          0    16398    Spaces 
   TABLE DATA           ]   COPY public."Spaces" (id, name, capacity, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �#       �           0    0    Clients_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Clients_id_seq"', 2, true);
          public          postgres    false    218            �           0    0    Reservations_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Reservations_id_seq"', 2, true);
          public          postgres    false    220            �           0    0    Spaces_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Spaces_id_seq"', 1, true);
          public          postgres    false    216            ,           2606    16416    Clients Clients_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_email_key" UNIQUE (email);
 G   ALTER TABLE ONLY public."Clients" DROP CONSTRAINT "Clients_email_key";
       public            postgres    false    219            .           2606    16414    Clients Clients_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Clients" DROP CONSTRAINT "Clients_pkey";
       public            postgres    false    219            0           2606    16424    Reservations Reservations_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Reservations" DROP CONSTRAINT "Reservations_pkey";
       public            postgres    false    221            *           2606    16405    Spaces Spaces_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Spaces"
    ADD CONSTRAINT "Spaces_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Spaces" DROP CONSTRAINT "Spaces_pkey";
       public            postgres    false    217            1           2606    16430 '   Reservations Reservations_clientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id);
 U   ALTER TABLE ONLY public."Reservations" DROP CONSTRAINT "Reservations_clientId_fkey";
       public          postgres    false    221    219    4654            2           2606    16425 &   Reservations Reservations_spaceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES public."Spaces"(id);
 T   ALTER TABLE ONLY public."Reservations" DROP CONSTRAINT "Reservations_spaceId_fkey";
       public          postgres    false    4650    217    221            �   u   x�3��)MN,VI-.I���r3s���s9��Lt�uL�L���-u��Hqrz%�*��rf)�����9��5�2��367C7����L�L�@R\1z\\\ �)7      �   G   x�3�4B##]s]C+�50F6D���0�25�24�33G�dbe`lel�gnj
������ ��u      �   X   x�3�N�ITHIUJ-��L�W00�4��oM-VH�/*�/J,�,K,��4202�50�50Q04�21�24�3�4�50�#����� ���     