using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentManagement.Application.DTOs;
using AppointmentManagement.Domain.Entities;

namespace AppointmentManagement.Application.Interfaces
{
    public interface IAppointmentRepository
    {
        Task AddAsync(Appointment appointment);
        Task<List<Appointment>> GetAllAsync();
        Task DeleteAsync(Guid id);
        Task<Appointment?> GetByIdAsync(Guid id);
        Task UpdateAsync(AppointmentListDto appointment);
    }
}
