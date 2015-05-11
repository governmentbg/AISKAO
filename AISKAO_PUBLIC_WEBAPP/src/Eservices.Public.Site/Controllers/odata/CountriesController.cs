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
    public class CountriesController : EntitySetController<Country, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<Country> dpCountries = InitializeDataPackages.InitializeCountries();

        // GET api/disticts
        [Queryable]
        public override IQueryable<Country> Get()
        {
            return dpCountries.AsQueryable();
        }
    }
}