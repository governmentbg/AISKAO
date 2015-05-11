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
    /// Изпълнява проверка за валидност на ЕГН със следното съобщение за грешка:
    ///     Невалиден "ЕГН".
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000021.    
    /// </summary>
    public class EGNAttribute : ValueValidatorAttribute
    {
        public EGNAttribute()
        {
            Tag = "0006-000021";
        }
        
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(System.Type targetType)
        {
            EGNValidator egnValidator= new EGNValidator(@"^\s*\d{10}\s*$");            
            return egnValidator;
        }
    }

    public class EGNValidator : RegexValidator
    {
        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public EGNValidator(string pattern)
            : base(pattern)
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000021";
            Tag = "0006-000021";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            // празната стойност е допустима - ограничава се с RequiredAttribute
            if (objectToValidate == null || string.IsNullOrWhiteSpace(objectToValidate.ToString()))
            {
                return;
            }
            string pattern = this.GetPattern();
            Regex regex = new Regex(pattern, RegexOptions.None);
            if (!regex.IsMatch(objectToValidate.ToString()))
            {
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                return;
            }
            // преброяват се водещите нули
            string egnWithZeros = objectToValidate.ToString().Trim();
            string egnWithOutZeros = egnWithZeros.TrimStart('0');
            int leadingZerosCount = egnWithZeros.Length - egnWithOutZeros.Length;
            Int64 egn = Convert.ToInt64(objectToValidate);
            List<byte> egnNumbers = egn.BreakNumber(leadingZerosCount);
            // 1. Проверка на датата:
            try
            {
                // Проверяват се денят, месецът и годината за валидна дата. 
                int year = egnNumbers[0] * 10 + egnNumbers[1];
                int month = egnNumbers[2] * 10 + egnNumbers[3];
                if (month > 40)
                {
                    // За родените след 31.12.1999 г. към месеца се прибавя числото 40.
                    month -= 40;
                    year += 2000;
                }
                else if (month > 20)
                {
                    // За родените преди 01.01.1900 г. към месеца се прибавя числото 20.
                    month -= 20;
                    year += 1800;
                }
                else
                {
                    year += 1900;
                }
                int day = egnNumbers[4] * 10 + egnNumbers[5];
                DateTime date = new DateTime(year, month, day);
            }
            catch (Exception)
            {
                // невалидна дата
                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                return;
            }
            int checkSum = 0;
            int modulus = 0;
            // 2.1.	Изчислява се сумата: 2*а1+4*а2+8*а3+5*а4+10*а5+9*а6+7*а7+3*а8+6*а9, където а1 e първата цифра от ЕГН, а2 - втората и т.н.
            checkSum =
                2 * egnNumbers[0]
                + 4 * egnNumbers[1]
                + 8 * egnNumbers[2]
                + 5 * egnNumbers[3]
                + 10 * egnNumbers[4]
                + 9 * egnNumbers[5]
                + 7 * egnNumbers[6]
                + 3 * egnNumbers[7]
                + 6 * egnNumbers[8];
            // 2.2.	Изчислява се остатъкът по модул 11 от сумата по т. 2.1
            // 2.3.	Ако остатъкът е различен от 10, то той се определя като контролно число
            // Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с десетата цифра – те трябва да са равни
            modulus = (checkSum % 11) % 10;
            // контролното число и десетата цифра трябва да са равни. 
            if (modulus != egnNumbers[9])
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
