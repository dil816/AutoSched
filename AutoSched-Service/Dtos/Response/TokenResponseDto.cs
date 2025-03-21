namespace AutoSched_Service.Dtos.Response
{
    public class TokenResponseDto
    {
        public string Email { get; set; } = string.Empty;
        public required string Accesstoken { get; set; }
        public required string Refreshtoken { get; set; }
    }
}
