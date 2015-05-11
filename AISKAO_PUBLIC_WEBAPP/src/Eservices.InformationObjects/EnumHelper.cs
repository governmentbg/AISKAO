using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using System.Collections;

namespace TechnoLogica.Eservices.InformationObjects
{
    public static class EnumHelper
    {
        public static string GetDisplay<T>(this T enumeration, string value)
        {
            try
            {
                foreach (var currentValue in Enum.GetValues(typeof(T)))
                {
                    if (currentValue.ToString() == value)
                    {
                        FieldInfo fieldInfo = currentValue.GetType().GetField(currentValue.ToString());
                        return ((DisplayAttribute)fieldInfo.GetCustomAttributes(typeof(DisplayAttribute), false)[0]).GetName();
                    }
                }
            }
            catch (Exception e)
            {
                //TODO: Log Exception
            }
            return value;
        }
        public static string GetDisplayList<T>(this T enumerationList)
        {
            try
            {
                StringBuilder result = new StringBuilder();
                dynamic dynamicList = enumerationList;
                foreach (var currentValue in dynamicList)
                {
                    FieldInfo fieldInfo = currentValue.GetType().GetField(currentValue.ToString());
                    result.Append(((DisplayAttribute)fieldInfo.GetCustomAttributes(typeof(DisplayAttribute), false)[0]).GetName() + Environment.NewLine);
                }
                return result.ToString();
            }
            catch (Exception e)
            {
                //TODO: Log Exception
            }
            return "";
        }
    }
}
