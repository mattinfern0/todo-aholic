CREATE TABLE IF NOT EXISTS "user"
(
    id       BIGSERIAL
        CONSTRAINT user_pk
            PRIMARY KEY,
    email    VARCHAR(256) NOT NULL
        CONSTRAINT user_unique_email
            UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS task_list
(
    id           BIGSERIAL
        CONSTRAINT task_list_pk
            PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    owner_id     BIGINT       NOT NULL
        CONSTRAINT task_list_owner_id_fk
            REFERENCES "user"
);

CREATE TABLE IF NOT EXISTS task
(
    id            BIGSERIAL
        CONSTRAINT task_pk
            PRIMARY KEY,
    display_name  VARCHAR(100) NOT NULL,
    owner_id      BIGINT       NOT NULL
        CONSTRAINT task_owner_id_fk
            REFERENCES "user",
    task_list_id  BIGINT
        CONSTRAINT task_task_list_id_fk
            REFERENCES task_list,
    description   VARCHAR(255) NOT NULL,
    "dueAt"       TIMESTAMP    NOT NULL,
    "completedAt" TIMESTAMP
);


