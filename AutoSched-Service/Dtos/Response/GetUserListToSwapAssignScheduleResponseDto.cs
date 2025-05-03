namespace AutoSched_Service.Dtos.Response
{
    public class GetUserListToSwapAssignScheduleResponseDto
    {
        public List<SwapUserDetails> StudentList { get; set; } = [];
        public List<SwapUserDetails> ExaminerList { get; set; } = [];
    }
}
