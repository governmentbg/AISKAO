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
    /// Изпълнява проверка дали стойността на полето е цяло число. Съобщението за грешка е в следния формат:
    ///     Полето {0} трябва да съдържа цяло число.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000012.    
    /// </summary>
    public class IntegerAttribute : ValueValidatorAttribute
    {
        private string _fieldName;

        //Ресурс с името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public IntegerAttribute()
            : base()
        {
            Tag = "0006-000012";
        }

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            IntegerValidator integerValidator = new IntegerValidator();
            integerValidator.FieldNameResourceName = FieldNameResourceName;
            integerValidator.FieldNameResourceType = FieldNameResourceType;
            return integerValidator;
        }
    }

    public class IntegerValidator : ValueValidator
    {
        private string _fieldName;

        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        private Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }
        
        public IntegerValidator()
            : this("", "0006-000012", false)
        { }

        public IntegerValidator(string messageTemplate, string tag, bool negated)
            : base(messageTemplate, tag, negated)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000012";
        }

        protected override string DefaultNegatedMessageTemplate
        {
            get { throw new NotImplementedException(); }
        }

        protected override string DefaultNonNegatedMessageTemplate
        {
            get { throw new NotImplementedException(); }
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (objectToValidate == null)
            {
                return;
            }

            try
            {
                int convertedValue = Convert.ToInt32(objectToValidate);
            }
            catch (FormatException)
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                return;
            }
        }

        protected override string GetMessage(object objectToValidate, string key)
        {
            //Извличане на името на полето от типа му или от ресурсен файл, ако е от прост тип
            if (FieldNameResourceType != null && !string.IsNullOrEmpty(FieldNameResourceName))
            {
                _fieldName = FieldNameResourceType.GetProperty(FieldNameResourceName).GetValue(FieldNameResourceType, null).ToString();
            }

            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, _fieldName);
        }
    }
}
