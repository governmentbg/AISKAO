using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.IO;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка дали стойността е от "Пакет от данни с кодовете и наименованията 
    /// на области, общини, кметства и населени места, съответстващи на данните, 
    /// поддържани от НСИ" или "Пакет от данни, съдържащ селищните образувания"
    /// и издава съобщение в следния формат:
    ///     Полето <Field> може да заема само валидни стойности от полето <Data Pack Field> от пакета от данни <Data Pack>
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000141.    
    /// </summary>
    public class EKATTELocationsOrSettlementsAttribute : ValueValidatorAttribute
    {
        private static XDocument _ekatteLocations;
        private static FileStream _ekatteLocationsStream;
        private static XDocument _ekatteSettlements;
        private static FileStream _ekatteSettlementsStream;
        private string _ekatteLocationsType;
        private string _ekatteLocationsAttribute;
        private string _ekatteSettlementsType;
        private string _ekatteSettlementsAttribute;
        private string _fieldName;

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        
        public EKATTELocationsOrSettlementsAttribute(string EKATTELocationsType, string EKATTELocationsAttribute, string EKATTESettlementsType, string EKATTESettlementsAttribute)
        {
            _ekatteLocationsType = EKATTELocationsType;
            _ekatteLocationsAttribute = EKATTELocationsAttribute;
            _ekatteSettlementsType = EKATTESettlementsType;
            _ekatteSettlementsAttribute = EKATTESettlementsAttribute;
            Tag = "0006-000141";
        }
                
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            EKATTELocationsOrSettlementsValidator ekatteLocationsOrSettlementsValidator =
                new EKATTELocationsOrSettlementsValidator(
                    _ekatteLocationsType,
                    _ekatteLocationsAttribute,
                    _ekatteSettlementsType,
                    _ekatteSettlementsAttribute);
            ekatteLocationsOrSettlementsValidator.FieldNameResourceName = FieldNameResourceName;
            ekatteLocationsOrSettlementsValidator.FieldNameResourceType = FieldNameResourceType;
            return ekatteLocationsOrSettlementsValidator;
        }
    }

    public class EKATTELocationsOrSettlementsValidator : ValueValidator
    {
        private static XDocument _ekatteLocations;
        private static FileStream _ekatteLocationsStream;
        private static XDocument _ekatteSettlements;
        private static FileStream _ekatteSettlementsStream;
        private string _ekatteLocationsType;
        private string _ekatteLocationsAttribute;
        private string _ekatteSettlementsType;
        private string _ekatteSettlementsAttribute;
        private string _fieldName;

        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        
        static EKATTELocationsOrSettlementsValidator()
        {
            _ekatteLocationsStream = File.OpenRead(Path.Combine(DataAnnotation.Common.StartupPath, "Documents\\AdministrativeTerritorialUnitData.xml"));
            _ekatteLocations = XDocument.Load(_ekatteLocationsStream);
            _ekatteSettlementsStream = File.OpenRead(Path.Combine(DataAnnotation.Common.StartupPath, "Documents\\SettlementFormationData.xml"));
            _ekatteSettlements = XDocument.Load(_ekatteSettlementsStream);
        }

        public EKATTELocationsOrSettlementsValidator(string EKATTELocationsType, string EKATTELocationsAttribute, string EKATTESettlementsType, string EKATTESettlementsAttribute)
            : base("", "0006-000141", false)
        {
            _ekatteLocationsType = EKATTELocationsType;
            _ekatteLocationsAttribute = EKATTELocationsAttribute;
            _ekatteSettlementsType = EKATTESettlementsType;
            _ekatteSettlementsAttribute = EKATTESettlementsAttribute;
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000141";
        }

        ~EKATTELocationsOrSettlementsValidator()
        {
            _ekatteLocationsStream.Close();
            _ekatteSettlementsStream.Close();
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            //Ако полето не е задължително връщаме true
            //В противен случай налагаме задължителност,
            //която трябва да се контролира от RequiredInSection атрибута
            if (objectToValidate == null)
            {
                return;
            }

            var valuesLocations = from ekatteValues in _ekatteLocations.Descendants("{http://ereg.egov.bg/segment/R-1286}" + _ekatteLocationsType).Descendants("{http://ereg.egov.bg/segment/R-1286}" + _ekatteLocationsAttribute)
                                  select ekatteValues.Value;

            var valuesSettlements = from ekatteValues in _ekatteSettlements.Descendants("{http://ereg.egov.bg/segment/R-9020}" + _ekatteSettlementsType).Descendants("{http://ereg.egov.bg/segment/R-9020}" + _ekatteSettlementsAttribute)
                                    select ekatteValues.Value;

            if (valuesLocations.Contains(objectToValidate.ToString()) || valuesSettlements.Contains(objectToValidate.ToString()))
            {
                return;
            }
            else
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
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
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, _ekatteLocationsAttribute, Resources.Sections.R9020 + " или " + Resources.Sections.R1286);
        }

        protected override string DefaultNegatedMessageTemplate
        {
            get { throw new NotImplementedException(); }
        }

        protected override string DefaultNonNegatedMessageTemplate
        {
            get { throw new NotImplementedException(); }
        }
    }
}
