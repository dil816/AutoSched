namespace AutoSched_Service.Models
{
    public class User
    {
        public int Id { get; set; }
        public Guid RowId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<Schedule> Schedules { get; set; } = []; // M:M 

        public User()
        {
            RowId = Guid.NewGuid();
        }
    }
}
