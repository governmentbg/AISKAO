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

    public class IAMADirectoratesController : EntitySetController<IAMADirectorate, string>
    {
        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<IAMADirectorate> dpDirectorate = InitializeDataPackages.InitializeIAMADirectorate();


        // GET api/disticts
        [Queryable]
        public override IQueryable<IAMADirectorate> Get()
        {
            //Thread.Sleep(3000);
            return dpDirectorate.AsQueryable();
        }
    }
}
