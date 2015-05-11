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
    public class ServiceTermTypesController : ApiController
    {
        public IEnumerable<Term> GetServiceTermTypesPerNamespace(string ns)
        {
            var publicDataService = new PublicDataService();
            IEnumerable<Term> terms = publicDataService.GetServiceTermTypes(ns);

            return terms;
        }
    }
}