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
    /// Изпълнява проверка за минимална стойност на числа със съобщение в следния формат:
    ///     Полето {0} трябва да съдържа число, по-голямо от {1}.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000013.    
    /// </summary>
    public class MinBoundaryNumberAttribute : ValueValidatorAttribute
    {
        /// <summary>
        /// Най-малка допустима стойност.
        /// </summary>
        public double MinBoundary { get; set; }

        //Ресурс с името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public MinBoundaryNumberAttribute(double minBoundary)
        {
            MinBoundary = minBoundary;
            Tag = "0006-000013";
        }

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            MinBoundaryValidator stringLengthValidator = new MinBoundaryValidator(MinBoundary);
            stringLengthValidator.FieldNameResourceName = FieldNameResourceName;
            stringLengthValidator.FieldNameResourceType = FieldNameResourceType;
            return stringLengthValidator;
        }
    }

    public class MinBoundaryValidator : RangeValidator
    {
        /// <summary>
        /// Най-малка допустима стойност.
        /// </summary>
        public double MinBoundary { get; set; }

        //Ресурс с името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        private Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public MinBoundaryValidator(double minBoundary)
            :base(minBoundary, double.MaxValue)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000013";
        }

        protected override void DoValidate(IComparable objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (objectToValidate == null)
            {
                return;
            }
            try
            {
                double convertedValue = Convert.ToDouble(objectToValidate);
                base.DoValidate(convertedValue, currentTarget, key, validationResults);
            }
            catch (FormatException)
            {
                return;
            }            
        }

        protected override string GetMessage(object objectToValidate, string key)
        {
            string _fieldName = "";
            //Извличане на името на полето от типа му или от ресурсен файл, ако е от прост тип
            if (FieldNameResourceType != null && !string.IsNullOrEmpty(FieldNameResourceName))
            {
                _fieldName = FieldNameResourceType.GetProperty(FieldNameResourceName).GetValue(FieldNameResourceType, null).ToString();
            }

            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, _fieldName, this.MinBoundary);
        }
    }
}
