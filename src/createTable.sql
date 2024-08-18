-- Drop all tables
DROP TABLE IF EXISTS transactions;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS books;

-- ตารางสำหรับเก็บข้อมูลหนังสือ (ลบ publication_year, เพิ่ม description และ cover_filename)
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    cover_filename VARCHAR(255),
    available BOOLEAN DEFAULT TRUE
);

-- ตารางสำหรับเก็บข้อมูลผู้ใช้ (รวมผู้ใช้ทั่วไปและผู้ดูแลระบบ)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'admin'))
);

-- ตารางสำหรับการยืม-คืนหนังสือ
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books (book_id),
    user_id INT REFERENCES users (user_id),
    admin_id INT REFERENCES users (user_id),
    borrow_date DATE NOT NULL,
    return_date DATE,
    due_date DATE NOT NULL,
    fine NUMERIC DEFAULT 0
);