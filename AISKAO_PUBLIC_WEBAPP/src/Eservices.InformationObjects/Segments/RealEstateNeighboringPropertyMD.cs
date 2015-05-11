using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class RealEstateNeighboringPropertyMD
    {
        [LocalizedDisplayName(
            DisplayNameResourceName="_0009_000201_NeighboringPropertyDirection",
            DisplayNameResourceType=typeof(Resources.Visualisation))]
        public object NeighboringPropertyDirection { get; set; }
        
        [ObjectValidator]
        public object RealEstateCadastreIdentifier { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000201_NeighboringPropertyDescription",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object NeighboringPropertyDescription { get; set; }
    }
}
