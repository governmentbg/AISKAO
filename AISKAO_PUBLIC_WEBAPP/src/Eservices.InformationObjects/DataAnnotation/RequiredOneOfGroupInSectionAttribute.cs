using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.ComponentModel;
using System.Linq;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка за задължителност на поне едно от няколко полета със съобщение в следния формат:
    ///     Поне едно от полетата {0} в секцията {1} трябва да бъде попълнено.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000019.    
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class RequiredOneOfGroupInSectionAttribute : ValueValidatorAttribute
    {
        //Ресурс за името на класа
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        private string _fieldName;

        /// <summary>
        /// Локална променлива за поддръжка на AllowMultiple = true
        /// </summary>
        private readonly object _typeId = new object();

        /// <summary>
        /// Имената на свойствата, които трябва да се валидират заедно.
        /// </summary>
        public string[] Fields { get; set; }


        /// <summary>
        /// Създава атрибут от тип RequiredOneOfGroupInSectionAttribute.
        /// </summary>
        /// <param name="sectionType">Тип на клас, описващ сегмент.</param>
        public RequiredOneOfGroupInSectionAttribute(params string[] fields)
            : base()                
        {
            //this._sectionName = sectionType.GetDisplayString();
            this.Fields = fields;
            Tag = "0006-000019";
        }

        public override object TypeId
        {
            get
            {
                return _typeId;
            }
        }

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            RequiredOneOfGroupInSectionValidator requiredOneOfGroupInSectionValidator = new RequiredOneOfGroupInSectionValidator();
            requiredOneOfGroupInSectionValidator.FieldNameResourceName = FieldNameResourceName;
            requiredOneOfGroupInSectionValidator.FieldNameResourceType = FieldNameResourceType;
            requiredOneOfGroupInSectionValidator.Fields = Fields;              
            return requiredOneOfGroupInSectionValidator;
        }
    }


    public class RequiredOneOfGroupInSectionValidator : NotNullValidator
    {
        //Ресурс за името на класа
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        private string _fieldName;

        /// <summary>
        /// Имената на свойствата, които трябва да се валидират заедно.
        /// </summary>
        public string[] Fields { get; set; }

        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        /// <summary>
        /// Локализираните имена на полетата за валидация.
        /// </summary>
        private List<string> _displayFields;

        public RequiredOneOfGroupInSectionValidator()
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000019";
            Tag = "0006-000015";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            bool result = false;
            if (objectToValidate == null)
            {
                // ако обекта няма стойност, то и полетата нямат
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                return;
            }
            else
            {
                var modelType = objectToValidate.GetType();
                var modelMetadataType = modelType.GetMetadataType();
                this._displayFields = new List<string>();
                foreach (var name in this.Fields)
                {
                    PropertyInfo pivalue = modelType.GetProperty(name);
                    PropertyInfo pi = modelType.GetMetadataProperty(name);
                    if (pi != null)
                    {
                        if (!result && pivalue.GetValue(objectToValidate, null) != null)
                        {
                            result = true;
                        }
                        AddDisplayName(objectToValidate, name);
                    }
                    else
                    {
                        this._displayFields.Add(name);
                    }
                }
            }
            if (!result)
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
            }
        }

        private void AddDisplayName(object objectToValidate, string name)
        {
            MetadataTypeAttribute metadataTypeAttribute = (objectToValidate.GetType().GetCustomAttributes(typeof(MetadataTypeAttribute), false).FirstOrDefault() as MetadataTypeAttribute);
            if (metadataTypeAttribute != null)
            {
                PropertyInfo pi1 = metadataTypeAttribute.MetadataClassType.GetProperties().Where(p => p.Name == name).FirstOrDefault();
                if (pi1 != null)
                {
                    DisplayNameAttribute da = pi1.GetCustomAttributes(typeof(DisplayNameAttribute), false).FirstOrDefault() as DisplayNameAttribute;
                    if (da != null)
                    {
                        this._displayFields.Add(da.DisplayName);
                    }
                }
            }
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
            return String.Format(CultureInfo.CurrentUICulture, msg, String.Join(", ", this._displayFields), !string.IsNullOrEmpty(_fieldName) ? _fieldName : key);
        }
    }
}
