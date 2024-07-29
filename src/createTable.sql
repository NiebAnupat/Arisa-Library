-- ตารางสำหรับเก็บข้อมูลหนังสือ (เพิ่ม description และ cover_filename)
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INT,
    description TEXT,
    cover_filename VARCHAR(255),
    available BOOLEAN DEFAULT TRUE
);

-- ตารางสำหรับเก็บข้อมูลสมาชิก
CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    join_date DATE DEFAULT CURRENT_DATE
);

-- ตารางสำหรับเก็บข้อมูลบรรณารักษ์
CREATE TABLE librarians (
    librarian_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    join_date DATE DEFAULT CURRENT_DATE
);

-- ตารางสำหรับการยืม-คืนหนังสือ
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    member_id INT REFERENCES members(member_id),
    librarian_id INT REFERENCES librarians(librarian_id),
    borrow_date DATE NOT NULL,
    return_date DATE,
    due_date DATE NOT NULL,
    fine NUMERIC DEFAULT 0
);
