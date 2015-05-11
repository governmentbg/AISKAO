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
    /// Изпълнява проверка дали стойността на полето е с точно определена дължина и издава съобщение в следния формат:
    ///     Полето {0} трябва да съдържа точно {1} символа
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000020.    
    /// </summary>
    public class ExactStringLengthAttribute : ValueValidatorAttribute
    {
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public int ExactLength { get; set; }

        public ExactStringLengthAttribute(int exactLength)
        {
            this.ExactLength = exactLength;
            Tag = "0006-000020";
        }

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            ExactStringLengthValidator exactStringLengthValidator = new ExactStringLengthValidator(ExactLength);
            exactStringLengthValidator.FieldNameResourceName = FieldNameResourceName;
            exactStringLengthValidator.FieldNameResourceType = FieldNameResourceType;
            return exactStringLengthValidator;
        }
    }

    public class ExactStringLengthValidator : StringLengthValidator
    {
        private string _fieldName;

        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        private Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public ExactStringLengthValidator(int length)
            : base(length,length)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000020";
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
