CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
);

INSERT INTO contacts (name, email, phone)
SELECT 'User ' || i, 'user' || i || '@mail.com', '08123456' || i
FROM generate_series(1,50) AS s(i);
