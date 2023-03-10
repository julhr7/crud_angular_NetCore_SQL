namespace BE_CRUD_EMPLOYEE.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int Edad { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
