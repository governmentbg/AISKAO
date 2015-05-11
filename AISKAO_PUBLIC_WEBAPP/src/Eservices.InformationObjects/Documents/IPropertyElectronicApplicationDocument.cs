using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TechnoLogica.Eservices.InformationObjects.Documents
{
    public interface IPropertyElectronicApplicationDocument : IElectronicApplicationDocument
    {
        StateAndMunicipalPropertyIdentifyingData StateAndMunicipalPropertyIdentifyingData
        {
            get;
            set;
        }
        bool StateAndMunicipalPropertyIdentifyingDataSpecified
        {
            get;
            set;
        }
    }
}
