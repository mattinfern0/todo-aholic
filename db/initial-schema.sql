CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS app_user
(
    id       BIGINT DEFAULT NEXTVAL('user_id_seq'::regclass) NOT NULL
        CONSTRAINT user_pk
            PRIMARY KEY,
    email    VARCHAR(256)                                    NOT NULL
        CONSTRAINT user_unique_email
            UNIQUE,
    password VARCHAR(100)                                    NOT NULL
);

ALTER SEQUENCE user_id_seq OWNED BY app_user.id;

CREATE TABLE IF NOT EXISTS task_list
(
    id           BIGSERIAL
        CONSTRAINT task_list_pk
            PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    owner_id     BIGINT       NOT NULL
        CONSTRAINT task_list_owner_id_fk
            REFERENCES app_user
);

CREATE TABLE IF NOT EXISTS task
(
    id           BIGSERIAL
        CONSTRAINT task_pk
            PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    owner_id     BIGINT       NOT NULL
        CONSTRAINT task_owner_id_fk
            REFERENCES app_user,
    task_list_id BIGINT
        CONSTRAINT task_task_list_id_fk
            REFERENCES task_list,
    description  VARCHAR(255) NOT NULL,
    due_at       TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authority
(
    internal_name VARCHAR(50) NOT NULL
        CONSTRAINT authority_unique_internal_name
            UNIQUE,
    id            BIGSERIAL
        CONSTRAINT authority_pk
            PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS user_authorities
(
    id           BIGSERIAL
        CONSTRAINT user_authorities_pk
            PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    authority_id BIGINT NOT NULL,
    CONSTRAINT user_authorities_unique_user_authority
        UNIQUE (user_id, authority_id)
);


