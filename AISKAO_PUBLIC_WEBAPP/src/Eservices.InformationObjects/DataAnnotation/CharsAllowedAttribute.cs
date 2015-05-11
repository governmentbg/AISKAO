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
    /// Изпълнява проверка за допустими символи на стойността със съобщение в следния формат:
    ///     В полето {0} може да се съдържат само {1}.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000018.    
    /// </summary>
    public class CharsAllowedAttribute : ValueValidatorAttribute
    {
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public string CharsAllowed { get; set; }
        //public Type CharsAllowedResourceType { get; set; } //? NOT used
        private string _pattern;

        public CharsAllowedAttribute(string pattern,  string charsAllowed)            
        {
            _pattern = pattern;
            this.CharsAllowed = charsAllowed;
            Tag = "0006-000018";

        }

        public CharsAllowedAttribute(string pattern, string charsAllowed, string propName)
            : this(pattern, charsAllowed)
        {
        }

       
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            CharsAllowedValidator charsAllowedValidator = new CharsAllowedValidator(_pattern, CharsAllowed);
            charsAllowedValidator.FieldNameResourceName = FieldNameResourceName;
            charsAllowedValidator.FieldNameResourceType = FieldNameResourceType;
            return charsAllowedValidator;
        }
    }

    public class CharsAllowedValidator : RegexValidator
    {
        private string _fieldName;

        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public string CharsAllowed { get; set; }

        public CharsAllowedValidator(string pattern, string charsAllowed) : base(pattern)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000018";
            CharsAllowed = charsAllowed;
            Tag = "0006-000018";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (objectToValidate == null ||
                string.IsNullOrEmpty((objectToValidate as string)))
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

            // стойността на съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);

            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, this.CharsAllowed);
        }
    }
}
