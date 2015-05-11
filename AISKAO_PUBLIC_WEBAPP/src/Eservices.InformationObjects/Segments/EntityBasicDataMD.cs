using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class EntityBasicDataMD
    {
        [Display(ResourceType = typeof(Resources.Fields), Name = "R0077")]
        [RequiredInSection(typeof(EntityBasicData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0077")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000013_Name",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public string Name { get; set; }

        [Display(ResourceType = typeof(Resources.Fields), Name = "R0075")]
        [BulstatUICAttribute]
        [RequiredInSection(typeof(EntityBasicData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0075")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000013_Identifier",
            DisplayNameResourceType=typeof(Resources.Visualisation))]
        public string Identifier { get; set; }
    }
}
