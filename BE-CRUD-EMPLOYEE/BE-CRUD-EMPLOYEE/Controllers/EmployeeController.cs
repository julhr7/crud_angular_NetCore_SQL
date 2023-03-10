using AutoMapper;
using BE_CRUD_EMPLOYEE.Models;
using BE_CRUD_EMPLOYEE.Models.DTO;
using BE_CRUD_EMPLOYEE.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUD_EMPLOYEE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        
        private readonly IMapper _mapper;
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IMapper mapper, IEmployeeRepository employeeRepository)
        {
            _mapper = mapper;
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listEmployees = await _employeeRepository.GetListEmployees();

                var listEmployeesDto = _mapper.Map<IEnumerable<EmployeeDTO>>(listEmployees);

                return Ok(listEmployeesDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployee(id);

                if (employee == null)
                {
                    return NoContent();
                }

                var employeeDto = _mapper.Map<EmployeeDTO>(employee);

                return Ok(employeeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployee(id);

                if (employee == null)
                {
                    return NotFound();
                }

                await _employeeRepository.DeleteEmployee(employee);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EmployeeDTO employeeDto)
        {
            try
            {
                var employee = _mapper.Map<Employee>(employeeDto);

                employee.FechaCreacion = DateTime.Now;
                
                employee = await _employeeRepository.AddEmployee(employee);

                var employeeItemDto = _mapper.Map<EmployeeDTO>(employee);

                return CreatedAtAction("Get", new { id = employeeItemDto.Id }, employeeItemDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EmployeeDTO employeeDto)
        {
            try
            {
                var employee = _mapper.Map<Employee>(employeeDto);

                if (id != employee.Id)
                {
                    return BadRequest();
                }
                
                var employeeItem = await _employeeRepository.GetEmployee(id);
                if (employeeItem == null)
                {
                    return NotFound();
                }
                
                await _employeeRepository.UpdateEmployee(employee);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
