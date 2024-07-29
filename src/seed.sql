-- เพิ่มหนังสือใหม่ (มี description และ cover_filename)
INSERT INTO books (title, author, publication_year, description, cover_filename) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'A novel set in the 1920s that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.', 'great_gatsby.jpg');

-- เพิ่มสมาชิกใหม่
INSERT INTO members (name, email, phone) VALUES 
('John Doe', 'johndoe@example.com', '0812345678');

-- เพิ่มบรรณารักษ์ใหม่
INSERT INTO librarians (name, email, phone) VALUES 
('Jane Smith', 'janesmith@example.com', '0823456789');


-- บันทึกการยืมหนังสือ
INSERT INTO transactions (book_id, member_id, librarian_id, borrow_date, due_date) VALUES 
(1, 1, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days');

-- บันทึกการคืนหนังสือและคำนวณค่าปรับ
UPDATE transactions SET 
    return_date = CURRENT_DATE,
    fine = CASE 
        WHEN CURRENT_DATE > due_date THEN (CURRENT_DATE - due_date) * 5
        ELSE 0 
    END
WHERE transaction_id = 1;
