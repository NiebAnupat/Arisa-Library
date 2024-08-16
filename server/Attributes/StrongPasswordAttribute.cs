using System.Text.RegularExpressions;

namespace Server.Attributes {
    public class StrongPasswordAttribute : ValidationAttribute {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            if (value == null)
                return new ValidationResult("Password is required.");

            var password = value.ToString();

            // Regular expression to check for a strong password.
            var regex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$");

            if (!regex.IsMatch(password)) {
                return new ValidationResult("Password must be at least 8 characters long, " +
                                            "contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
            }

            return ValidationResult.Success;
        }
    }
}
