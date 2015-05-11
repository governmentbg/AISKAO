using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на начините за заявяване на услуга към външни системи в рамките на етап
    /// </summary>
    public enum ServiceStageExternalServiceType
    {
        /// <summary>
        /// ЕСОЕД
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceStageExternalServiceTypeUEEED")]
        UEEED,

        /// <summary>
        /// RegiX
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceStageExternalServiceTypeREGIX")]
        REGIX
    }
}
