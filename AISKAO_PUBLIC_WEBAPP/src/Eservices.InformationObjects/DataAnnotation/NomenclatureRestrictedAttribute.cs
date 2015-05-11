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
    public class NomenclatureRestrictedAttribute : ValueValidatorAttribute
    {
        /// <summary>
        /// Локализирано име на номенклатура.
        /// </summary>
        private string _nomenclatureName;

        /// <summary>
        /// Локализирано име на полето.
        /// </summary>
        private string _fieldName;

        /// <summary>
        /// Тип на номенклатурата, трябва да е изборена стойност.
        /// </summary>
        public Type NomenclatureType { get; set; }

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        public NomenclatureRestrictedAttribute(Type nomenclatureType)
            : base()
        {
            NomenclatureType = nomenclatureType;
            Tag = "0006-000016";
        }
        
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            NomenclatureRestrictedValidator nomenclatureRestrictedValidator = new NomenclatureRestrictedValidator(NomenclatureType);
            nomenclatureRestrictedValidator.FieldNameResourceName = FieldNameResourceName;
            nomenclatureRestrictedValidator.FieldNameResourceType = FieldNameResourceType;
            return nomenclatureRestrictedValidator;
        }
    }


    public class NomenclatureRestrictedValidator : ValueValidator
    {  
        /// <summary>
        /// Локализирано име на номенклатура.
        /// </summary>
        private string _nomenclatureName;

        /// <summary>
        /// Локализирано име на полето.
        /// </summary>
        private string _fieldName;

        /// <summary>
        /// Тип на номенклатурата, трябва да е изборена стойност.
        /// </summary>
        public Type NomenclatureType { get; set; }

        //Ресурс за името на полето
        public Type FieldNameResourceType { get; set; }
        public string FieldNameResourceName { get; set; }

        private Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public NomenclatureRestrictedValidator(Type nomenclatureType)
            : base("", "0006-000016", false)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000016";
            if (!nomenclatureType.IsEnum)
            {
                throw new ArgumentException("The nomenclature type must be an enumeration.", "nomenclatureType");
            }
            this.NomenclatureType = nomenclatureType;
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
            if (FieldNameResourceType != null && !string.IsNullOrEmpty(FieldNameResourceName))
            {
                _fieldName = FieldNameResourceType.GetProperty(FieldNameResourceName).GetValue(FieldNameResourceType, null).ToString();
            }

            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg, !string.IsNullOrEmpty(_fieldName) ? _fieldName : key, _nomenclatureName);
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {

            // празната стойност е допустима - ограничава се с RequiredAttribute
            if (objectToValidate == null)
            {
                return;
            }
            Type underlyingType = this.NomenclatureType.GetEnumUnderlyingType();
            Array values = Enum.GetValues(this.NomenclatureType);

            ulong ulongValue;
            long longValue;
            // ако номенклатурата е с базов тип ulong и подаденият параметър може да се конвертира кън същия тип
            if (underlyingType.Equals(typeof(ulong)) && ulong.TryParse(objectToValidate.ToString(), out ulongValue))
            {
                // взема се Обект от номенклатурата
                object ev = Enum.ToObject(this.NomenclatureType, ulongValue);
                // ако обратната конверсия връща същия резултат (стойността е била в интервала на стойностите от номенклатурата)
                if (Convert.ToUInt64(ev) == ulongValue)
                {
                    // за всяка стойност от номенклатурата се търси съвпадение
                    for (int i = 0; i < values.Length; i++)
                    {
                        if (values.GetValue(i).Equals(ev))
                        {
                            return;
                        }
                    }
                }
            }
            // ако номенклатурата е с базов тип long и подаденият параметър може да се конвертира кън същия тип
            else if (long.TryParse(objectToValidate.ToString(), out longValue))
            {
                object ev = Enum.ToObject(this.NomenclatureType, longValue);
                if (Convert.ToInt64(ev) == longValue)
                {
                    for (int i = 0; i < values.Length; i++)
                    {
                        if (values.GetValue(i).Equals(ev))
                        {
                            return;
                        }
                    }
                }
            }
            // ако е име на стойност от номенклатурата
            else
            {
                // сравнява се с всички имена на стойности от номенклатурата
                string[] names = this.NomenclatureType.GetEnumNames();
                for (int i = 0; i < names.Length; i++)
                {
                    if (names[i].Equals(objectToValidate.ToString()))
                    {
                        return;
                    }
                }
            }
            base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);            
        }
    }
}

