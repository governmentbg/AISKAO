using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using Microsoft.Data.Edm;
using Newtonsoft.Json.Serialization;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web
{
    public static class DocumentEditorConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.Formatters.Remove(config.Formatters.XmlFormatter);

            Microsoft.Data.Edm.IEdmModel model = GetEdmModel();
            config.Routes.MapODataRoute("ODataRoute", "odata", model);
        }

        public static IEdmModel GetEdmModel()
        {
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            var countryConfig = builder.EntitySet<Country>("Countries");
            countryConfig.EntityType.HasKey<string>(e => e.Code);
            var districtConfig = builder.EntitySet<District>("Districts");
            districtConfig.EntityType.HasKey<string>(e => e.Code);
            var municipalityConfig = builder.EntitySet<Municipality>("Municipalities");
            municipalityConfig.EntityType.HasKey<string>(e => e.Code);
            var settlementsConfig = builder.EntitySet<Settlement>("Settlements");
            settlementsConfig.EntityType.HasKey<string>(e => e.Code);
            var mayoraltiesConfig = builder.EntitySet<Mayoralty>("Mayoralties");
            mayoraltiesConfig.EntityType.HasKey<string>(e => e.Code);
            var areasConfig = builder.EntitySet<Area>("Areas");
            areasConfig.EntityType.HasKey<string>(e => e.Code);
            var directoratesConfig = builder.EntitySet<IAMADirectorate>("IAMADirectorates");
            directoratesConfig.EntityType.HasKey<string>(e => e.Code);
            var directionsConfig = builder.EntitySet<Direction>("Directions");
            directionsConfig.EntityType.HasKey<string>(e => e.Code);
   
            var animalTypesConfig = builder.EntitySet<AnimalType>("AnimalTypes");
            animalTypesConfig.EntityType.HasKey<string>(e => e.Code);
            var animalCategoriesConfig = builder.EntitySet<AnimalCategory>("AnimalCategories");
            animalCategoriesConfig.EntityType.HasKey<string>(e => e.Code);
            var animalPurposesConfig = builder.EntitySet<AnimalPurpose>("AnimalPurposes");
            animalPurposesConfig.EntityType.HasKey<string>(e => e.Code);
            var animalRisingTechnologiesConfig = builder.EntitySet<AnimalRisingTechnology>("AnimalRisingTechnologies");
            animalRisingTechnologiesConfig.EntityType.HasKey<string>(e => e.Code);
            var farmCapacitiesConfig = builder.EntitySet<FarmCapacity>("FarmCapacities");
            farmCapacitiesConfig.EntityType.HasKey<string>(e => e.Code);
            var animalProductionTypesConfig = builder.EntitySet<AnimalProductionType>("AnimalProductionTypes");
            animalProductionTypesConfig.EntityType.HasKey<string>(e => e.Code);
            var foodGroupsConfig = builder.EntitySet<FoodGroup>("FoodGroups");
            foodGroupsConfig.EntityType.HasKey<string>(e => e.Code);
            var foodSubGroupsConfig = builder.EntitySet<FoodSubGroup>("FoodSubGroups");
            foodSubGroupsConfig.EntityType.HasKey<string>(e => e.Code);
            var foodItemConfig = builder.EntitySet<FoodItem>("FoodItem");
            foodItemConfig.EntityType.HasKey<string>(e => e.Name);
            var foodItemsConfig = builder.EntitySet<FoodItems>("FoodItems");
            foodItemsConfig.EntityType.HasKey<string>(e => e.Name);
            var navalEducationalOrganizationsConfig = builder.EntitySet<NavalEducationalOrganization>("NavalEducationalOrganizations");
            navalEducationalOrganizationsConfig.EntityType.HasKey<string>(e => e.Code);
            var navalCompetencyCoursesConfig = builder.EntitySet<NavalCompetencyCourse>("NavalCompetencyCourses");
            navalCompetencyCoursesConfig.EntityType.HasKey<string>(e => e.Code);
            var certificateIssuingCitiesConfig = builder.EntitySet<CertificateIssuingCity>("CertificateIssuingCities");
            certificateIssuingCitiesConfig.EntityType.HasKey<string>(e => e.Code);
            var seaWorkCompetencyGroupsConfig = builder.EntitySet<SeaWorkCompetencyGroup>("SeaWorkCompetencyGroups");
            seaWorkCompetencyGroupsConfig.EntityType.HasKey<string>(e => e.Code);
            var seaWorkCompetenciesConfig = builder.EntitySet<SeaWorkCompetency>("SeaWorkCompetencies");
            seaWorkCompetenciesConfig.EntityType.HasKey<string>(e => e.Name);

            var documentConfig = builder.EntitySet<Document>("Documents");
            documentConfig.EntityType.HasKey<int>(e => e.Id);
            ActionConfiguration dicumentValidation = builder.Entity<Document>().Collection.Action("ValidateXML");
            dicumentValidation.Parameter<string>("documentContent");
            dicumentValidation.Returns<object>();

            builder.Namespace = "TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models";  // DON'T FORGET THIS!
            
            return builder.GetEdmModel();
        }
    }
}
