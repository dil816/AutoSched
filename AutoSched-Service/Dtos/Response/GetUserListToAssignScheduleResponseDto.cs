namespace AutoSched_Service.Dtos.Response
{
    public class GetUserListToAssignScheduleResponseDto
    {
        public List<UserDetails> StudentList { get; set; } = [];
        public List<UserDetails> ExaminerList { get; set; } = [];
    }

    //common dto
    public class UserDetails
    {
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
    }

    //common dto
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
