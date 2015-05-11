using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.UI;

namespace TechnoLogica.Eservices.Public.Infrastructure.Site
{
    public static class ExtenstionMethods
    {
        public static MvcHtmlString MenuLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, object htmlAttributes)
        {
            string currentAction = htmlHelper.ViewContext.RouteData.GetRequiredString("action");
            string currentController = htmlHelper.ViewContext.RouteData.GetRequiredString("controller");

            string iconClass = "";
            bool linkActive = false;

            Dictionary<string, object> htmlAttributesDictionary = new Dictionary<string, object>();
            if (actionName == currentAction && controllerName == currentController)
            {
                linkActive = true;
                htmlAttributesDictionary.Add("class", "active");
            }

            if (htmlAttributes != null)
            {
                foreach (var prop in htmlAttributes.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public))
                {
                    object value = prop.GetValue(htmlAttributes);
                    if (prop.Name == "iconClass")
                    {
                        iconClass = value.ToString();
                        if (linkActive)
                            iconClass += " icon-white";
                    }
                    else
                    {
                        htmlAttributesDictionary.Add(prop.Name, value);
                    }
                }
            }

            TagBuilder icon = new TagBuilder("i");
            icon.AddCssClass(iconClass);
            var rowHtml = icon + " " + linkText;

            string anchor = htmlHelper.ActionLink(
                               "{0}",
                                actionName,
                                controllerName,
                                null,
                                htmlAttributesDictionary).ToString();

            return MvcHtmlString.Create(string.Format(anchor, rowHtml));


        }


        public static MvcHtmlString GenerateCaptcha(this HtmlHelper helper)
        {
            var captchaControl = new Recaptcha.RecaptchaControl
                {                    
                    ID = "recaptcha",
                    Theme = "blackglass",
                    PublicKey = "6LeAousSAAAAAMbaNyGD8d9jw7ideZey5vhBjHYu",
                    PrivateKey = "6LeAousSAAAAADqiHv12jipV3AsBUrJ9DJuUaQId",                    
                };
            captchaControl.OverrideSecureMode = true;
            var htmlWriter = new HtmlTextWriter(new StringWriter());
            captchaControl.RenderBeginTag(htmlWriter);
            captchaControl.RenderControl(htmlWriter);
            captchaControl.RenderEndTag(htmlWriter);

            return MvcHtmlString.Create(htmlWriter.InnerWriter.ToString());
        } 
    }


}
