namespace AutoSched_Service.Models
{
    public class Schedule
    {
        //public int Id { get; set; }
        //public int? PresentationId { get; set; }
        //public Presentation? Presentation { get; set; }
        //public int? UserId {  get; set; }
        //public User? User { get; set; }

        public int Id { get; set; }
        public DateTime StartTime {  get; set; }
        public DateTime EndTime { get; set; }
        public List<User> Users { get; set; } = []; // M:M
        public int PresentationId { get; set; }  // 1:M child
        public Presentation Presentation { get; set; } = null!;// 1:M child

    }
}
