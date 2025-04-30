namespace AutoSched_Service.Models
{
    public class ExaminarAvailability
    {
        public int Id { get; set; }
        public string Date { get; set; } = string.Empty;
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public Boolean IsAvailable { get; set; }

        public string ExaminarName { get; set; } = string.Empty;

    }
}
