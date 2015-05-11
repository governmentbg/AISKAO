using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class StateAndMunicipalPropertyIdentifyingDataMD
    {
        [RequiredInSection(typeof(StateAndMunicipalPropertyIdentifyingData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000289")]
        [NomenclatureRestricted(typeof(RealEstateType),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000289")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000202_RealEstateType",
            DisplayNameResourceType=typeof(Resources.Visualisation))]
        public object RealEstateType { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(StateAndMunicipalPropertyIdentifyingData),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000195")]
        [LocalizedDisplayName(
            DisplayNameResourceName="_0009_000202_RealEstateAddress",
            DisplayNameResourceType=typeof(Resources.Visualisation))]
        public object RealEstateAddress { get; set; }

        [ObjectValidator]
        public object RealEstateCadastreIdentifier { get; set; }

        [ObjectValidator]
        public object LandPropertyOldIdentifier { get; set; }

        [ObjectValidator]
        public object ActIdentifier { get; set; }

        [ObjectCollectionValidator]
        public object RealEstateNeighboringProperties { get; set; }
        
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000202_RealEstateBatchNumber",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object RealEstateBatchNumber { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000202_AccordingToDocumentsQuadrature",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object AccordingToDocumentsQuadrature { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000202_RealQuadrature",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object RealQuadrature { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000202_RealEstateAdditionalInformation",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object RealEstateAdditionalInformation { get; set; }
    }
}
