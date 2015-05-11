using System;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
	public class InvalidLayoutException: Exception
	{
		private const string ErrorMessage =
			"The layout specification for NLog.Mvc.DbContextTarget is invalid.\n"
			+ "You must use the default layout or one of the following to ensure information is logged correctly in the database"
			+ ":\n\n${longdate}|${level}|${logger}|${message}"
			+ "\n\n${longdate}|${level}|${logger}|${message}${onexception:|${exception:format=type}|${exception:format=method}|${exception:format=message}|${exception:format=stacktrace}}";

		public InvalidLayoutException(): base(ErrorMessage)
		{
		}
	}
}
