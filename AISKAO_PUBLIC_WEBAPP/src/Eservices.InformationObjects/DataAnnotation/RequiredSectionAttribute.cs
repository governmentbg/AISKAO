using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка за задължителност на секция със съобщение в следния формат:
    ///     Попълването на секцията {0} е задължително.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000023.    
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class RequiredSectionAttribute : ValidationAttribute
    {
        private readonly object _typeId = new object();
        /// <summary>
        /// Локализирано име на секция.
        /// </summary>
        //private string _sectionName;
        /// <summary>
        /// Имената на свойствата, които трябва да се валидират заедно.
        /// </summary>
        public string[] Fields { get; set; }


        /// <summary>
        /// Създава атрибут от тип RequiredOneOfGroupInSectionAttribute.
        /// </summary>
        ///// <param name="sectionType">Тип на клас, описващ сегмент.</param>        
        /// <param name="fields">Имената на полетата, които трябва да имат стойност.</param>
        public RequiredSectionAttribute(/*Type sectionType,*/ params string[] fields)
            : base()                
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000023";
            //this._sectionName = sectionType.GetDisplayString();
            this.Fields = fields;
        }
        
        public override bool IsValid(object value)
        {
            bool result = true;
            if (value == null)
            {
                if (this.Fields.Length == 0)
                    // ако обекта няма стойност,и  няма полетата за проверка
                    return true;
                else
                    // ако обекта няма стойност, то и полетата нямат 
                    return false;
            }
            else
            {
                var modelType = value.GetType();
                var modelMetadataType = modelType.GetMetadataType();
                foreach (var name in this.Fields)
                {
                    PropertyInfo pivalue = modelType.GetProperty(name);
                    PropertyInfo pi = modelType.GetMetadataProperty(name);
                    if (pi != null)
                    {
                        if (pivalue.GetValue(value, null) == null)
                        {
                            // ако някое поле няма стойност
                            result = false;
                        }
                    }
                    else
                    {
                        // зададено е грешно поле
                    }
                }
            }
            return result;
        }
        public override object TypeId
        {
            get
            {
                return _typeId;
            }
        }

        public override string FormatErrorMessage(string name)
        {
            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, name);
        }


        
    }
}
