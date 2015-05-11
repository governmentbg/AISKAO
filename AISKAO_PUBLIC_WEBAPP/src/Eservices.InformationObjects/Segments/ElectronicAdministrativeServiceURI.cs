using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace TechnoLogica.Eservices.InformationObjects
{
    public partial class ElectronicAdministrativeServiceURI
    {
        public ElectronicAdministrativeServiceURI()
        { }

        public ElectronicAdministrativeServiceURI(string serviceURI)
        {
            if (string.IsNullOrWhiteSpace(serviceURI))
            {
                // TODO: Да се оправи Exception-а
                throw new ApplicationException("Parameter serviceURI cannot be null or empty!");
            }
            Regex regex = new Regex("(?<RegisterIndex>[0-9]+)-(?<BatchNumber>[0-9]+)-(?<Date>([1-9]|0[1-9]|1[012])[.]([1-9]|0[1-9]|[12][0-9]|3[01])[.][0-9]{4})");
            Match match = regex.Match(serviceURI);
            if (match == null)
            {
                // TODO: Да се оправи Exception-а
                throw new ApplicationException("Parameter serviceURI is not in the correct format!");
            }
            RegisterIndex = match.Groups["RegisterIndex"].ToString();
            BatchNumber = match.Groups["BatchNumber"].ToString();
        }
    }
}

