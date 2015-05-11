using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка за допустима максимална дължина на стойността със съобщение в следния формат:
    ///     Полето {0} не може да съдържа повече от {1} символа.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000017.    
    /// </summary>
    public class MaxStringLengthAttribute : ValueValidatorAttribute
    {
        protected int MaximumLength { get; set; }

        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public MaxStringLengthAttribute(int maximumLength)            
        {
            MaximumLength = maximumLength;
            Tag = "0006-000017";
        }       
        
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {            
            MinStringLengthValidator stringLengthValidator =  new MinStringLengthValidator(MaximumLength);
            stringLengthValidator.FieldNameResourceName = FieldNameResourceName;
            stringLengthValidator.FieldNameResourceType = FieldNameResourceType;
            return stringLengthValidator;
        }
    }

    public class MinStringLengthValidator : StringLengthValidator
    {
        private string _fieldName;

        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        private Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public MinStringLengthValidator(int maximumLength)
            :base(0, RangeBoundaryType.Inclusive, maximumLength, RangeBoundaryType.Inclusive)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000017";   
        }

        protected override void DoValidate(string objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            // Празни низове и низове равни на null са валидни
            if (string.IsNullOrEmpty(objectToValidate))
            {
                return;
            }
            base.DoValidate(objectToValidate, currentTarget, key, validationResults);
        }

        protected override string GetMessage(object objectToValidate, string key)
        {
            if (FieldNameResourceType != null && !string.IsNullOrEmpty(FieldNameResourceName))
            {
                _fieldName = FieldNameResourceType.GetProperty(FieldNameResourceName).GetValue(FieldNameResourceType, null).ToString();
            }

            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, this.UpperBound);
        }
    }
}
