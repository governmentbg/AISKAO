using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web.Controllers
{
    //[BreezeController]
    public class NavalCompetencyCoursesController : EntitySetController<NavalCompetencyCourse, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<NavalCompetencyCourse> dpNavalCompetencyCourses = InitializeDataPackages.InitializeNavalCompetencyCourse();

        // GET api/foodSubGroups
        [Queryable]
        public override IQueryable<NavalCompetencyCourse> Get()
        {
            return dpNavalCompetencyCourses.AsQueryable();
        }
    }
}