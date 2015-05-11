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
    public class SeaWorkCompetenciesController : EntitySetController<SeaWorkCompetency, string>
    {
        // GET api/animalCategories
        [Queryable]
        public override IQueryable<SeaWorkCompetency> Get()
        {
            var filter = this.QueryOptions.Request.GetQueryNameValuePairs();
            List<SeaWorkCompetency> dpSeaWorkCompetencies = InitializeDataPackages.InitializeSeaWorkCompetency(filter.ToList().Find(prop => prop.Key.Equals("groupCode")).Value);
            return dpSeaWorkCompetencies.AsQueryable();
        }
    }
}
