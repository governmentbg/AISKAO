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
    public class ServiceResultReceiptMethodController : ApiController
    {
        public IEnumerable<Term> GetAllServiceResultReceiptMethods(string ns)
        {
            var publicDataService = new PublicDataService();
            IEnumerable<Term> terms = publicDataService.GetServiceResultReceiptMethods(ns);

            return terms;
        }
    }
}
