using NLog;
using System;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
	/// <summary>
	/// Logger that uses NLog to log events
	/// </summary>
	public class Logger: ILogger
	{
		private readonly NLog.Logger logger = LogManager.GetCurrentClassLogger();

		/// <summary>
		/// Logs debug information using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		public void Debug(Func<string> messageGenerator)
		{
			if(messageGenerator == null)
			{
				return;
			}
			this.logger.Debug(messageGenerator());
		}

		/// <summary>
		/// Logs debug information with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		public void Debug(string message)
		{
			this.logger.Debug(message);
		}

		/// <summary>
		/// Logs the specified exception as a debug message.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		public void Debug(string message, Exception exception)
		{
			this.logger.DebugException(message, exception);
		}

		/// <summary>
		/// Logs an error using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		public void Error(Func<string> messageGenerator)
		{
			if(messageGenerator == null)
			{
				return;
			}
			this.logger.Error(messageGenerator());
		}

		/// <summary>
		/// Logs an error with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		public void Error(string message)
		{
			this.logger.Error(message);
		}

		/// <summary>
		/// Logs the specified exception as an error.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		public void Error(string message, Exception exception)
		{
			this.logger.ErrorException(message, exception);
		}
		
		/// <summary>
		/// Logs information using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		public void Information(Func<string> messageGenerator)
		{
			if(messageGenerator == null)
			{
				return;
			}
			this.logger.Info(messageGenerator());
		}

		/// <summary>
		/// Logs information with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		public void Information(string message)
		{
			this.logger.Info(message);
		}

		/// <summary>
		/// Logs the specified exception as an information message.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		public void Information(string message, Exception exception)
		{
			this.logger.InfoException(message, exception);
		}

		/// <summary>
		/// Logs tracing information using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		public void Trace(Func<string> messageGenerator)
		{
			if(messageGenerator == null)
			{
				return;
			}
			this.logger.Trace(messageGenerator());
		}

		/// <summary>
		/// Logs tracing information with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		public void Trace(string message)
		{
			this.logger.Trace(message);
		}

		/// <summary>
		/// Logs the specified exception as a trace message.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		public void Trace(string message, Exception exception)
		{
			this.logger.TraceException(message, exception);
		}

		/// <summary>
		/// Logs a warning using the message generation function .
		/// </summary>
		/// <param name="messageGenerator">The message generator.</param>
		public void Warning(Func<string> messageGenerator)
		{
			if(messageGenerator == null)
			{
				return;
			}
			this.logger.Warn(messageGenerator());
		}

		/// <summary>
		/// Logs a warning with the specified message
		/// </summary>
		/// <param name="message">The message.</param>
		public void Warning(string message)
		{
			this.logger.Warn(message);
		}

		/// <summary>
		/// Logs the specified exception as a warning.
		/// </summary>
		/// <param name="message">The message.</param>
		/// <param name="exception">The exception.</param>
		public void Warning(string message, Exception exception)
		{
			this.logger.WarnException(message, exception);
		}
	}
}
