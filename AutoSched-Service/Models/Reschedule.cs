namespace AutoSched_Service.Models
{
    public class Reschedule
    {
        public int Id { get; set; }
        public String NewDate { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int? PresentationId { get; set; }
        public Presentation? Presentation { get; set; }  //1:1 parent
    }
}
