using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.Text.RegularExpressions;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    /// <summary>
    /// Изпълнява проверка за валидност на ЛНЧ със следното съобщение за грешка:
    ///     Невалиден "ЛНЧ".
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000022.    
    /// </summary>
    public class PNFAttribute : ValueValidatorAttribute
    {
        public PNFAttribute()
        {
            Tag = "0006-000022";
        }
        
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(System.Type targetType)
        {
            PNFValidator pnfValidator= new PNFValidator(@"^\s*\d{10}\s*$");            
            return pnfValidator;
        }
    }

    public class PNFValidator : RegexValidator
    {
        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public PNFValidator(string pattern)
            : base(pattern)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000022";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            // празната стойност е допустима - ограничава се с RequiredAttribute
            if (objectToValidate == null || string.IsNullOrWhiteSpace(objectToValidate.ToString()))
            {
                return;
            }
            // Личният номер на чужденец (ЛНЧ) се състои от 10 цифри.
            string pattern = this.GetPattern();
            Regex regex = new Regex(pattern, RegexOptions.None);
            if (!regex.IsMatch(objectToValidate.ToString()))
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                return;
            }
            // преброяват се водещите нули
            string pnfWithZeros = objectToValidate.ToString().Trim();
            string pnfWithOutZeros = pnfWithZeros.TrimStart('0');
            int leadingZerosCount = pnfWithZeros.Length - pnfWithOutZeros.Length;
            Int64 pnf = Convert.ToInt64(objectToValidate);
            List<byte> pnfNumbers = pnf.BreakNumber(leadingZerosCount);
            int checkSum = 0;
            int modulus = 0;
            // 1. Изчислява се сумата: 21*а1+19*а2+17*а3+13*а4+11*а5+9*а6+7*а7+3*а8+1*а9, където а1 e първата цифра от ЛНЧ, а2 - втората и т.н.
            checkSum =
                21 * pnfNumbers[0]
                + 19 * pnfNumbers[1]
                + 17 * pnfNumbers[2]
                + 13 * pnfNumbers[3]
                + 11 * pnfNumbers[4]
                + 9 * pnfNumbers[5]
                + 7 * pnfNumbers[6]
                + 3 * pnfNumbers[7]
                + 1 * pnfNumbers[8];
            // 2. Изчислява се остатъкът по модул 11 от сумата по т.1
            // Ако остатъкът е различен от 10, то той се определя като контролно число
            // Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с десетата цифра – те трябва да са равни
            modulus = (checkSum % 11) % 10;
            // контролното число и десетата цифра трябва да са равни. 
            if (modulus != pnfNumbers[9])
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                return;
            }
        }

        protected override string GetMessage(object objectToValidate, string key)
        {
            // стойността на за съобщението за грешка се извлича от ресурсите
            PropertyInfo nameProperty = ErrorMessageResourceType.GetProperty(ErrorMessageResourceName, BindingFlags.Static | BindingFlags.Public);
            string msg = (string)nameProperty.GetValue(nameProperty.DeclaringType, null);
            return String.Format(CultureInfo.CurrentUICulture, msg);
        }
    }
}
