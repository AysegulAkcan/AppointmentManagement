using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentManagement.Application.DTOs;

namespace AppointmentManagement.Application.Interfaces
{
    public interface IAppointmentService
    {
        Task CreateAsync(AppointmentCreateDto dto);
        Task<List<AppointmentListDto>> GetAllAsync();
        Task DeleteAsync(Guid id);

    }
}
