using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentManagement.Application.Interfaces;
using AppointmentManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManagement.Infrastructure.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly AppDbContext _context;

        public AppointmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Appointment appointment)
        {
            await _context.Appointments.AddAsync(appointment);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Appointment>> GetAllAsync()
        {
            return await _context.Appointments
                .OrderByDescending(x => x.AppointmentDate)
                .ToListAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var entity = await _context.Appointments.FindAsync(id);

            if (entity == null)
                throw new Exception("Kayıt bulunamadı");

            _context.Appointments.Remove(entity);
            await _context.SaveChangesAsync();
        }

    }
}
