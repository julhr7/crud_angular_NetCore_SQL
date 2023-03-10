using AutoMapper;
using BE_CRUD_EMPLOYEE.Models.DTO;

namespace BE_CRUD_EMPLOYEE.Models.Profiles
{
    public class EmployeeProfile: Profile
    {
        public EmployeeProfile()
        {
            CreateMap<Employee, EmployeeDTO>();
            CreateMap<EmployeeDTO, Employee>();
        }
    }
}
