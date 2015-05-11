using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(StateAndMunicipalPropertyIdentifyingDataMD))]
    public partial class StateAndMunicipalPropertyIdentifyingData : IInformationObject
    {
        private bool realEstateAddressFieldSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool RealEstateAddressSpecified
        {
            get
            {
                return this.realEstateAddressFieldSpecified;
            }
            set
            {
                if ((realEstateAddressFieldSpecified.Equals(value) != true))
                {
                    this.realEstateAddressFieldSpecified = value;
                    this.OnPropertyChanged("RealEstateAddressSpecified");
                }
            }
        }
        
        private bool landPropertyOldIdentifierFieldSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool LandPropertyOldIdentifierSpecified
        {
            get
            {
                return this.landPropertyOldIdentifierFieldSpecified;
            }
            set
            {
                if ((landPropertyOldIdentifierFieldSpecified.Equals(value) != true))
                {
                    this.landPropertyOldIdentifierFieldSpecified = value;
                    this.OnPropertyChanged("LandPropertyOldIdentifierSpecified");
                }
            }
        }

        private bool actIdentifierFieldSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ActIdentifierSpecified
        {
            get
            {
                return this.actIdentifierFieldSpecified;
            }
            set
            {
                if ((actIdentifierFieldSpecified.Equals(value) != true))
                {
                    this.actIdentifierFieldSpecified = value;
                    this.OnPropertyChanged("ActIdentifierSpecified");
                }
            }
        }

        private bool realEstateNeighboringPropertiesSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool RealEstateNeighboringPropertiesSpecified
        {
            get
            {
                return this.realEstateNeighboringPropertiesSpecified;
            }
            set
            {
                if ((realEstateNeighboringPropertiesSpecified.Equals(value) != true))
                {
                    this.realEstateNeighboringPropertiesSpecified = value;
                    this.OnPropertyChanged("RealEstateNeighboringPropertiesSpecified");
                }
            }
        }

        private bool realEstateAdditionalInformationSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool RealEstateAdditionalInformationSpecified
        {
            get
            {
                return this.realEstateAdditionalInformationSpecified;
            }
            set
            {
                if ((realEstateAdditionalInformationSpecified.Equals(value) != true))
                {
                    this.realEstateAdditionalInformationSpecified = value;
                    this.OnPropertyChanged("RealEstateAdditionalInformationSpecified");
                }
            }
        }
        
        private bool realEstateBatchNumberSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool RealEstateBatchNumberSpecified
        {
            get
            {
                return this.realEstateBatchNumberSpecified;
            }
            set
            {
                if ((realEstateBatchNumberSpecified.Equals(value) != true))
                {
                    this.realEstateBatchNumberSpecified = value;
                    this.OnPropertyChanged("RealEstateBatchNumberSpecified");
                }
            }
        }
        
        private bool accordingToDocumentsQuadratureSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool AccordingToDocumentsQuadratureSpecified
        {
            get
            {
                return this.accordingToDocumentsQuadratureSpecified;
            }
            set
            {
                if ((accordingToDocumentsQuadratureSpecified.Equals(value) != true))
                {
                    this.accordingToDocumentsQuadratureSpecified = value;
                    this.OnPropertyChanged("AccordingToDocumentsQuadratureSpecified");
                }
            }
        }
        
        private bool realQuadratureSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool RealQuadratureSpecified
        {
            get
            {
                return this.realQuadratureSpecified;
            }
            set
            {
                if ((realQuadratureSpecified.Equals(value) != true))
                {
                    this.realQuadratureSpecified = value;
                    this.OnPropertyChanged("RealQuadratureSpecified");
                }
            }
        }

        [SelfValidation]
        public void PropertyIdentifyingDataValidation(ValidationResults results)
        {
            string msg;

            if (!this.RealEstateTypeSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000289, Resources.Sections._0009_000202);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.RealEstateAddressSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000195, Resources.Sections._0009_000202);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }

        //TODO: Да се оправи ToString метода според новия клас 
        // (стария беше RealEstateBasicData, сега има нов клас StateAndMunicipalPropertyIdentifyingData)
        public override string ToString()
        {
            string result = string.Empty;

            return result;
            /*
            result += (this.RealEstateType != null) ? Environment.NewLine
                + "Вид на имота:" + Environment.NewLine
                + this.RealEstateType.GetDisplay(RealEstateType.ToString()) : string.Empty;

            result += !string.IsNullOrEmpty(DistrictName) ? Environment.NewLine
                + "Област:" + Environment.NewLine
                + this.DistrictName.ToString() : string.Empty;
            result += !string.IsNullOrEmpty(MunicipalityName) ? Environment.NewLine
                + "Община:" + Environment.NewLine
                + this.MunicipalityName.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.SettlementName) ? Environment.NewLine
                + "Населено място:" + Environment.NewLine
                + this.SettlementName.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.MayoraltyName) ? Environment.NewLine
                + "Кмество:" + Environment.NewLine
                + this.MayoraltyName.ToString() : string.Empty;
            
            result += !string.IsNullOrEmpty(this.RealEstateAreal) ? Environment.NewLine
                + "Местност:" + Environment.NewLine
                + this.RealEstateAreal.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.RealEstateBorders) ? Environment.NewLine
                + "Граници на имота:" + Environment.NewLine
                + this.RealEstateBorders.ToString() : string.Empty;
            
            result += !string.IsNullOrEmpty(this.AddressDescription) ? Environment.NewLine
                + "Адрес:" + Environment.NewLine
                + this.AddressDescription.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.OldCadastreIdentifier) ? Environment.NewLine
                + "Стар кадастрален номер:" + Environment.NewLine
                + this.OldCadastreIdentifier.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.CadastreIdentifier) ? Environment.NewLine
                + "Кадастрален номер:" + Environment.NewLine
                + this.CadastreIdentifier.ToString() : string.Empty;
                        
            result += !string.IsNullOrEmpty(this.PublicRealEstateActNumber) ? Environment.NewLine
                + "Номер на акт за имота:" + Environment.NewLine
                + this.PublicRealEstateActNumber.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.RealEstateBatchNumber) ? Environment.NewLine
                + "Номер на имотна партида:" + Environment.NewLine
                + this.RealEstateBatchNumber.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.EstateDescription) ? Environment.NewLine
                + "Описание на имота:" + Environment.NewLine
                + this.EstateDescription.ToString() : string.Empty;

            return result;*/

        }
    }
}
