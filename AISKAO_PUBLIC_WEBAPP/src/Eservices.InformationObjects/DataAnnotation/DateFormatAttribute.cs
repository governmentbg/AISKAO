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
    public class DateFormatAttribute : ValueValidatorAttribute
    {
        public DateFormatAttribute() : base()
        {
            Tag = "0006-000014";
        }
        
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            DateFormatValidator dateFormatValidator = new DateFormatValidator();
            return dateFormatValidator;
        }
    }

    public class DateFormatValidator : ValueValidator
    {
        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }
        public string DateFormat { get; set; }

        public DateFormatValidator()
            : base("", "0006-000014", false)
        {
            DateFormat = "ДД.ММ.ГГГГ";
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000014";
        }


        protected override string DefaultNegatedMessageTemplate
        {
            get { throw new NotImplementedException(); }
        }

        protected override string DefaultNonNegatedMessageTemplate
        {
            get { throw new NotImplementedException(); }
        }

        protected override string GetMessage(object objectToValidate, string key)
        {
            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, key, this.DateFormat);
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (objectToValidate == null)
            {
                return;
            }

            DateTime convertedValue;
            try
            {
                DateTimeFormatInfo dtfi = new DateTimeFormatInfo();
                dtfi.ShortDatePattern = "dd.MM.yyyy";
                convertedValue = Convert.ToDateTime(objectToValidate, dtfi);
            }
            catch (FormatException)
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
            }
        }
    }
}
