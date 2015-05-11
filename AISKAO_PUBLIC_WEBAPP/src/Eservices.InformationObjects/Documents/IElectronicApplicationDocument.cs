using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TechnoLogica.Eservices.InformationObjects.Documents
{
    public interface IElectronicApplicationDocument : IInformationObject
    {
        ElectronicAdministrativeServiceHeader ElectronicAdministrativeServiceHeader
        {
            get;
            set;
        }

        ServiceApplicantReceiptData ServiceApplicantReceiptData
        {
            get;
            set;
        }

        List<object> AttachedDocuments
        {
            get;
            set;
        }

        ElectronicAdministrativeServiceFooter ElectronicAdministrativeServiceFooter
        {
            get;
            set;
        }

        bool ElectronicAdministrativeServiceHeaderSpecified
        {
            get;
            set;
        }

        bool ServiceApplicantReceiptDataSpecified
        {
            get;
            set;
        }

        bool ElectronicAdministrativeServiceFooterSpecified
        {
            get;
            set;
        }

        string Serialize();
    }
}
