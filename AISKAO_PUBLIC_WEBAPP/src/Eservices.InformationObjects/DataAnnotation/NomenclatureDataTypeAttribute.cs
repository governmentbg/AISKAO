using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка за принадлежност на стойност на поле към изборена стойност със съобщение в следния формат:
    ///     Полето {0} може да заема само валидни стойности от {1}.
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000016.    
    /// </summary>
    public class NomenclatureDataTypeAttribute : ValueValidatorAttribute
    {
        //Ресурс с името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        Type _nomenclatureType;
        public NomenclatureDataTypeAttribute(Type nomenclatureType)
            : base()
        {
            _nomenclatureType = nomenclatureType;
            Tag = "0006-000016";
        }
            
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator  DoCreateValidator(Type targetType)
        {
            NomenclatureDataTypeValidator nomenclatureDataTypeValidator = new NomenclatureDataTypeValidator(_nomenclatureType);
            nomenclatureDataTypeValidator.FieldNameResourceName = FieldNameResourceName;
            nomenclatureDataTypeValidator.FieldNameResourceType = FieldNameResourceType;
            return nomenclatureDataTypeValidator;
        }
    }

    public class NomenclatureDataTypeValidator : ValueValidator
    {
        /// <summary>
        /// Локализирано име на номенклатура.
        /// </summary>
        private string _nomenclatureName;
        private EnumDataTypeAttribute endt;

        //Ресурс с името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        private Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }


        public NomenclatureDataTypeValidator(Type nomenclatureType)
            : base("","0006-000016",false)
        {
            endt = new EnumDataTypeAttribute(nomenclatureType);
            this._nomenclatureName = nomenclatureType.GetDisplayString();
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
            return String.Format(CultureInfo.CurrentUICulture, msg, key, _nomenclatureName);
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            if (!endt.IsValid(objectToValidate))
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
            }
        }
    }
}
