using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects
{
    public class AttachedDocumentMD
    {
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000139_AttachedDocumentDescription",
            DisplayNameResourceType =typeof(Resources.Visualisation))]
        [RequiredInSection(typeof(AttachedDocument),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000133")]
        public object AttachedDocumentDescription { get; set; }
       
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000139_AttachedDocumentFileName",
            DisplayNameResourceType =typeof(Resources.Visualisation))]
        [RequiredInSection(typeof(AttachedDocument),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000135")]
        public object AttachedDocumentFileName { get; set; }
        
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000139_FileType",
            DisplayNameResourceType =typeof(Resources.Visualisation))]
        [CharsAllowed("^[A-Za-z0-9+./-]*$", "букви на латиница, цифри и символите \"/\", \"-\", \"+\", \".\"",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000041")]
        public object FileType { get; set; }
        
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000139_AttachedDocumentUniqueIdentifier",
            DisplayNameResourceType =typeof(Resources.Visualisation))]
        public object AttachedDocumentUniqueIdentifier { get; set; }

        [RequiredInSection(typeof(AttachedDocument),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000132")]
        public object AttachedDocumentFileContent { get; set; }
    }
}
