namespace BE_CRUD_EMPLOYEE.Models.Repository
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetListEmployees();
        Task<Employee> GetEmployee(int id);
        Task DeleteEmployee(Employee employee);
        Task<Employee> AddEmployee(Employee employee);
        Task UpdateEmployee(Employee employee);
    }
}
