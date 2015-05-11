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
    public class DirectionsController : EntitySetController<Direction, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<Direction> dpDirections = InitializeDataPackages.InitializeDirections();

        // GET api/directions
        [Queryable]
        public override IQueryable<Direction> Get()
        {
            return dpDirections.AsQueryable();
        }
    }
}