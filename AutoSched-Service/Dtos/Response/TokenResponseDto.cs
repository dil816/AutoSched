namespace AutoSched_Service.Dtos.Response
{
    public class TokenResponseDto
    {
        public required string Accesstoken { get; set; }
        public required string Refreshtoken { get; set; }
    }
}
