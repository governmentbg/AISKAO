using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System.IO;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка дали стойността е от "Пакет от данни с кодовете и наименованията на държавите, съответстващи на данните, поддържани от ЕСГРАОН"
    /// и издава съобщение в следния формат:
    ///     Полето <Field> може да заема само валидни стойности от стандарта <Data Pack Field> от пакета от данни <Data Pack>
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000030.    
    /// </summary>
    public class CountryAttribute : ValueValidatorAttribute
    {
        private string _countryAttribute;

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="countryAttribute">Атрибута на държавата, който трябва да се съдържа в полето (Name/Code)</param>
        public CountryAttribute(string countryAttribute)
        {
            _countryAttribute = countryAttribute;
            Tag = "0006-000030";
        }

        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            CountryValidator countryValidator = new CountryValidator(_countryAttribute);
            countryValidator.FieldNameResourceName = FieldNameResourceName;
            countryValidator.FieldNameResourceType = FieldNameResourceType;
            return countryValidator;
        }
    }

    public class CountryValidator : ValueValidator
    {
        private static XDocument _countries;
        private static FileStream _countriesStream;
        private string _countryAttribute;
        private string _fieldName;

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public CountryValidator(string countryAttribute)
            : base("", "0006-000030", false)
        {
            _countryAttribute = countryAttribute;
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000030";
        }

        static CountryValidator()
        {
            _countriesStream = File.OpenRead(Path.Combine(DataAnnotation.Common.StartupPath, "Documents\\CountriesData.xml"));
            _countries = XDocument.Load(_countriesStream);
        }

        ~CountryValidator()
        {
            _countriesStream.Close();
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
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, "ISO 3166-1");
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
            //Ако полето не е задължително връщаме true
            //В противен случай налагаме задължителност,
            //която трябва да се контролира от RequiredInSection атрибута
            if (objectToValidate == null)
            {
                return;
            }

            var values = from ekatteValues in _countries.Descendants("{http://ereg.egov.bg/segment/R-1248}" + "Country").Descendants("{http://ereg.egov.bg/segment/R-1248}" + _countryAttribute)
                         select ekatteValues.Value;

            if (values.Contains(objectToValidate.ToString().ToUpper()))
            {
                return;
            }
            else
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
            }
        }
    }
}
