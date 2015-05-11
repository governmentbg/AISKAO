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
    public class MayoraltiesController : EntitySetController<Mayoralty, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<Mayoralty> dpMayoralties = InitializeDataPackages.InitializeMayoralties();

        // GET api/disticts
        [Queryable]
        public override IQueryable<Mayoralty> Get()
        {
            return dpMayoralties.AsQueryable();
        }
    }
}
