using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StructureMap;
using TechnoLogica.Eservices.AIS.Core.DTOs;
using TechnoLogica.Eservices.AIS.Core.IServices;
using TechnoLogica.Eservices.Common.PublicData;

namespace Eservices.AISClient
{
    public class PublicDataService
    {
        public Entity GetServiceProviderData()
        {
            IPublicDataService publicDataService = ObjectFactory.GetInstance<IPublicDataService>();
            var admInfo = publicDataService.GetAdministrationInfo();
            var result = new Entity { Id = admInfo.Bulstat, Name = admInfo.Name };
            return result;
        }

        public IEnumerable<Term> GetServiceTermTypes(string ns)
        {
            IPublicDataService publicDataService = ObjectFactory.GetInstance<IPublicDataService>();
            var serviceTermTypes = publicDataService.GetServiceTermTypes(ns);
            var result = from st in serviceTermTypes
                         select new Term()
                         {
                             Code = st.Code,
                             Key = st.Uri,
                             Name = st.Name
                         };
            return result.ToList();
        }

        public IEnumerable<Term> GetServiceResultReceiptMethods(string ns)
        {
            IPublicDataService publicDataService = ObjectFactory.GetInstance<IPublicDataService>();
            var serviceResultRcptMethods = publicDataService.GetServiceResultRcptMethods(ns);
            var result = from st in serviceResultRcptMethods 
                         select new Term()
                         {
                             Code = st.Code,
                             Key = st.Uri,
                             Name = st.Name
                         };
            return result.ToList();
        }

    }
}
