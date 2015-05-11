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
    public class SeaWorkCompetencyGroupsController : EntitySetController<SeaWorkCompetencyGroup, string>
    {

        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<SeaWorkCompetencyGroup> dpSeaWorkCompetencyGroups = InitializeDataPackages.InitializeSeaWorkCompetencyGroup();

        // GET api/animalCategories
        [Queryable]
        public override IQueryable<SeaWorkCompetencyGroup> Get()
        {
            return dpSeaWorkCompetencyGroups.AsQueryable();
        }
    }
}
