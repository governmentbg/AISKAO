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
    public class FoodSubGroupsController : EntitySetController<FoodSubGroup, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        //List<FoodSubGroup> dpFoodSubGroups = InitializeDataPackages.InitializeFoodSubGroups();

        // GET api/foodSubGroups
        [Queryable]
        public override IQueryable<FoodSubGroup> Get()
        {
            var filter = this.QueryOptions.Request.GetQueryNameValuePairs();
            List<FoodSubGroup> dpFoodSubGroups = InitializeDataPackages.InitializeFoodSubGroups(filter.ToList().Find(prop => prop.Key.Equals("foodGroupCode")).Value);
           
            return dpFoodSubGroups.AsQueryable();
        }
    }
}