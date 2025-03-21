namespace AutoSched_Service.Dtos.Response
{
    public class PresentationResponseDto
    {
        public  int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;

        public string StartTime { get; set; } =  string.Empty;
        public string EndTime { get; set; } = string.Empty;

     

    }
}
