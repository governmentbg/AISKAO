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
    public class FoodItemsController : EntitySetController<FoodItems, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        //List<FoodItems> dpFoodItems = InitializeDataPackages.InitializeFoodItems();

        // GET api/foodItems
        [Queryable]
        public override IQueryable<FoodItems> Get()
        {
            var filter = this.QueryOptions.Request.GetQueryNameValuePairs();
            var subGroupCode= filter.ToList().Find(prop => prop.Key.Equals("foodSubGroupCode")).Value;
            var groupCode =filter.ToList().Find(prop => prop.Key.Equals("foodGroupCode")).Value;
            List<FoodItems> dpFoodItems = InitializeDataPackages.InitializeFoodItems(subGroupCode, groupCode);
            return dpFoodItems.AsQueryable();
        }
    }
}