using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TechnoLogica.Eservices.Common.ExceptionManagement
{
    public class BusinessException : Exception
    {

        private string _code;
        private string[] _customArguments;

        public string Code
        {
            get
            {
                return _code;
            }
        }

        public string[] CustomArguments
        {
            get { return _customArguments; }
        }

        public BusinessException(string code, params string[] customArguments)
        {
            _code = code;
            _customArguments = customArguments;
        }


    }
}
