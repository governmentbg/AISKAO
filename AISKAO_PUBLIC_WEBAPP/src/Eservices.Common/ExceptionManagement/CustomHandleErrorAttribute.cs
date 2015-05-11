using System;
using System.Web.Mvc;
using System.Security;
using System.Data;
using System.Threading;
using System.Text.RegularExpressions;
using System.Web;
using System.Net;


namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
    // HandleErrorAttribute
    public class CustomHandleErrorAttribute : HandleErrorAttribute
    {
        private readonly ILogger logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="NLogMvcHandleErrorAttribute"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        public CustomHandleErrorAttribute(ILogger logger)
        {
            this.logger = logger;
        }

        //If Exception event is fired checkes the type of the exception and calls one of the
        //Functions to handle the exception type
        public override void OnException(ExceptionContext filterContext)
        {
            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Server.ClearError();

            //filterContext.HttpContext.Response.StatusCode = 500; //взимаме точния HTTP status code или 500
            var statusCode = (int)HttpStatusCode.InternalServerError; //500
            if (filterContext.Exception is HttpException) // ако Exception-a е HTTPException , той има статус кода и го взимаме от там
            {
                var httpEx = filterContext.Exception as HttpException;
                if (httpEx != null)
                {
                    statusCode = httpEx.GetHttpCode();
                }

            }
            else if (filterContext.Exception is UnauthorizedAccessException)
            {
                //to prevent login prompt in IIS, which will appear when returning 401.
                statusCode = (int)HttpStatusCode.Forbidden;
            }

            filterContext.HttpContext.Response.StatusCode = statusCode;
            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
            base.OnException(filterContext);

            #region Exception Message
            string ExceptionMessage = "", ErrorMessage = "";
            //get exception and error messages,If InnerException exists, finds it's message recursively
            if (filterContext.Exception.InnerException != null)
            {
                ExceptionMessage = FindInnerExceptionMessage(filterContext.Exception.InnerException);
            }
            else
            {
                ExceptionMessage = filterContext.Exception.Message;
            }

            if (filterContext.Exception is SecurityException)
            {
                ErrorMessage = @BusinessErrors.InsufficientRights;
            }
            else if (filterContext.Exception is DataException)
            {

                ErrorMessage = FindInterfaceMessage(ExceptionMessage);
            }
            else if (filterContext.Exception is BusinessException)
            {
                BusinessException businessEx = (BusinessException)filterContext.Exception;
                ErrorMessage = String.Format(BusinessErrors.ResourceManager.GetString(businessEx.Code), businessEx.CustomArguments);
            }
            else
            {
                ErrorMessage = ExceptionMessage; ;
            }
            #endregion

            string redirectUrl ;
            if (filterContext.HttpContext.Request.UrlReferrer != null)
            {
                redirectUrl = filterContext.HttpContext.Request.UrlReferrer.AbsolutePath;
            }
            else
            {
                redirectUrl = "~/"; //relative root
            }
            
            var controllerName = (string)filterContext.RouteData.Values["controller"];
            var actionName = (string)filterContext.RouteData.Values["action"];

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                //custom headers
                filterContext.HttpContext.Response.AddHeader("Error", ErrorMessage); //getting works only in IIS integrated pipeline mode
                filterContext.HttpContext.Response.AddHeader("Redirect", redirectUrl); //въпреки че в скрипта за ajax handling вече няма да редиректваме, решено на 28.01.2014 , защото така потребителя остава на същата страница
                filterContext.HttpContext.Response.Write(ErrorMessage);

            }
            else
            {
                //get the Error view
                var result = CreateActionResult(filterContext, statusCode, controllerName, actionName, ErrorMessage, redirectUrl);
                filterContext.Result = result;
            }

            if (!filterContext.HttpContext.Request.IsAuthenticated && !filterContext.HttpContext.Request.IsAjaxRequest()) //added again to mitigate session expiration 
            {
                //TODO May be Show Message about Your session is expired, you'll be redirected ...
                filterContext.HttpContext.Response.Redirect("~/"); //Redirect to the relative root path,   redirectUrl is not working
            }
            else if (filterContext.HttpContext.Request.IsAuthenticated)
            {
                try
                {
                    //logging
                    var logMessage = string.Format("Exception captured - Controller: {0} ActionName: {1} ErrorMessage: {2} User: {3} ", controllerName, actionName, ErrorMessage, Thread.CurrentPrincipal.Identity.Name);
                    this.logger.Error(logMessage, filterContext.Exception);
                }
                catch { } // should not throw in the exception handling (when no DB avail)- results in blank page
            }
            filterContext.HttpContext.Response.Flush();
        }

        protected ActionResult CreateActionResult(ExceptionContext filterContext, int statusCode,
            string controllerName, string actionName, string errorMessage, string redirectUrl)
        {
            var ctx = new ControllerContext(filterContext.RequestContext, filterContext.Controller);
            var statusCodeName = ((HttpStatusCode)statusCode).ToString();

            var model = new HandleErrorInfo(filterContext.Exception, controllerName, actionName);
            var result = new ViewResult
            {
                ViewName = "Error",
                MasterName = "_Layout",
                ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
            };
            result.ViewBag.StatusCode = statusCode;
            result.ViewBag.StatusCodeName = statusCodeName;
            result.ViewBag.ErrorMessage = errorMessage;
            result.ViewBag.RedirectUrl = redirectUrl;
            return result;
        }

        # region Old implementation
        //Security Handler for the Exceptions thrown by ClaimsPrincipals
        public void SecurityExceptionHandler(ExceptionContext filterContext)
        {

            if (filterContext.HttpContext.Request.IsAuthenticated == true)
            {
                this.logger.Information(string.Format("Security information captured {0}|{1}", filterContext.Controller.GetType().Name, Thread.CurrentPrincipal.Identity.Name), filterContext.Exception);
                base.OnException(filterContext);

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.Write(@BusinessErrors.InsufficientRights);

                }
                else
                {
                    string url;

                    if (filterContext.HttpContext.Request.UrlReferrer != null)
                        url = filterContext.HttpContext.Request.UrlReferrer.AbsolutePath;
                    else if (filterContext.HttpContext.Request.UrlReferrer != null)
                        url = filterContext.HttpContext.Request.UrlReferrer.Host;
                    else
                        url = "/ais/";



                    string View = url.Substring(url.LastIndexOf('/')).Trim('/');

                    filterContext.HttpContext.Response.AddHeader("Error", @BusinessErrors.InsufficientRights);
                    filterContext.HttpContext.Response.AddHeader("Redirect", url);

                    if (View == "")
                    {
                        View = "/ais/";
                    }

                    filterContext.Controller.ViewData.Model = new HandleErrorInfo(filterContext.Exception, filterContext.Controller.ToString(), View);
                    filterContext.Result = new ViewResult()
                    {
                        ViewName = "Error",
                        MasterName = "_Layout",
                        ViewData = filterContext.Controller.ViewData
                    };

                }
            }
            else
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.Write(@BusinessErrors.InsufficientRights);
                    filterContext.HttpContext.Response.AddHeader("Redirect", "/ais/");
                }
                else
                {
                    filterContext.HttpContext.Response.Redirect("~/"); //Redirect to the relative root path
                }
            }
            filterContext.HttpContext.Response.Flush();
        }

        //DataBase Exception Handler for exceptions thrown while someone is trying to delete update or create table that have REFFERENCE to other table
        public void DataExceptionHandler(ExceptionContext filterContext)
        {

            string ExceptionMessage = "";
            //If InnerException exists, finds it's message recursively
            if (filterContext.Exception.InnerException != null)
            {
                ExceptionMessage = FindInnerExceptionMessage(filterContext.Exception.InnerException);
            }
            else
            {
                ExceptionMessage = filterContext.Exception.Message;
            }


            this.logger.Warning(string.Format("DataBase exception captured {0} {1}|{2}", filterContext.Controller.GetType().Name, ExceptionMessage, Thread.CurrentPrincipal.Identity.Name), filterContext.Exception);
            base.OnException(filterContext);


            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {

                filterContext.HttpContext.Response.Write(FindInterfaceMessage(ExceptionMessage)); //Някакво съобщение което ще се върне на error функцията в ajax заявката
            }
            else
            {

                string url;

                if (filterContext.HttpContext.Request.UrlReferrer != null)
                    url = filterContext.HttpContext.Request.UrlReferrer.AbsolutePath;
                else if (filterContext.HttpContext.Request.UrlReferrer != null)
                    url = filterContext.HttpContext.Request.UrlReferrer.Host;
                else
                    url = "/ais/";


                string View = url.Substring(url.LastIndexOf('/')).Trim('/');

                filterContext.HttpContext.Response.AddHeader("Error", FindInterfaceMessage(ExceptionMessage));
                filterContext.HttpContext.Response.AddHeader("Redirect", url);

                if (View == "")
                {
                    View = "/ais/";
                }


                filterContext.Controller.ViewData.Model = new HandleErrorInfo(filterContext.Exception, filterContext.Controller.ToString(), View);
                filterContext.Result = new ViewResult()
                {
                    ViewName = "Error",
                    MasterName = "_Layout",
                    ViewData = filterContext.Controller.ViewData
                };
            }
            filterContext.HttpContext.Response.Flush();
        }



        //Business Exception Handler for handling exceptions thrown by some business services
        public void BusinessExceptionHandler(ExceptionContext filterContext)
        {

            string ErrorMessage = String.Empty;

            BusinessException businessEx = (BusinessException)filterContext.Exception;

            ErrorMessage = String.Format(BusinessErrors.ResourceManager.GetString(businessEx.Code), businessEx.CustomArguments);

            this.logger.Warning(string.Format("Business exception captured {0} {1}|{2}", filterContext.Controller.GetType().Name, businessEx.Code + ": " + ErrorMessage, Thread.CurrentPrincipal.Identity.Name), filterContext.Exception);
            base.OnException(filterContext);

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                filterContext.HttpContext.Response.Write(ErrorMessage); //Някакво съобщение което ще се върне на error функцията в ajax заявката
            }
            else
            {
                string url;

                if (filterContext.HttpContext.Request.UrlReferrer != null)
                    url = filterContext.HttpContext.Request.UrlReferrer.AbsolutePath;
                else if (filterContext.HttpContext.Request.UrlReferrer != null)
                    url = filterContext.HttpContext.Request.UrlReferrer.Host;
                else
                    url = "/ais/";



                string View = url.Substring(url.LastIndexOf('/')).Trim('/');

                filterContext.HttpContext.Response.AddHeader("Error", ErrorMessage);
                filterContext.HttpContext.Response.AddHeader("Redirect", url);

                if (View == "")
                {
                    View = "/ais/";
                }



                filterContext.Controller.ViewData.Model = new HandleErrorInfo(filterContext.Exception, filterContext.Controller.ToString(), View);
                filterContext.Result = new ViewResult()
                {
                    ViewName = "Error",
                    MasterName = "_Layout",
                    ViewData = filterContext.Controller.ViewData
                };
            }
            filterContext.HttpContext.Response.Flush();
        }

        //For All unknown exceptions that are fired by the system or users of the system
        public void UnHandledExceptionHandler(ExceptionContext filterContext)
        {
            this.logger.Error(string.Format("Unexpected error captured {0}|{1}", filterContext.Controller.GetType().Name, Thread.CurrentPrincipal.Identity.Name), filterContext.Exception);
            base.OnException(filterContext);

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                filterContext.HttpContext.Response.Write(@BusinessErrors.GenericError); //Някакво съобщение което ще се върне на error функцията в ajax заявката
            }
            else
            {
                string url;

                if (filterContext.HttpContext.Request.UrlReferrer != null)
                    url = filterContext.HttpContext.Request.UrlReferrer.AbsolutePath;
                else if (filterContext.HttpContext.Request.UrlReferrer != null)
                    url = filterContext.HttpContext.Request.UrlReferrer.Host;
                else
                    url = "/ais/";



                string View = url.Substring(url.LastIndexOf('/')).Trim('/');

                filterContext.HttpContext.Response.AddHeader("Error", @BusinessErrors.GenericError);
                filterContext.HttpContext.Response.AddHeader("Redirect", url);

                if (View == "")
                {
                    View = "/ais/";
                }

                filterContext.Controller.ViewData.Model = new HandleErrorInfo(filterContext.Exception, filterContext.Controller.ToString(), View);
                filterContext.Result = new ViewResult()
                {
                    ViewName = "Error",
                    MasterName = "_Layout",
                    ViewData = filterContext.Controller.ViewData
                };


            }
            filterContext.HttpContext.Response.Flush();

        }


        #endregion Old impl

        //Used for the DbException to find the Constraint name and return human readable message 
        //if no constraint is found returns the message from the DB
        private string FindInterfaceMessage(string ExceptionMessage)
        {
            var regex = "[0-9a-z!@#$%^&*()\\.,-:\"']";

            var WhiteSpaceRegex = @"[ ]{1,}";

            string messageTrimmed = Regex.Replace(ExceptionMessage, regex, " ");
            //Replace white spaces with | 
            messageTrimmed = Regex.Replace(messageTrimmed, WhiteSpaceRegex, "|");
            //Split to words separeted by |
            var messageElements = messageTrimmed.Split('|');

            foreach (var item in messageElements)
            {
                //checkes if the word starts with one of the FK,CK,UK,PK
                if (item.StartsWith("FK") || item.StartsWith("CK") || item.StartsWith("UK") || item.StartsWith("PK"))
                {
                    String message = KeyConstrains.ResourceManager.GetString(item);
                    if (message != null)
                    {
                        return message;
                    }
                    else
                    {
                        return ExceptionMessage;
                    }
                }
            }

            return ExceptionMessage;
        }



        //Help Method Recurcive function
        public string FindInnerExceptionMessage(Exception ex)
        {
            if (ex.InnerException != null)
            {
                return FindInnerExceptionMessage(ex.InnerException);
            }
            else { return ex.Message; }
        }

    }
}

