using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на статусите на задача
    /// </summary>
    public enum AISTaskStatus
    {
        /// <summary>
        /// Наименование: Изпълнена
        /// 
        /// За определяне на изпълнени задачи в АИС
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000047")]
        [XmlEnum("0006-000047")]
        Completed = 1,

        /// <summary>
        /// Наименование: Неизпълнена
        /// 
        /// За определяне на неизпълнени задачи в АИС
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000048")]
        [XmlEnum("0006-000048")]
        NotCompleted = 2,

        /// <summary>
        /// Наименование: В изпълнение
        /// 
        /// За определяне в АИС на задачи в процес на изпълнение
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000049")]
        [XmlEnum("0006-000049")]
        InProgress = 3
    }
}
