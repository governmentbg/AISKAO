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
    public class NavalEducationalOrganizationsController : EntitySetController<NavalEducationalOrganization, string>
    {
        List<NavalEducationalOrganization> dpNavalEducationalOrganizations = InitializeDataPackages.InitializeNavalEducationalOrganization();


        // GET api/disticts
        [Queryable]
        public override IQueryable<NavalEducationalOrganization> Get()
        {
            //Thread.Sleep(3000);
            return dpNavalEducationalOrganizations.AsQueryable();
        }
    }
}
