using System;
using System.Data.Entity;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
	/// <summary>
	/// Interface to be implemented by logging context
	/// </summary>
	public interface ILoggingContext
	{
		/// <summary>
		/// Gets or sets the log.
		/// </summary>
		/// <value>
		/// The log.
		/// </value>
		IDbSet<LOG_RECORDS> Log { get; set; }
		
		/// <summary>
		/// Saves the changes.
		/// </summary>
		/// <returns>Number of entries affected by the operation</returns>
		int SaveChanges();
	}
}
