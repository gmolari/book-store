using CupStore.src.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAcessLayer.Mapping
{
    public class CupMapping : IEntityTypeConfiguration<Cup>
    {
        public void Configure(EntityTypeBuilder<Cup> builder)
        {
            builder.ToTable("Cup");

            builder.Property(c => c.Id).UseMySqlIdentityColumn().HasColumnName("id").HasColumnType("BIGINT");
            builder.Property(c => c.Name).HasColumnName("name").HasColumnType("VARCHAR(255)");
        }
    }
}