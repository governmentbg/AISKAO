using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.IO;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    class Common
    {
        private static string _path;

        public static string StartupPath
        {
            get
            {
                if (string.IsNullOrEmpty(_path))
                {
                    _path = Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName);
                }
                return _path;
            }
        }
    }
}
