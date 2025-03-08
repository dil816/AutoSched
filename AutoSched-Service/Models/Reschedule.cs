namespace AutoSched_Service.Models
{
    public class Reschedule
    {
        public int Id { get; set; }
        public DateTime NewDate { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
