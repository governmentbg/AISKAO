using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;
using System.Web.Http.OData.Query;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web.Controllers
{
    //[BreezeController]
    public class FoodGroupsController : EntitySetController<FoodGroup, string>
    {
        // GET api/foodGroups
        [Queryable]
        public override IQueryable<FoodGroup> Get()
        {
            var filter = this.QueryOptions.Request.GetQueryNameValuePairs();
            List<FoodGroup> dpFoodGroups = InitializeDataPackages.InitializeFoodGroups(filter.ToList().Find(prop => prop.Key.Equals("foodPurpose")).Value);
            return dpFoodGroups.AsQueryable();
        }
    }
}