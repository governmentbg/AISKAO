using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Премахва грешки възникнали при конверсия на дати и извършва проверка с DateFormatAttribute, ако е бил приложен такъв.
    /// </summary>
    public class ValidateDateTimeModelFieldsAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var modelState = filterContext.Controller.ViewData.ModelState;
            var valueProvider = filterContext.Controller.ValueProvider;

            foreach(var param in filterContext.ActionParameters)
            {
                // избира се типа на параметъра
                Type modelType = param.Value.GetType();
                if (modelType.Equals(typeof(DateTime)))
                {
                    // TODO: Да се определи дали на параметъра е зададен атрибута DateFormatAttribute и да се използва за проверка
                }
                else if(modelType.IsClass)
                {
                    var keysWithIncomingValue = modelState.Keys.Where(
                    x => valueProvider.ContainsPrefix(x) && valueProvider.GetValue(x) != null && !String.IsNullOrEmpty(valueProvider.GetValue(x).AttemptedValue));
                    foreach (var key in keysWithIncomingValue)
                    {
                        PropertyInfo pi = modelType.GetMetadataProperty(key);
                        if (pi.PropertyType.Equals(typeof(DateTime)))
                        {
                            // търси се атрибут DateFormatAttribute
                            var attrs = Attribute.GetCustomAttributes(pi);
                            var dateFormatAttribute = attrs.First<Attribute>(a => a is DateFormatAttribute) as DateFormatAttribute;
                            if(dateFormatAttribute != null)
                            {
                                modelState[key].Errors.Clear();
                                if (dateFormatAttribute.IsValid(valueProvider.GetValue(key).AttemptedValue))
                                {
                                    // ако проверката мине успешно поне за един от атрибутите се изчистват грешките
                                    //modelState[key].Errors.Clear();
                                    break;
                                }
                                else
                                {
                                    modelState[key].Errors.Add(dateFormatAttribute.FormatErrorMessage(pi.GetDisplayString()));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
