using Microsoft.EntityFrameworkCore;

namespace BE_CRUD_EMPLOYEE.Models.Repository
{
    public class EmployeeRepository: IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetListEmployees()
        {
            return await _context.Empleado.ToListAsync();
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await _context.Empleado.FindAsync(id);
        }

        public async Task DeleteEmployee(Employee employee)
        {
            _context.Empleado.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> AddEmployee(Employee employee)
        {
            _context.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task UpdateEmployee(Employee employee)
        {
            var employeeItem = await _context.Empleado.FirstOrDefaultAsync(x => x.Id == employee.Id);

            if (employeeItem != null)
            {
                employeeItem.Nombres = employee.Nombres;
                employeeItem.Apellidos = employee.Apellidos;
                employeeItem.Edad = employee.Edad;
                employeeItem.Direccion = employee.Direccion;

                await _context.SaveChangesAsync();
            }

            
        }
    }
}
