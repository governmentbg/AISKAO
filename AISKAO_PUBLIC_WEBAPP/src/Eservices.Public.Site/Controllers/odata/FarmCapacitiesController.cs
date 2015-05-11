using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web.Controllers.odata
{
    public class FarmCapacitiesController : EntitySetController<FarmCapacity, string>
    {

        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<FarmCapacity> dpFarmCapacities = InitializeDataPackages.InitializeFarmCapacities();

        // GET api/farmCapacities
        [Queryable]
        public override IQueryable<FarmCapacity> Get()
        {
            return dpFarmCapacities.AsQueryable();
        }
    }
}
