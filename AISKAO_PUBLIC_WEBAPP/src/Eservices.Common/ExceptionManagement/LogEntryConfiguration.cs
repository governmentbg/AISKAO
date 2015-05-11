using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
    /// <summary>
    /// Configures the database object for the LOG_RECORDS entity
    /// </summary>
    public class LOG_RECORDSConfiguration : EntityTypeConfiguration<LOG_RECORDS>
    {
        public LOG_RECORDSConfiguration()
        {
            this.ToTable("LOG_RECORDS");

            this.Property(e => e.ID)
                .HasColumnName("ID")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.HasKey(e => e.ID);

            this.Property(e => e.TIME_STAMP)
                .HasColumnName("TIME_STAMP")
                .IsRequired();

            this.Property(e => e.ACTOR_ID)
                .HasColumnName("ACTOR_ID")
                .IsRequired();

            this.Property(e => e.HOST)
                .HasColumnName("HOST")
                .IsUnicode()
                .IsRequired();

            this.Property(e => e.TYPE)
                .HasColumnName("TYPE")
                .IsUnicode()
                .IsOptional();

            this.Property(e => e.SOURCE)
                .HasColumnName("SOURCE")
                .IsUnicode()
                .IsOptional();

            this.Property(e => e.MESSAGE)
                .IsRequired()
                .HasColumnName("MESSAGE")
                .IsUnicode()
                .IsVariableLength();

            this.Property(e => e.LOG_LEVEL)
                .IsOptional()
                .HasColumnName("LOG_LEVEL")
                .IsUnicode()
                .HasMaxLength(5);

            this.Property(e => e.LOGGER)
                .IsOptional()
                .HasColumnName("LOGGER")
                .IsUnicode()
                .IsVariableLength()
                .HasMaxLength(200);

            this.Property(e => e.STACKTRACE)
                .IsOptional()
                .HasColumnName("STACKTRACE")
                .IsUnicode()
                .IsVariableLength();

            this.Property(e => e.ALL_XML)
               .IsOptional()
               .HasColumnName("ALL_XML")
               .IsUnicode()
               .IsVariableLength();
            /*
                        this.Property(e => e.ExceptionType)
                            .IsOptional()
                            .HasColumnName("ExceptionType")
                            .IsUnicode()
                            .IsVariableLength();

                        this.Property(e => e.Operation)
                            .IsOptional()
                            .HasColumnName("Operation")
                            .IsUnicode()
                            .IsVariableLength();

                        this.Property(e => e.ExceptionMessage)
                            .IsOptional()
                            .HasColumnName("ExceptionMessage")
                            .IsUnicode()
                            .IsVariableLength();
                        */

        }
    }
}
