using AutoSched_Service.Models;

namespace AutoSched_Service.Dtos.Response
{
    public class UserResponseDto
    {
        public string RowId { get; set; } = string.Empty;   
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
