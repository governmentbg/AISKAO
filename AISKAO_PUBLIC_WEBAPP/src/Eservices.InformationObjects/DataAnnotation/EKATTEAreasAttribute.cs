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
    /// Изпълнява проверка дали стойността е от "Пакет от данни с кодовете и 
    /// наименованията на районите в градовете с районно делене (ЕКАТТЕ)"
    /// и издава съобщение в следния формат:
    ///     Полето <Field> може да заема само валидни стойности от полето <Data Pack Field> от пакета от данни <Data Pack>
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000141.    
    /// </summary>
    public class EKATTEAreasAttribute : ValueValidatorAttribute
    {
        private string _ekatteType;
        private string _ekatteAttribute;

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }
        
        public EKATTEAreasAttribute(string EKATTEType, string EKATTEAttribute)
        {
            _ekatteType = EKATTEType;
            _ekatteAttribute = EKATTEAttribute;            
            Tag = "0006-000141";
        }
                
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            EKATTEAreasValidator ekatteAreasValidator = new EKATTEAreasValidator(_ekatteType, _ekatteAttribute);
            ekatteAreasValidator.FieldNameResourceName = FieldNameResourceName;
            ekatteAreasValidator.FieldNameResourceType = FieldNameResourceType;
            return ekatteAreasValidator;
        }
    }

    public class EKATTEAreasValidator : ValueValidator
    {
        private static XDocument _ekatte;
        private static FileStream _ekatteStream;
        private string _ekatteType;
        private string _ekatteAttribute;
        private string _fieldName;

        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        static EKATTEAreasValidator()
        {
            _ekatteStream = File.OpenRead(Path.Combine(DataAnnotation.Common.StartupPath, "Documents\\AreaData.xml"));
            _ekatte = XDocument.Load(_ekatteStream);
        }

        public EKATTEAreasValidator(string EKATTEType, string EKATTEAttribute)
            : base("", "0006-000141", false)
        {
            _ekatteType = EKATTEType;
            _ekatteAttribute = EKATTEAttribute;

            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000141";
        }


        ~EKATTEAreasValidator()
        {
            _ekatteStream.Close();
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

            var values = from ekatteValues in _ekatte.Descendants("{http://ereg.egov.bg/segment/R-1260}" + _ekatteType).Descendants("{http://ereg.egov.bg/segment/R-1260}" + _ekatteAttribute)
                         select ekatteValues.Value;

            if (values.Contains(objectToValidate.ToString()))
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
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, _ekatteAttribute, "Класификатор на районите в градовете с районно делене");
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
