using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на резултатите от проверката
    /// </summary>
    public enum AISCertificationCheckResultType
    {
        /// <summary>
        /// Наименование: Съответства на изискванията
        /// 
        /// Обозначава успешен резултат от проверка
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "R0607")]
        [XmlEnum("0006-000070")]
        Complies,
        
        /// <summary>
        /// Наименование: Не съответства на изискванията
        /// 
        /// Обозначава неуспешен резултат от проверка
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "R0608")]
        [XmlEnum("0006-000071")]
        DoesNotComply

    }
}
