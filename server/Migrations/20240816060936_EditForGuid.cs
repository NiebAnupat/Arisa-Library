using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations {
    /// <inheritdoc />
    public partial class EditForGuid : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    join_date = table.Column<DateOnly>(type: "date", nullable: true, defaultValueSql: "CURRENT_DATE"),
                    role = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CreatedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("users_pkey", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_users_users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new {
                    book_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    author = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    cover_filename = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    available = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("books_pkey", x => x.book_id);
                    table.ForeignKey(
                        name: "FK_books_users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "transactions",
                columns: table => new {
                    transaction_id = table.Column<Guid>(type: "uuid", nullable: false),
                    book_id = table.Column<Guid>(type: "uuid", nullable: true),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    admin_id = table.Column<Guid>(type: "uuid", nullable: true),
                    borrow_date = table.Column<DateOnly>(type: "date", nullable: false),
                    return_date = table.Column<DateOnly>(type: "date", nullable: true),
                    due_date = table.Column<DateOnly>(type: "date", nullable: false),
                    fine = table.Column<decimal>(type: "numeric", nullable: true, defaultValueSql: "0"),
                    CreatedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedUTC = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("transactions_pkey", x => x.transaction_id);
                    table.ForeignKey(
                        name: "FK_transactions_users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "users",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "transactions_admin_id_fkey",
                        column: x => x.admin_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "transactions_book_id_fkey",
                        column: x => x.book_id,
                        principalTable: "books",
                        principalColumn: "book_id");
                    table.ForeignKey(
                        name: "transactions_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_books_CreatedByUserId",
                table: "books",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_admin_id",
                table: "transactions",
                column: "admin_id");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_book_id",
                table: "transactions",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_CreatedByUserId",
                table: "transactions",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_user_id",
                table: "transactions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_CreatedByUserId",
                table: "users",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "users_email_key",
                table: "users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "transactions");

            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
