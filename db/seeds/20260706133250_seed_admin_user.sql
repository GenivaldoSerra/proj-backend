-- migrate:up

INSERT INTO users (
    username,
    password,
    role
)
VALUES (
    'admin',
    'secure_p4$$w0rd',
    'admin'
)
ON CONFLICT (username)
DO NOTHING;


-- migrate:down

