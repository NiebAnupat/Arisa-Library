-- เรียกดูประวัติการยืม-คืน
SELECT 
    t.transaction_id,
    b.title,
    b.description,
    b.cover_filename,
    u.username AS user_username,
    a.username AS admin_username,
    t.borrow_date,
    t.return_date,
    t.due_date,
    t.fine
FROM transactions t
JOIN books b ON t.book_id = b.book_id
JOIN users u ON t.user_id = u.user_id
JOIN users a ON t.admin_id = a.user_id
WHERE u.role = 'user' AND a.role = 'admin';
