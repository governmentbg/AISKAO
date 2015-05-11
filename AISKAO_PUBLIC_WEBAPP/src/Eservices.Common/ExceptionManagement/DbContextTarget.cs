using System;
using System.ComponentModel.DataAnnotations;
using NLog.Targets;
using NLog;
using System.Threading;
using System.Text;
using System.Data;
using System.Data.Entity;
using System.Data.Common;
using System.Collections;
using System.Data.SqlClient;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
    /// <summary>
    /// NLog target that uses a DbContext to write log entries to a database
    /// </summary>
    [Target("DbContextTarget")]
    public class DbContextTarget : TargetWithLayout
    {
        /// <summary>
        /// Gets or sets the name of the connection string to use for accessing the database
        /// </summary>
        /// <value>
        /// The name of the connection string.
        /// </value>
        [Required]
        public string ConnectionStringName { get; set; }

        /// <summary>
        /// Writes logging event to the log target.
        /// classes.
        /// </summary>
        /// <param name="logEvent">Logging event to be written out.</param>
        protected override void Write(LogEventInfo logEvent)
        {
            this.WriteLogMessage(logEvent);
        }

        private void WriteLogMessage(LogEventInfo logEvent)
        {
            //Splits the message by its parameters
            var message = this.Layout.Render(logEvent);
            var messageElements = message.Split('|');

            using (var context = new LoggingContext(string.Format("name={0}", this.ConnectionStringName)))
            {
                int UserID = 0;
                string Host = String.Empty;
                DbConnection connection = context.Database.Connection;
                //context.Database.Connection.Open();
                connection.Open();

                //Find the user id by userName
                if (messageElements[4] != null)
                {
                    var entity = context.Database.SqlQuery(typeof(int), string.Format("select ID from USERS where USERNAME= '{0}'", messageElements[4]));
                    foreach (var item in entity)
                    {
                        UserID = Int32.Parse(item.ToString());
                        break;
                    }
                    Host = messageElements[4];
                }

                if (UserID == 0)
                {
                    var userIDresult = context.Database.SqlQuery(typeof(int), "select USER_ID from WEB_ADM_INFORMATIONS");
                    foreach (var item in userIDresult)
                    {
                        UserID = Int32.Parse(item.ToString());
                        break;
                    }
                    var userNameResult = context.Database.SqlQuery(typeof(string), string.Format("select USERNAME from USERS where ID= '{0}'", UserID));
                    foreach (var item in userNameResult)
                    {
                        Host = item.ToString();
                        break;
                    }

                }
                connection.Close();
                

                DateTime TimeStamp = DateTime.Parse(messageElements[0]);
                var command = connection.CreateCommand();
                command.Connection.Open();
                command.CommandText = "INSERT_LOG_RECORDS";
                command.CommandType = CommandType.StoredProcedure;


                if (messageElements.Length > 5)
                {
                    LogException(messageElements, command, UserID, TimeStamp, Host);
                }
                else
                {
                    LogNonException(messageElements, command, UserID, TimeStamp, Host);
                }
            }
        }

        private void LogNonException(string[] messageElements, DbCommand command, int UserID, DateTime TimeStamp, string Host)
        {
            var timeStampParam = command.CreateParameter();
            timeStampParam.DbType = DbType.DateTime;
            timeStampParam.Direction = ParameterDirection.Input;
            timeStampParam.ParameterName = "P_TIME_STAMP";
            timeStampParam.Value = TimeStamp;
            command.Parameters.Add(timeStampParam);

            var actorIdParam = command.CreateParameter();
            actorIdParam.DbType = DbType.Int32;
            actorIdParam.Direction = ParameterDirection.Input;
            actorIdParam.ParameterName = "P_ACTOR_ID";
            actorIdParam.Value = UserID;
            command.Parameters.Add(actorIdParam);


            var stackTraceParam = command.CreateParameter();
            stackTraceParam.DbType = DbType.String;
            stackTraceParam.Direction = ParameterDirection.Input;
            stackTraceParam.ParameterName = "P_STACKTRACE";
            stackTraceParam.Value = null;
            command.Parameters.Add(stackTraceParam);

            var allXmlParam = command.CreateParameter();
            allXmlParam.DbType = DbType.String;
            allXmlParam.Direction = ParameterDirection.Input;
            allXmlParam.ParameterName = "P_ALL_XML";
            allXmlParam.Value = null;
            command.Parameters.Add(allXmlParam);

            var hostParam = command.CreateParameter();
            hostParam.DbType = DbType.String;
            hostParam.Size = 500;
            hostParam.Direction = ParameterDirection.Input;
            hostParam.ParameterName = "P_HOST";
            hostParam.Value = Host;
            command.Parameters.Add(hostParam);

            var typeParam = command.CreateParameter();
            typeParam.DbType = DbType.String;
            typeParam.Size = 500;
            typeParam.Direction = ParameterDirection.Input;
            typeParam.ParameterName = "P_TYPE";
            typeParam.Value = null;
            command.Parameters.Add(typeParam);

            var sourceParam = command.CreateParameter();
            sourceParam.DbType = DbType.String;
            sourceParam.Direction = ParameterDirection.Input;
            sourceParam.ParameterName = "P_SOURCE";
            sourceParam.Size = 500;
            sourceParam.Value = null;
            command.Parameters.Add(sourceParam);

            var messageParam = command.CreateParameter();
            messageParam.DbType = DbType.String;
            messageParam.Size = 2000;
            messageParam.Direction = ParameterDirection.Input;
            messageParam.ParameterName = "P_MESSAGE";
            messageParam.Value = messageElements[3];
            command.Parameters.Add(messageParam);

            var logLevelParam = command.CreateParameter();
            logLevelParam.DbType = DbType.String;
            logLevelParam.Size = 100;
            logLevelParam.Direction = ParameterDirection.Input;
            logLevelParam.ParameterName = "P_LOG_LEVEL";
            logLevelParam.Value = messageElements[1];
            command.Parameters.Add(logLevelParam);

            var loggerParam = command.CreateParameter();
            loggerParam.DbType = DbType.String;
            loggerParam.Size = 100;
            loggerParam.Direction = ParameterDirection.Input;
            loggerParam.ParameterName = "P_LOGGER";
            //Not Needed
            // loggerParam.Value = messageElements[2];
            loggerParam.Value = null;
            command.Parameters.Add(loggerParam);

            command.ExecuteNonQuery();
            command.Connection.Close();
        }

        private void LogException(string[] messageElements, DbCommand command, int UserID, DateTime TimeStamp, string Host)
        {
            var timeStampParam = command.CreateParameter();
            timeStampParam.DbType = DbType.DateTime;
            timeStampParam.Direction = ParameterDirection.Input;
            timeStampParam.ParameterName = "P_TIME_STAMP";
            timeStampParam.Value = TimeStamp;
            command.Parameters.Add(timeStampParam);

            var actorIdParam = command.CreateParameter();
            actorIdParam.DbType = DbType.Int32;
            actorIdParam.Direction = ParameterDirection.Input;
            actorIdParam.ParameterName = "P_ACTOR_ID";
            actorIdParam.Value = UserID;
            command.Parameters.Add(actorIdParam);

            if (messageElements.Length > 6)
            {
                var stackTraceParam = command.CreateParameter();
                stackTraceParam.DbType = DbType.String;
                stackTraceParam.Direction = ParameterDirection.Input;
                stackTraceParam.ParameterName = "P_STACKTRACE";
                stackTraceParam.Value = messageElements[6];
                command.Parameters.Add(stackTraceParam);
            }
            else
            {
                var stackTraceParam = command.CreateParameter();
                stackTraceParam.DbType = DbType.String;
                stackTraceParam.Direction = ParameterDirection.Input;
                stackTraceParam.ParameterName = "P_STACKTRACE";
                stackTraceParam.Value = messageElements[5];
                command.Parameters.Add(stackTraceParam);
            }

            var allXmlParam = command.CreateParameter();
            allXmlParam.DbType = DbType.String;
            allXmlParam.Direction = ParameterDirection.Input;
            allXmlParam.ParameterName = "P_ALL_XML";
            allXmlParam.Value = null;
            command.Parameters.Add(allXmlParam);

            var hostParam = command.CreateParameter();
            hostParam.DbType = DbType.String;
            hostParam.Size = 500;
            hostParam.Direction = ParameterDirection.Input;
            hostParam.ParameterName = "P_HOST";
            hostParam.Value = Host;
            command.Parameters.Add(hostParam);
            if (messageElements.Length > 6)
            {
                var typeParam = command.CreateParameter();
                typeParam.DbType = DbType.String;
                typeParam.Size = 500;
                typeParam.Direction = ParameterDirection.Input;
                typeParam.ParameterName = "P_TYPE";
                typeParam.Value = messageElements[5];
                command.Parameters.Add(typeParam);
            }
            else
            {
                var typeParam = command.CreateParameter();
                typeParam.DbType = DbType.String;
                typeParam.Size = 500;
                typeParam.Direction = ParameterDirection.Input;
                typeParam.ParameterName = "P_TYPE";
                typeParam.Value = null;
                command.Parameters.Add(typeParam);
            }
            var sourceParam = command.CreateParameter();
            sourceParam.DbType = DbType.String;
            sourceParam.Direction = ParameterDirection.Input;
            sourceParam.ParameterName = "P_SOURCE";
            sourceParam.Size = 500;
            sourceParam.Value = null;
            command.Parameters.Add(sourceParam);

            var messageParam = command.CreateParameter();
            messageParam.DbType = DbType.String;
            messageParam.Size = 2000;
            messageParam.Direction = ParameterDirection.Input;
            messageParam.ParameterName = "P_MESSAGE";
            messageParam.Value = messageElements[3];
            command.Parameters.Add(messageParam);

            var logLevelParam = command.CreateParameter();
            logLevelParam.DbType = DbType.String;
            logLevelParam.Size = 100;
            logLevelParam.Direction = ParameterDirection.Input;
            logLevelParam.ParameterName = "P_LOG_LEVEL";
            logLevelParam.Value = messageElements[1];
            command.Parameters.Add(logLevelParam);

            var loggerParam = command.CreateParameter();
            loggerParam.DbType = DbType.String;
            loggerParam.Size = 100;
            loggerParam.Direction = ParameterDirection.Input;
            loggerParam.ParameterName = "P_LOGGER";
            //Not Needed
            //loggerParam.Value = messageElements[2];
            loggerParam.Value = null;
            command.Parameters.Add(loggerParam);

            command.ExecuteNonQuery();
            command.Connection.Close();
        }


        private void ThrowInvalidLayoutException(string message)
        {
            throw new InvalidLayoutException();
        }
    }
}
