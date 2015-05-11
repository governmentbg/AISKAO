using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Eservices.AISClient;
using TechnoLogica.Eservices.Common.PublicData;

namespace Eservices.AIS.Public.Controllers
{
    public class ElectronicServiceProviderTypeController : ApiController
    {
        public Entity GetElectronicServiceProviderType()
        {
            var publicDataService = new PublicDataService();
            Entity entity = publicDataService.GetServiceProviderData();
            return entity;
        }
    }
}
