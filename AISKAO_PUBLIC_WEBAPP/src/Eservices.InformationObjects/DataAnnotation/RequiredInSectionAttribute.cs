using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка за задължителност на поле със съобщение в следния формат:
    ///     Полето {0} от секцията {1} трябва да е попълнено.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000015.    
    /// </summary>
    public class RequiredInSectionAttribute : ValueValidatorAttribute
    {
        /// <summary>
        /// Локализирано име на секция.
        /// </summary>
        private string _sectionName;
        
        public Type FieldType { get; set; }
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public RequiredInSectionAttribute(Type sectionType) : base()                
        {
            this._sectionName = sectionType.GetDisplayString();
            Tag = "0006-000015";
        }

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            RequiredInSectionValidator requiredInSectionValidator = new RequiredInSectionValidator(_sectionName);
            requiredInSectionValidator.FieldNameResourceName = FieldNameResourceName;
            requiredInSectionValidator.FieldNameResourceType = FieldNameResourceType;
            requiredInSectionValidator.FieldType = FieldType;
            return requiredInSectionValidator;
        }
    }

    public class RequiredInSectionValidator : NotNullValidator
    {
        public Type FieldType { get; set; }
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        
        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }
        private string _sectionName;
        private string _fieldName;

        public RequiredInSectionValidator(string sectionName)
        {            
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000015";
            _sectionName = sectionName;
            Tag = "0006-000015";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (objectToValidate != null &&
                objectToValidate is string &&
                string.IsNullOrEmpty(objectToValidate as string))
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
            }
            if (objectToValidate != null &&
                objectToValidate is DocumentTypeURI &&
                (objectToValidate as DocumentTypeURI).BatchNumber == null &&
                (objectToValidate as DocumentTypeURI).RegisterIndex == null)
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
            }
            base.DoValidate(objectToValidate, currentTarget, key, validationResults);
        }

        protected override string GetMessage(object objectToValidate, string key)
        {            
            //Извличане на името на полето от типа му или от ресурсен файл, ако е от прост тип
            if (FieldType != null)
            {
                this._fieldName = FieldType.GetDisplayString();
            }
            else if (FieldNameResourceType != null && !string.IsNullOrEmpty(FieldNameResourceName))
            {
                _fieldName = FieldNameResourceType.GetProperty(FieldNameResourceName).GetValue(FieldNameResourceType, null).ToString();
            }

            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, _sectionName);
        }
    }
}
