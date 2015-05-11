using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Изброена стойност за типа заключване
    /// </summary>
    public enum ObjectLockType
    {
        /// <summary>
        /// Заключен обект
        /// </summary>
        [Display(ResourceType = typeof(Resources.Nomenclatures), Name = "Locked")]
        Locked,
        /// <summary>
        /// Отключен обект
        /// </summary>
        [Display(ResourceType = typeof(Resources.Nomenclatures), Name = "UnLocked")]
        UnLocked
    }
}
