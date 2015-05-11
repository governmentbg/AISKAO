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
    /// Изпълнява проверка дали стойността валиден адрес за електронна поща и издава съобщение в следния формат:
    ///     Полето {0} трябва да съдържа валиден адрес на електронна поща.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000025.    
    /// </summary>
    public class EmailAttribute : ValueValidatorAttribute
    {
        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public EmailAttribute()
        {
            Tag = "0006-000025";
        }       

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            EmailValidator emailValidator = new EmailValidator(@"[\w-!#$%&'*+/=?^`{|}~.""]+@([\w]+[.-]?)+[\w]\.[\w]+");
            emailValidator.FieldNameResourceType = FieldNameResourceType;
            emailValidator.FieldNameResourceName = FieldNameResourceName;
            return emailValidator;
        }
    }

    public class EmailValidator : RegexValidator
    {
        private string _fieldName;

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public EmailValidator(string pattern)
            : base(pattern)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000025";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (objectToValidate == null ||
                String.IsNullOrEmpty(objectToValidate as string))
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
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : objectToValidate);
        }
    }
}
