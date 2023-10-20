CREATE SEQUENCE user_id_seq;

ALTER SEQUENCE user_id_seq OWNER TO dev;

CREATE TABLE app_user
(
    id           BIGINT DEFAULT NEXTVAL('user_id_seq'::regclass) NOT NULL
        CONSTRAINT user_pk
            PRIMARY KEY,
    firebase_uid VARCHAR(50)
);

ALTER TABLE app_user
    OWNER TO dev;

ALTER SEQUENCE user_id_seq OWNED BY app_user.id;

CREATE UNIQUE INDEX app_user_firebase_uid_uindex
    ON app_user (firebase_uid);

CREATE TABLE task_list
(
    id           BIGSERIAL
        CONSTRAINT task_list_pk
            PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    owner_id     BIGINT       NOT NULL
        CONSTRAINT task_list_owner_id_fk
            REFERENCES app_user
);

ALTER TABLE task_list
    OWNER TO dev;

CREATE TABLE task
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
    completed_at TIMESTAMP,
    created_at   TIMESTAMP
);

ALTER TABLE task
    OWNER TO dev;

CREATE TABLE authority
(
    internal_name VARCHAR(50) NOT NULL
        CONSTRAINT authority_unique_internal_name
            UNIQUE,
    id            BIGSERIAL
        CONSTRAINT authority_pk
            PRIMARY KEY
);

ALTER TABLE authority
    OWNER TO dev;

CREATE TABLE user_authorities
(
    id           BIGSERIAL
        CONSTRAINT user_authorities_pk
            PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    authority_id BIGINT NOT NULL,
    CONSTRAINT user_authorities_unique_user_authority
        UNIQUE (user_id, authority_id)
);

ALTER TABLE user_authorities
    OWNER TO dev;

