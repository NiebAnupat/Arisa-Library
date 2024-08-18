-- เพิ่มหนังสือใหม่ (มี description และ cover_filename)
INSERT INTO books (title, author, description, cover_filename) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the 1920s that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.', 'great_gatsby.jpg');

-- เพิ่มผู้ใช้ใหม่ (ผู้ใช้ทั่วไป)
INSERT INTO users (username, password, role) VALUES 
('john_doe', 'securepassword123', 'user');

-- เพิ่มผู้ใช้ใหม่ (ผู้ดูแลระบบ)
INSERT INTO users (username, password, role) VALUES 
('jane_smith', 'anothersecurepassword', 'admin');

-- บันทึกการยืมหนังสือ
INSERT INTO transactions (book_id, user_id, admin_id, borrow_date, due_date) VALUES 
(1, 1, 2, CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days');

-- บันทึกการคืนหนังสือและคำนวณค่าปรับ
UPDATE transactions SET 
    return_date = CURRENT_DATE,
    fine = CASE 
        WHEN CURRENT_DATE > due_date THEN (CURRENT_DATE - due_date) * 5
        ELSE 0 
    END
WHERE transaction_id = 1;

