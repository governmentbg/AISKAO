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
    public class AnimalPurposesController : EntitySetController<AnimalPurpose, string>
    {

        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<AnimalPurpose> dpAnimalPurposes = InitializeDataPackages.InitializeAnimalPurposes();

        // GET api/animalCategories
        [Queryable]
        public override IQueryable<AnimalPurpose> Get()
        {
            return dpAnimalPurposes.AsQueryable();
        }
    }
}
