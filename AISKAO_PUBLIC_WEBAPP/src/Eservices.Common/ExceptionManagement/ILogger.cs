using System;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
	public interface ILogger
	{
		/// <summary>
		/// Logs debug information using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		void Debug(Func<string> messageGenerator);

		/// <summary>
		/// Logs debug information with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		void Debug(string message);

		/// <summary>
		/// Logs the specified exception as a debug message.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		void Debug(string message, Exception exception);

		/// <summary>
		/// Logs an error using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		void Error(Func<string> messageGenerator);

		/// <summary>
		/// Logs an error with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		void Error(string message);

		/// <summary>
		/// Logs the specified exception as an error.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		void Error(string message, Exception exception);

		/// <summary>
		/// Logs information using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		void Information(Func<string> messageGenerator);

		/// <summary>
		/// Logs information with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		void Information(string message);

		/// <summary>
		/// Logs the specified exception as an information message.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		void Information(string message, Exception exception);

		/// <summary>
		/// Logs tracing information using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		void Trace(Func<string> messageGenerator);

		/// <summary>
		/// Logs tracing information with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		void Trace(string message);

		/// <summary>
		/// Logs the specified exception as a trace message.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		void Trace(string message, Exception exception);

		/// <summary>
		/// Logs a warning using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		void Warning(Func<string> messageGenerator);

		/// <summary>
		/// Logs a warning with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		void Warning(string message);

		/// <summary>
		/// Logs the specified exception as a warning.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		void Warning(string message, Exception exception);
	}
}