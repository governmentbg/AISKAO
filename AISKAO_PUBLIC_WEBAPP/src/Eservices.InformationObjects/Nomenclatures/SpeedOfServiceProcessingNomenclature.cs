using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете обработка на услуга
    /// </summary>
    public enum SpeedOfServiceProcessingNomenclature
    {      
        [Display(ResourceType = typeof(Resources.Terms), Name = "R9072")]
        Normal,
        [Display(ResourceType = typeof(Resources.Terms), Name = "R9073")]
        Fast,
        [Display(ResourceType = typeof(Resources.Terms), Name = "R9074")]
        Express,
    }
}
