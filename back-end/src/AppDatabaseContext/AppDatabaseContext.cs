using Microsoft.EntityFrameworkCore;

namespace CupStore.src.AppDatabaseContext
{
    public class AppDatabaseContext : DbContext
    {
        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDatabaseContext).Assembly);
        }
    }
}