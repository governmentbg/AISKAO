using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    public enum ApplicationType
    {
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000121")]
        [XmlEnum("0006-000121")]
        InitialRequest,

        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000122")]
        [XmlEnum("0006-000122")]
        AdditionalInfo,

        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000123")]
        [XmlEnum("0006-000123")]
        AdditionalInfoForAmendment
    }
}
