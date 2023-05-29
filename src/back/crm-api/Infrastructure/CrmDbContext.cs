using CrmApi.Models;
using Microsoft.EntityFrameworkCore;

public class CrmDbContext : DbContext
{
    public CrmDbContext(DbContextOptions<CrmDbContext> options)
        : base(options)
    {
    }

    public DbSet<CatHistory> CatHistory { get; set; }
}