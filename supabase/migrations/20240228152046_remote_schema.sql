
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

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "pg_database_owner";

CREATE TYPE "public"."player_role" AS ENUM (
    'top',
    'jungle',
    'mid',
    'bottom',
    'support'
);

ALTER TYPE "public"."player_role" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."teams_of_user"("user_uuid" "uuid") RETURNS "record"
    LANGUAGE "sql"
    AS $$SELECT * FROM team INNER JOIN player ON player.team_uuid = team.uuid INNER JOIN account ON account.uuid = player.account_uuid WHERE user_uuid = account.user_uuid$$;

ALTER FUNCTION "public"."teams_of_user"("user_uuid" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."planning" (
    "uuid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "player_uuid" "uuid" NOT NULL,
    "date" "date" NOT NULL,
    "available" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."planning" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."player" (
    "uuid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_uuid" "uuid",
    "game_name" "text" DEFAULT ''::"text" NOT NULL,
    "tag_line" "text" DEFAULT ''::"text" NOT NULL,
    "puuid" "text" NOT NULL,
    "role" "public"."player_role" NOT NULL,
    "champion_pool" "text"[]
);

ALTER TABLE "public"."player" OWNER TO "postgres";

ALTER TABLE ONLY "public"."planning"
    ADD CONSTRAINT "planning_pkey" PRIMARY KEY ("player_uuid", "date");

ALTER TABLE ONLY "public"."planning"
    ADD CONSTRAINT "planning_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_name_key" UNIQUE ("game_name");

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_pkey" PRIMARY KEY ("uuid");

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_puuid_key" UNIQUE ("puuid");

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_role_key" UNIQUE ("role");

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_user_uuid_key" UNIQUE ("user_uuid");

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."planning"
    ADD CONSTRAINT "planning_player_uuid_fkey" FOREIGN KEY ("player_uuid") REFERENCES "public"."player"("uuid") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."player"
    ADD CONSTRAINT "player_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Allow querying planning for authenticated user" ON "public"."planning" USING (("player_uuid" = ( SELECT "player"."uuid"
   FROM "public"."player"
  WHERE ("player"."user_uuid" = "auth"."uid"())))) WITH CHECK (("player_uuid" = ( SELECT "player"."uuid"
   FROM "public"."player"
  WHERE ("player"."user_uuid" = "auth"."uid"()))));

CREATE POLICY "Enable read access for all users" ON "public"."player" FOR SELECT USING (true);

ALTER TABLE "public"."planning" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."player" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."teams_of_user"("user_uuid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."teams_of_user"("user_uuid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."teams_of_user"("user_uuid" "uuid") TO "service_role";

GRANT ALL ON TABLE "public"."planning" TO "anon";
GRANT ALL ON TABLE "public"."planning" TO "authenticated";
GRANT ALL ON TABLE "public"."planning" TO "service_role";

GRANT ALL ON TABLE "public"."player" TO "anon";
GRANT ALL ON TABLE "public"."player" TO "authenticated";
GRANT ALL ON TABLE "public"."player" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
