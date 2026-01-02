using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentManagement.Application.DTOs;
using AppointmentManagement.Application.Interfaces;
using AppointmentManagement.Domain.Entities;

namespace AppointmentManagement.Application.Services
{
    public class AppointmentService: IAppointmentService
    {
        private readonly IAppointmentRepository _repository;
        public AppointmentService(IAppointmentRepository repository)
        {
            _repository = repository;
        }

        public async Task CreateAsync(AppointmentCreateDto dto)
        {
            var appointment = new Appointment
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                AppointmentDate = dto.AppointmentDate,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(appointment);
        }

        //public Task DeleteAsync(Guid id)
        //{
        //    //throw new NotImplementedException();
        //   return await _repository.DeleteAsync(id);
        //}
        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }
        public async Task<List<AppointmentListDto>> GetAllAsync()
        {
            var appointments = await _repository.GetAllAsync();

            return appointments.Select(x => new AppointmentListDto
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                AppointmentDate = x.AppointmentDate,
                CreatedAt = x.CreatedAt
            }).ToList();
        }
        public async Task<AppointmentListDto?> GetByIdAsync(Guid id)
        {
            var appointment = await _repository.GetByIdAsync(id);
            if (appointment == null)
                return null;

            return new AppointmentListDto
            {
                Id = appointment.Id,
                FirstName = appointment.FirstName,
                LastName = appointment.LastName,
                AppointmentDate = appointment.AppointmentDate,
                CreatedAt = appointment.CreatedAt
            };
        }
        public async Task UpdateAsync(AppointmentListDto appointmentListDto)
        {
            await _repository.UpdateAsync(appointmentListDto);
        }
    }
}
