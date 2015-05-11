using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете имот
    /// </summary>
    public enum RealEstateType
    {
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000158")]
        [XmlEnum(Name = "0006-000158")]
        Land,
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000159")]
        [XmlEnum(Name = "0006-000159")]
        Building,
        [XmlEnum(Name = "0006-000160")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000160")]
        IndividualUnitInBuilding,
    }
}
