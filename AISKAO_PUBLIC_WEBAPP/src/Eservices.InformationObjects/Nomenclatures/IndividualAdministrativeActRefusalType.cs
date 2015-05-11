using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    public enum IndividualAdministrativeActRefusalType
    {
        [Display(ResourceType = typeof(Resources.Terms), Name = "R1214")]
        OrderForRefusal,

        [Display(ResourceType = typeof(Resources.Terms), Name = "R1215")]
        SolutionForRefusal
    }
}
