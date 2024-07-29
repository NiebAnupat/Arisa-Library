-- เรียกดูประวัติการยืม-คืน
SELECT 
    t.transaction_id,
    b.title,
    b.description,
    b.cover_filename,
    m.name AS member_name,
    l.name AS librarian_name,
    t.borrow_date,
    t.return_date,
    t.due_date,
    t.fine
FROM transactions t
JOIN books b ON t.book_id = b.book_id
JOIN members m ON t.member_id = m.member_id
JOIN librarians l ON t.librarian_id = l.librarian_id;
