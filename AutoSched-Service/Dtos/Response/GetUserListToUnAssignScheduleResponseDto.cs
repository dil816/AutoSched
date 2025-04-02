namespace AutoSched_Service.Dtos.Response
{
    public class GetUserListToUnAssignScheduleResponseDto
    {
        public List<UserDetails> StudentList { get; set; } = [];
        public List<UserDetails> ExaminarList { get; set; } = [];
    }
}
