using System;
using System.Data.Entity;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
	/// <summary>
	/// Context for accessing log data
	/// </summary>
	public partial class LoggingContext : DbContext, ILoggingContext
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="LoggingContext"/> class.
		/// </summary>
		

		/// <summary>
		/// Initializes a new instance of the <see cref="LoggingContext"/> class.
		/// </summary>
		/// <param name="connectionStringName">Name of the connection string.</param>
		public LoggingContext(string connectionStringName)
			: base(connectionStringName)
		{
		}

		/// <summary>
		/// Gets or sets the log.
		/// </summary>
		/// <value>
		/// The log.
		/// </value>
		public IDbSet<LOG_RECORDS> Log { get; set; }
	
	}
}