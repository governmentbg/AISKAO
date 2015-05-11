using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace TechnoLogica.Eservices.Public.Infrastructure.Site
{    

    public class CaptchaValidatorAttribute : ActionFilterAttribute
    {
        private const string CHALLENGE_FIELD_KEY = "recaptcha_challenge_field";
        private const string RESPONSE_FIELD_KEY = "recaptcha_response_field";

        public override void OnActionExecuting(ActionExecutingContext filterContext)  
        {  
            var captchaChallengeValue = filterContext.HttpContext.Request.Form[CHALLENGE_FIELD_KEY];  
            var captchaResponseValue = filterContext.HttpContext.Request.Form[RESPONSE_FIELD_KEY];  
            var captchaValidtor = new Recaptcha.RecaptchaValidator  
                                      {
                                          PrivateKey = "6LeAousSAAAAADqiHv12jipV3AsBUrJ9DJuUaQId",  
                                          RemoteIP = filterContext.HttpContext.Request.UserHostAddress,  
                                          Challenge = captchaChallengeValue,  
                                          Response = captchaResponseValue  
                                      };  
  
            var recaptchaResponse = captchaValidtor.Validate();  
  
            // this will push the result value into a parameter in our Action  
            filterContext.ActionParameters["captchaValid"] = recaptchaResponse.IsValid;  
  
            base.OnActionExecuting(filterContext);  
        }
    }

    //public static class ReCaptchaExtensions
    //{
    //        public enum Theme { Red, White, BlackGlass, Clean }

    //        public static MvcHtmlString GenerateCaptcha(this HtmlHelper helper, Theme theme, string callBack = null)
    //        {
    //            const string htmlInjectString = @"<div id=""recaptcha_div""></div>
    //                                                <script type=""text/javascript"">
    //                                                    Recaptcha.create(""{0}"", ""recaptcha_div"", {{ theme: ""{1}"" {2}}});
    //                                                </script>";

    //            var publicKey = ConfigurationManager.AppSettings.GetString("ReCaptcha.PublicKey", "");

    //            //if (string.IsNullOrWhiteSpace(publicKey))
    //                //throw new InvalidKeyException("ReCaptcha.PublicKey missing from appSettings");

    //            if (!string.IsNullOrWhiteSpace(callBack))
    //                callBack = string.Concat(", callback: ", callBack);

    //            var html = string.Format(htmlInjectString, publicKey, theme.ToString().ToLower(), callBack);
    //            return MvcHtmlString.Create(html);
    //        }
    //}
}
