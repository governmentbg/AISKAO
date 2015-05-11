using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете раздели от класификационна схема
    /// </summary>
    public enum ClassificationSchemeSectionType
    {
        /// <summary>
        /// Наименование: От постоянен тип
        /// 
        /// За определяне на постоянни раздели от класификационна схема
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000041")]
        [XmlEnum("0006-000041")]
        Constant,

        /// <summary>
        /// Наименование: от променлив тип
        /// 
        /// За определяне на раздели от променлив тип от класификационна схема
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000042")]
        [XmlEnum("0006-000042")]
        Variable
    }
}