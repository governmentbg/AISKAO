using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ElectronicServiceProviderBasicDataMD
    {
        //[DisplayFormat(DataFormatString = "{0}, {1} {2}", ApplyFormatInEditMode = false)]

        [ObjectValidator]
        [Display(ResourceType = typeof(Resources.Sections), Name = "R0079")]
        public object EntityBasicData { get; set; }

        [Display(ResourceType = typeof(Resources.Fields), Name = "R0148")]
        [NomenclatureRestricted(typeof(Nomenclatures.ElectronicServiceProviderType),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0148")]
        [RequiredInSection(typeof(ElectronicServiceProviderBasicData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0148")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000002_ElectronicServiceProviderType",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object ElectronicServiceProviderType { get; set; }
    }
}
