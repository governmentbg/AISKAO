using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Caching;
using System.Web.Http;
using System.Web.Http.OData;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.Common;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web.Controllers
{
    //[BreezeController]
    public class DistrictsController : EntitySetController<District, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<District> testDistricts = InitializeDataPackages.InitializeDistricts();

        // GET api/disticts
        [Queryable]
        public override IQueryable<District> Get()
        {
            return testDistricts.AsQueryable();
        }
    }
}
