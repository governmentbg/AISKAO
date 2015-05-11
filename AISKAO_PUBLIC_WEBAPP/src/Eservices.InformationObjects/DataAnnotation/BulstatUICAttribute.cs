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
    /// Изпълнява проверка за валидност на ЕИК/БУЛСТАТ номер със следното съобщение за грешка:
    ///     Невалиден "ЕИК/БУЛСТАТ".
    /// ,който е дефиниран в ресурсния файл Resources.Terms поле 0006-000024.    
    /// </summary>
    public class BulstatUICAttribute : ValueValidatorAttribute
    {
        public BulstatUICAttribute()            
        {
            Tag = "0006-000024";
        }
        
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new BulstatUICValidator();
        }
    }

    public class BulstatUICValidator : RegexValidator
    {
        public Type ErrorMessageResourceType { get; set; }
        private string ErrorMessageResourceName { get; set; }

        public BulstatUICValidator()
            : base(@"^\s*\d{13}\s*$|^\s*\d{10}\s*$|^\s*\d{9}\s*$")
        {
            ErrorMessageResourceType = typeof(Resources.Terms);
            ErrorMessageResourceName = "_0006_000024";
        }

        public override void DoValidate(object objectToValidate, object currentTarget, string key, Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults validationResults)
        {
            // празната стойност е допустима - ограничава се с RequiredAttribute
            if (string.IsNullOrEmpty(objectToValidate as string))
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
            string bulstatWithZeros = objectToValidate.ToString().Trim();
            string bulstatWithOutZeros = bulstatWithZeros.TrimStart('0');
            int leadingZerosCount = bulstatWithZeros.Length - bulstatWithOutZeros.Length;
            Int64 bulstat = Convert.ToInt64(objectToValidate);
            List<byte> bulstatNumbers = bulstat.BreakNumber(leadingZerosCount);
            int checkSum = 0;
            int modulus = 0;

            switch (bulstatNumbers.Count)
            {
                case 9:
                {
                    #region 9 цифров булстат
                    for (int i = 0; i < 8; i++)
                    {
                        // 1. Изчислява се сумата: 1*а1+2*а2+3*а3+4*а4+5*а5+6*а6+7*а7+8*а8, където а1 e първата цифра от ЕИК, а2 - втората и т.н.
                        checkSum += bulstatNumbers[i] * (i + 1);
                    }
                    // 2. Изчислява се остатъкът по модул 11 от сумата по т. 1
                    modulus = checkSum % 11;
                    if (modulus != 10)
                    {
                        // 3. Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с деветата цифра – те трябва да са равни.
                        if (modulus != bulstatNumbers[8])
                        {
                            base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                        }
                    }
                    else
                    {
                        checkSum = 0;
                        // 4. Ако остатъкът е 10
                        for (int i = 0; i < 8; i++)
                        {
                            // се изчислява сумата 3*а1+4*а2+5*а3+6*а4+7*а5+8*а6+9*а7+10*а8, където а1 e първата цифра от ЕИК, а2 - втората и т.н
                            checkSum += bulstatNumbers[i] * (i + 3);
                        }
                        // 5. Изчислява се остатъкът по модул 11 от новата сума (по т.4)
                        modulus = checkSum % 11;
                        if (modulus != 10)
                        {
                            // 6. Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с деветата цифра – те трябва да са равни
                            if (modulus != bulstatNumbers[8])
                            {
                                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                            }
                        }
                        else
                        {
                            // 7. Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с деветата цифра – те трябва да са равни.
                            if (0 != bulstatNumbers[8])
                            {
                                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                            }
                        }
                    }
                    #endregion
                    break;
                }
                case 10:
                {
                    #region 10 цифров булстат
                    // 1. Изчислява се сумата: 2*а1+4*а2+8*а3+5*а4+10*а5+9*а6+7*а7+3*а8 + 6*а9, където а1 e първата цифра от кода, а2 - втората и т.н.
                    checkSum = 2 * bulstatNumbers[0] + 4 * bulstatNumbers[1] + 8 * bulstatNumbers[2] + 5 * bulstatNumbers[3] + 10 * bulstatNumbers[4] + 9 * bulstatNumbers[5] + 7 * bulstatNumbers[6] + 3 * bulstatNumbers[7] + 6 * bulstatNumbers[8];
                    // 2. Изчислява се остатъкът по модул 11 от сумата по т. 1
                    modulus = checkSum % 11;
                    // 3. Ако остатъкът е различен от 10, то той се определя като контролно число. Ако остатъкът е десет - за контролно число се определя 0
                    modulus = modulus % 10;
                    if (modulus == bulstatNumbers[9])
                    {
                        return;
                    }
                    else
                    {
                        // 4. Ако контролното число по т. 3 не съвпада с 10-тата цифра се изчислява сумата: 21*а1+19*а2+17*а3+13*а4+11*а5+9*а6+7*а7+3*а8 + 1*а9 , където а1 e първата цифра от ЛНЧ, а2 - втората и т.н.
                        checkSum = 21 * bulstatNumbers[0] + 19 * bulstatNumbers[1] + 17 * bulstatNumbers[2] + 13 * bulstatNumbers[3] + 11 * bulstatNumbers[4] + 9 * bulstatNumbers[5] + 7 * bulstatNumbers[6] + 3 * bulstatNumbers[7] + 1 * bulstatNumbers[8];
                        //5. Изчислява се остатъкът по модул 11 от сумата по т. 5. Ако остатъкът е различен от 10, то той се определя като контролно число. Ако остатъкът е десет - за контролно число се определя 0.
                        modulus = (checkSum % 11) % 10;
                        // 6. Полученото по т.5 контролно число се сравнява с 10-тата цифра от кода. Ако не съвпадат се извежда съобщение за грешка, дефинирана с термин с УРИ R-0136
                        if (modulus != bulstatNumbers[9])
                        {
                            base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                        }
                    }
                    #endregion
                    break;
                }
                case 13:
                {
                    #region 13 цифров булстат
                    // 1. От първите осем цифри се изчислява контролно число по начина, описан за 9 цифров ЕИК/БУЛСТАТ и се сравнява с деветата цифра. Те трябва да са равни.
                    for (int i = 0; i < 8; i++)
                    {
                        // Изчислява се сумата: 1*а1+2*а2+3*а3+4*а4+5*а5+6*а6+7*а7+8*а8, където а1 e първата цифра от ЕИК, а2 - втората и т.н.
                        checkSum += bulstatNumbers[i] * (i + 1);
                    }
                    // Изчислява се остатъкът по модул 11 от сумата по т. 1
                    modulus = checkSum % 11;
                    if (modulus != bulstatNumbers[8])
                    {
                        // Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с деветата цифра – те трябва да са равни.
                        base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                    }
                    else
                    {
                        // 2.	Изчислява се сумата: 2*а9 + 7*а10 + 3*а11 +5*а12 , където а9 e деветата цифра от ЕИК, а10 - десетата и т.н.
                        checkSum = 2 * bulstatNumbers[8] + 7 * bulstatNumbers[9] + 3 * bulstatNumbers[10] + 5 * bulstatNumbers[11];
                        // 3.	Изчислява се остатъкът по модул 11 от сумата по т.2
                        modulus = checkSum % 11;
                        if (modulus != 10)
                        {
                            // 4. Ако остатъкът е различен от 10, се определя като контролно число и се сравнява с тринадесетата цифра – те трябва да са равни.
                            if (modulus != bulstatNumbers[12])
                            {
                                base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                            }
                        }
                        else
                        {
                            // 5. Ако остатъкът е 10, се изчислява сумата: 4*а9+9*а10+5*а11+7*а12, където а9 e деветата цифра от ЕИК, а10 - десетата и т.н.
                            checkSum = 4 * bulstatNumbers[8] + 9 * bulstatNumbers[9] + 5 * bulstatNumbers[10] + 7 * bulstatNumbers[11];
                            // 6.Изчислява се остатъкът по модул 11 от новата сума (по т.5)
                            modulus = checkSum % 11;
                            if (modulus != 10)
                            {
                                // 7. Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с тринадесетата цифра – те трябва да са равни
                                if (modulus != bulstatNumbers[12])
                                {
                                    base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                                }
                            }
                            else
                            {
                                // Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с тринадесетата цифра – те трябва да са равни. 
                                if (0 != bulstatNumbers[12])
                                {
                                    base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                                }
                            }
                        }
                    }
                    #endregion
                    break;
                }
                default:
                {
                    base.LogValidationResult(validationResults, this.GetMessage(objectToValidate, key), currentTarget, key);
                    break;
                }
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
