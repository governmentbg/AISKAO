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
    public class FoodItemController : EntitySetController<FoodItem, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        //List<FoodItem> dpFoodItems = InitializeDataPackages.InitializeFoodItem();

        // GET api/foodItems
        [Queryable]
        public override IQueryable<FoodItem> Get()
        {
            var filter = this.QueryOptions.Request.GetQueryNameValuePairs();
            var foodGroup = filter.ToList().Find(prop => prop.Key.Equals("foodGroupCode")).Value;
            var foodPurpose = filter.ToList().Find(prop => prop.Key.Equals("foodPurpose")).Value;
            List<FoodItem> dpFoodItems = new List<FoodItem>();
            if (foodGroup != null)
            {
                dpFoodItems = InitializeDataPackages.InitializeFoodItem(foodGroup);
            }
            if (foodPurpose != null)
            {
                dpFoodItems = InitializeDataPackages.InitializeFoodItemsPerPurpose(foodPurpose);
            }
            return dpFoodItems.AsQueryable();
        }
    }
}