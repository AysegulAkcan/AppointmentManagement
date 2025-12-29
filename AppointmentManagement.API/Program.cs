using AppointmentManagement.Application.Interfaces;
using AppointmentManagement.Application.Services;
using AppointmentManagement.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",  // Local development
                "https://appointment-management-k7p9.vercel.app"  // Production
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();  // Eðer cookie/auth kullanýyorsanýz
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (!app.Environment.IsEnvironment("Test"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");


app.UseAuthorization();
app.MapControllers();

app.Run();