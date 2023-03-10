using Microsoft.EntityFrameworkCore;

namespace BE_CRUD_EMPLOYEE.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
        }

        public DbSet<Employee> Empleado { get; set; }
    }
}
