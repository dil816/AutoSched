namespace AutoSched_Service.Dtos.Response
{
    public class ScheduleSummaryResponseDto
    {
        public List<ScheduleSummary> ScheduleSummaryList { get; set; } = [];

    }
    public class ScheduleSummary
    {
        public string Date { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
