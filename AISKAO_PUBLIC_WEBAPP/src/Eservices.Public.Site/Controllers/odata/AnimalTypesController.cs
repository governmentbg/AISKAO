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
    public class AnimalTypesController : EntitySetController<AnimalType, string>
    {

        //private static LoadDataPackages loadData = new LoadDataPackages();
        List<AnimalType> dpAnimalTypes = InitializeDataPackages.InitializeAnimalTypes();

        // GET api/animalTypes
        [Queryable]
        public override IQueryable<AnimalType> Get()
        {
            return dpAnimalTypes.AsQueryable();
        }
    }
}
