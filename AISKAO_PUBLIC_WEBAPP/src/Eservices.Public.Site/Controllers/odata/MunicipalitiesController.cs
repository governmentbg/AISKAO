using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.OData;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.Common;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web.Controllers
{
    public class MunicipalitiesController : EntitySetController<Municipality, string>
    {
        List<Municipality> dpMunicipalities = InitializeDataPackages.InitializeMunicipalities();


        // GET api/disticts
        [Queryable]
        public override IQueryable<Municipality> Get()
        {
            //Thread.Sleep(3000);
            return dpMunicipalities.AsQueryable();
        }
    }
}
