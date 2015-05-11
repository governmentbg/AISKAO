using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Xml.Linq;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages
{
    public static class LoadDataPackages
    {

        #region Countries
        public static List<Country> GetCountries(out string fileLocation)
        {
            List<Country> result = new List<Country>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\CountriesData.xml";

            string countriesXmlString = File.ReadAllText(path + "\\DataPackages\\CountriesData.xml");
            XDocument countriesXml = XDocument.Parse(countriesXmlString);

            var ns = countriesXml.Root.Name.Namespace;
            result = (from countries in countriesXml.Element(ns + "CountryData")
                                                   .Element(ns + "Countries")
                                                   .Elements(ns + "Country")
                      select new Country()
                      {
                          Code = countries.Element(ns + "Code").Value,
                          Name = countries.Element(ns + "Name").Value
                      }).ToList();

            return result;
        }
        #endregion

        #region Distircts

        public static List<District> GetDistricts(out string fileLocation)
        {
            List<District> result = new List<District>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml";

            string districtsXmlString = File.ReadAllText(path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml");
            XDocument districtsXml = XDocument.Parse(districtsXmlString);

            var ns = districtsXml.Root.Name.Namespace;
            result = (from district in districtsXml.Element(ns + "AdministrativeTerritorialUnitData")
                                                   .Element(ns + "Districts")
                                                   .Elements(ns + "District")
                      select new District()
                      {
                          Code = district.Element(ns + "Code").Value,
                          MainSettlement = district.Element(ns + "MainSettlement").Value,
                          SecondLevelRegionCode = district.Element(ns + "SecondLevelRegionCode").Value,
                          Name = district.Element(ns + "Name").Value
                      }).ToList();

            return result;
        }
        #endregion

        #region Municipalities

        public static List<Municipality> GetMunicipalities(out string fileLocation)
        {
            List<Municipality> result = new List<Municipality>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml";

            string municipalitiesXmlString = File.ReadAllText(path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml");
            XDocument municipalitiesXml = XDocument.Parse(municipalitiesXmlString);

            var ns = municipalitiesXml.Root.Name.Namespace;
            result = (from s in municipalitiesXml.Element(ns + "AdministrativeTerritorialUnitData")
                                                   .Element(ns + "Settlements")
                                                   .Elements(ns + "Settlement")
                      group s by new { districtCode = s.Element(ns + "DistrictCode").Value, municipalityCode = s.Element(ns + "MunicipalityCode").Value } into settlements
                      join municipalities in municipalitiesXml.Element(ns + "AdministrativeTerritorialUnitData")
                                                   .Element(ns + "Municipalities")
                                                   .Elements(ns + "Municipality")
                      on settlements.Key.municipalityCode equals municipalities.Element(ns + "Code").Value
                      //where settlements.Element(ns + "DistrictCode").Equals(districtCode)     
                      select new Municipality()
                      {
                          Code = municipalities.Element(ns + "Code").Value,
                          MainSettlement = municipalities.Element(ns + "MainSettlement").Value,
                          Name = municipalities.Element(ns + "Name").Value,
                          Category = municipalities.Element(ns + "Category").Value,
                          DistrictCode = settlements.Key.districtCode
                      }).Distinct().OrderBy(p => p.Name).ToList();

            return result;
        }

        #endregion

        #region Settlements

        public static List<Settlement> GetSettlements(out string fileLocation)
        {
            List<Settlement> result = new List<Settlement>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml";

            string municipalitiesXmlString = File.ReadAllText(path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml");
            XDocument municipalitiesXml = XDocument.Parse(municipalitiesXmlString);

            var ns = municipalitiesXml.Root.Name.Namespace;
            var municapalities = (from district in municipalitiesXml.Element(ns + "AdministrativeTerritorialUnitData")
                                                   .Element(ns + "Municipalities")
                                                   .Elements(ns + "Municipality")
                                  select new Settlement()
                                  {
                                      Code = district.Element(ns + "Code").Value,
                                      MainSettlement = district.Element(ns + "MainSettlement").Value,
                                      Name = district.Element(ns + "Name").Value,
                                      Category = district.Element(ns + "Category").Value
                                  }).ToList();

            string ekkateXmlString = File.ReadAllText(path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml");
            XDocument ekkatesXml = XDocument.Parse(ekkateXmlString);

            ns = ekkatesXml.Root.Name.Namespace;
            List<Settlement> ekatteSettlements = (from ekkate in ekkatesXml.Element(ns + "AdministrativeTerritorialUnitData")
                                                                                  .Element(ns + "Settlements")
                                                                                  .Elements(ns + "Settlement")
                                                  join m in municapalities on ekkate.Element(ns + "MunicipalityCode").Value equals m.Code into lj
                                                  from mj in lj.DefaultIfEmpty()
                                                  select new Settlement()
                                                                    {
                                                                        Code = ekkate.Element(ns + "Code").Value,
                                                                        Name = ekkate.Element(ns + "Name").Value,
                                                                        DisplayName = ekkate.Element(ns + "TypeName").Value +
                                                                               ekkate.Element(ns + "Name").Value +
                                                                               (mj.Name != null ? " - " + mj.Name : ""),
                                                                        MunicipalityCode = ekkate.Element(ns + "MunicipalityCode").Value,
                                                                        DistrictCode = ekkate.Element(ns + "DistrictCode").Value
                                                                    }).ToList();


            string settlementsXmlString = File.ReadAllText(path + "\\DataPackages\\SettlementFormationData.xml");
            XDocument settlementsXml = XDocument.Parse(settlementsXmlString);

            ns = settlementsXml.Root.Name.Namespace;
            List<Settlement> settlementFormation = (from settlement in settlementsXml.Element(ns + "SettlementFormationData")
                                                                                      .Element(ns + "SettlementFormations")
                                                                                      .Elements(ns + "SettlementFormation")
                                                    join m in municapalities on settlement.Element(ns + "MunicipalityCode").Value equals m.Code into lj
                                                    from mj in lj.DefaultIfEmpty()
                                                    select new Settlement()
                                                                      {
                                                                          Code = settlement.Element(ns + "Code").Value,
                                                                          Name = settlement.Element(ns + "Name").Value,
                                                                          DisplayName = "СО " + settlement.Element(ns + "Name").Value +
                                                                                 (mj.Name != null ? " - " + mj.Name : ""),
                                                                          MunicipalityCode = settlement.Element(ns + "MunicipalityCode").Value,
                                                                          DistrictCode = String.Empty
                                                                      }).ToList();
            result = ekatteSettlements.Concat(settlementFormation).ToList();

            return result;
        }
        #endregion

        //TODO!!!
        #region Mayoralties

        public static List<Mayoralty> GetMayoralties(out string fileLocation)
        {
            List<Mayoralty> result = new List<Mayoralty>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml";

            string mayoraltiesXmlString = File.ReadAllText(path + "\\DataPackages\\AdministrativeTerritorialUnitData.xml");
            XDocument mayoraltiesXml = XDocument.Parse(mayoraltiesXmlString);

            var ns = mayoraltiesXml.Root.Name.Namespace;
            result = (from mayoralties in mayoraltiesXml.Element(ns + "AdministrativeTerritorialUnitData")
                                                   .Element(ns + "Mayoralties")
                                                   .Elements(ns + "Mayoralty")
                      select new Mayoralty()
                      {
                          Code = mayoralties.Element(ns + "Code").Value,
                          MainSettlement = mayoralties.Element(ns + "MainSettlement").Value,
                          Name = mayoralties.Element(ns + "Name").Value
                      }).ToList();

            return result;
        }

        #endregion

        #region Areas

        public static List<Area> GetAreas(out string fileLocation)
        {
            List<Area> result = new List<Area>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\AreaData.xml";

            string areasXmlString = File.ReadAllText(path + "\\DataPackages\\AreaData.xml");
            XDocument areasXml = XDocument.Parse(areasXmlString);

            var ns = areasXml.Root.Name.Namespace;
            result = (from area in areasXml.Element(ns + "AreaData")
                                                   .Element(ns + "Areas")
                                                   .Elements(ns + "Area")
                      select new Area()
                      {
                          Code = area.Element(ns + "Code").Value,
                          Name = area.Element(ns + "Name").Value
                      }).ToList();

            return result;
        }

        #endregion

        #region IAMADirectorates

        public static List<IAMADirectorate> GetIAMADirectorate(out string fileLocation)
        {
            List<IAMADirectorate> result = new List<IAMADirectorate>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\IAMADirectorateData.xml";

            string areasXmlString = File.ReadAllText(path + "\\DataPackages\\IAMADirectorateData.xml");
            XDocument areasXml = XDocument.Parse(areasXmlString);

            var ns = areasXml.Root.Name.Namespace;
            result = (from area in areasXml.Element(ns + "IAMADirectorateData")
                                                   .Element(ns + "IAMADirectorates")
                                                   .Elements(ns + "IAMADirectorate")
                      select new IAMADirectorate()
                      {
                          Code = area.Element(ns + "IAMADirectorateCode").Value,
                          NameBG = area.Element(ns + "IAMADirectorateNameBG").Value,
                          NameENG = area.Element(ns + "IAMADirectorateNameENG").Value
                      }).ToList();

            return result;
        }

        #endregion

        #region Directions

        public static List<Direction> GetDirection(out string fileLocation)
        {
            List<Direction> result = new List<Direction>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\BABHRegionalDirectionData.xml";

            string directionsXmlString = File.ReadAllText(path + "\\DataPackages\\BABHRegionalDirectionData.xml");
            XDocument directionsXml = XDocument.Parse(directionsXmlString);

            var ns = directionsXml.Root.Name.Namespace;
            result = (from direction in directionsXml.Element(ns + "BABHRegionalDirectionData")
                                                   .Element(ns + "BABHRegionalDirections")
                                                   .Elements(ns + "BABHRegionalDirection")
                      select new Direction()
                      {
                          Code = direction.Element(ns + "BABHRegionalDirectionCode").Value,
                          Name = direction.Element(ns + "BABHRegionalDirectionName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region AnimalTypes

        public static List<AnimalType> GetAnimalType(out string fileLocation)
        {
            List<AnimalType> result = new List<AnimalType>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\AnimalTypeData.xml";

            string animalTypesXmlString = File.ReadAllText(path + "\\DataPackages\\AnimalTypeData.xml");
            XDocument animalTypesXml = XDocument.Parse(animalTypesXmlString);

            var ns = animalTypesXml.Root.Name.Namespace;
            result = (from animalTypes in animalTypesXml.Element(ns + "AnimalTypeData")
                                                   .Element(ns + "AnimalTypes")
                                                   .Elements(ns + "AnimalType")
                      select new AnimalType()
                      {
                          Code = animalTypes.Element(ns + "AnimalTypeCode").Value,
                          Name = animalTypes.Element(ns + "AnimalTypeName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region AnimalCategories

        public static List<AnimalCategory> GetAnimalCategory(out string fileLocation)
        {
            List<AnimalCategory> result = new List<AnimalCategory>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\AnimalCategoryData.xml";

            string animalCategoriesXmlString = File.ReadAllText(path + "\\DataPackages\\AnimalCategoryData.xml");
            XDocument animalCategoriesXml = XDocument.Parse(animalCategoriesXmlString);

            var ns = animalCategoriesXml.Root.Name.Namespace;
            result = (from animalCategories in animalCategoriesXml.Element(ns + "AnimalCategoryData")
                                                   .Element(ns + "AnimalCategories")
                                                   .Elements(ns + "AnimalCategory")
                      select new AnimalCategory()
                      {
                          Code = animalCategories.Element(ns + "AnimalCategoryCode").Value,
                          Name = animalCategories.Element(ns + "AnimalCategoryName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region AnimalPurposes

        public static List<AnimalPurpose> GetAnimalPurpose(out string fileLocation)
        {
            List<AnimalPurpose> result = new List<AnimalPurpose>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\AnimalPurposeData.xml";

            string animalPurposesXmlString = File.ReadAllText(path + "\\DataPackages\\AnimalPurposeData.xml");
            XDocument animalPurposesXml = XDocument.Parse(animalPurposesXmlString);

            var ns = animalPurposesXml.Root.Name.Namespace;
            result = (from animalPurposes in animalPurposesXml.Element(ns + "AnimalPurposeData")
                                                   .Element(ns + "AnimalPurposes")
                                                   .Elements(ns + "AnimalPurpose")
                      select new AnimalPurpose()
                      {
                          Code = animalPurposes.Element(ns + "AnimalPurposeCode").Value,
                          Name = animalPurposes.Element(ns + "AnimalPurposeName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region AnimalPurposes

        public static List<AnimalRisingTechnology> GetAnimalRisingTechnology(out string fileLocation)
        {
            List<AnimalRisingTechnology> result = new List<AnimalRisingTechnology>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\AnimalRisingTechnologyData.xml";

            string animalRisingTechnologiesXmlString = File.ReadAllText(path + "\\DataPackages\\AnimalRisingTechnologyData.xml");
            XDocument animalRisingTechnologiesXml = XDocument.Parse(animalRisingTechnologiesXmlString);

            var ns = animalRisingTechnologiesXml.Root.Name.Namespace;
            result = (from animalRisingTechnologies in animalRisingTechnologiesXml.Element(ns + "AnimalRisingTechnologyData")
                                                   .Element(ns + "AnimalRisingTechnologies")
                                                   .Elements(ns + "AnimalRisingTechnology")
                      select new AnimalRisingTechnology()
                      {
                          Code = animalRisingTechnologies.Element(ns + "AnimalRisingTechnologyCode").Value,
                          Name = animalRisingTechnologies.Element(ns + "AnimalRisingTechnologyName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region FarmCapacities

        public static List<FarmCapacity> GetFarmCapacity(out string fileLocation)
        {
            List<FarmCapacity> result = new List<FarmCapacity>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\FarmCapacityData.xml";

            string farmCapacitiesXmlString = File.ReadAllText(path + "\\DataPackages\\FarmCapacityData.xml");
            XDocument farmCapacitiesXml = XDocument.Parse(farmCapacitiesXmlString);

            var ns = farmCapacitiesXml.Root.Name.Namespace;
            result = (from farmCapacities in farmCapacitiesXml.Element(ns + "FarmCapacityData")
                                                   .Element(ns + "FarmCapacities")
                                                   .Elements(ns + "FarmCapacity")
                      select new FarmCapacity()
                      {
                          Code = farmCapacities.Element(ns + "FarmCapacityCode").Value,
                          Name = farmCapacities.Element(ns + "FarmCapacityName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region AnimalProductionTypes

        public static List<AnimalProductionType> GetAnimalProductionType(out string fileLocation)
        {
            List<AnimalProductionType> result = new List<AnimalProductionType>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\NameAndCodeOfAnimalProductionTypeData.xml";

            string animalProductionTypesXmlString = File.ReadAllText(path + "\\DataPackages\\NameAndCodeOfAnimalProductionTypeData.xml");
            XDocument animalProductionTypesXml = XDocument.Parse(animalProductionTypesXmlString);

            var ns = animalProductionTypesXml.Root.Name.Namespace;
            result = (from animalProductionTypes in animalProductionTypesXml.Element(ns + "NameAndCodeOfAnimalProductionTypeData")
                                                   .Element(ns + "NameAndCodeOfAnimalProductionTypes")
                                                   .Elements(ns + "NameAndCodeOfAnimalProductionType")
                      select new AnimalProductionType()
                      {
                          Code = animalProductionTypes.Element(ns + "AnimalProductionTypeCode").Value,
                          Name = animalProductionTypes.Element(ns + "AnimalProductionTypeName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region FoodGroup

        public static List<FoodGroup> GetFoodGroup(out string fileLocation, string foodPurpose)
        {
            List<FoodGroup> result = new List<FoodGroup>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\FoodGroupData.xml";

            string foodGroupsXmlString = File.ReadAllText(path + "\\DataPackages\\FoodGroupData.xml");
            XDocument foodGroupsXml = XDocument.Parse(foodGroupsXmlString);

            var ns = foodGroupsXml.Root.Name.Namespace;
            result = (from foodGroup in foodGroupsXml.Element(ns + "FoodGroupData")
                                                   .Element(ns + "FoodGroups")
                                                   .Elements(ns + "FoodGroup")
                      where foodGroup.Elements(ns + "Occurrences")
                                                    .FirstOrDefault().Elements(ns + "FoodObjectPurpose")
                                                    .Where(x => x.Value.Equals(foodPurpose))
                                                    .ToList().Count > 0
                      select new FoodGroup()
                      {
                          Code = foodGroup.Element(ns + "Code").Value,
                          ShortName = foodGroup.Element(ns + "ShortName").Value,
                          Name = foodGroup.Element(ns + "Name").Value
                      }).ToList();

            return result;
        }
        #endregion

        #region FoodSubGroups

        public static List<FoodSubGroup> GetFoodSubGroup(out string fileLocation, string foodGroupCode)
        {
            List<FoodSubGroup> result = new List<FoodSubGroup>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\FoodGroupData.xml";

            string foodSubGroupsXmlString = File.ReadAllText(path + "\\DataPackages\\FoodGroupData.xml");
            XDocument foodSubGroupsXml = XDocument.Parse(foodSubGroupsXmlString);

            var ns = foodSubGroupsXml.Root.Name.Namespace;

            result = (from foodSubGroup in foodSubGroupsXml.Element(ns + "FoodGroupData")
                                                   .Element(ns + "FoodSubGroups")
                                                   .Elements(ns + "FoodSubGroup")
                      where foodSubGroup.Elements(ns + "Occurrences")
                                                    .FirstOrDefault().Elements(ns + "FoodGroupCode")
                                                    //.Where(x => x.Value.Equals(foodPurpose))
                                                    .Where(x => x.Value.Equals(foodGroupCode))

                                        .ToList().Count > 0
                      select new FoodSubGroup()
                      {
                          Code = foodSubGroup.Element(ns + "Code").Value,
                          Name = foodSubGroup.Element(ns + "Name").Value,
                          FoodGroupCode = foodGroupCode
                          //FoodGroupCode = foodSubGroup.Element(ns + "Occurrences").Element(ns + "FoodGroupCode").Value
                      }).ToList();

            return result;
        }

        #endregion

        #region FoodItem

        public static List<FoodItem> GetFoodItemsPerPurpose(out string fileLocation, string foodPurpose)
        {
            List<FoodItem> result = new List<FoodItem>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\FoodGroupData.xml";

            string foodItemsXmlString = File.ReadAllText(path + "\\DataPackages\\FoodGroupData.xml");
            XDocument foodItemsXml = XDocument.Parse(foodItemsXmlString);

            var ns = foodItemsXml.Root.Name.Namespace;

            result = (from foodItem in foodItemsXml.Element(ns + "FoodGroupData")
                                                   .Element(ns + "FoodItems")
                                                   .Elements(ns + "FoodItem")
                      where foodItem.Elements(ns + "Occurrences")
                                                  .Elements(ns + "Occurrence")
                                                    //.FirstOrDefault().Elements(ns + "FoodObjectPurpose")
                                                    .Where(x => x.Element(ns + "FoodItemPurpose") != null &&
                                                                x.Element(ns + "FoodItemPurpose").Value.Equals(foodPurpose))
                                                    .ToList().Count > 0
                      select new FoodItem()
                      {
                          Name = foodItem.Element(ns + "Name").Value,
                          CanAddFreeText = foodItem.Element(ns + "CanAddFreeText").Value,
                          FoodGroupCode = ""
                      }).ToList();

            return result;
        }

        public static List<FoodItem> GetFoodItemByFoodGroup(out string fileLocation, string foodGroupCode)
        {
            List<FoodItem> result = new List<FoodItem>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\FoodGroupData.xml";

            string foodItemsXmlString = File.ReadAllText(path + "\\DataPackages\\FoodGroupData.xml");
            XDocument foodItemsXml = XDocument.Parse(foodItemsXmlString);

            var ns = foodItemsXml.Root.Name.Namespace;

            result = (from foodItem in foodItemsXml.Element(ns + "FoodGroupData")
                                                   .Element(ns + "FoodItems")
                                                   .Elements(ns + "FoodItem")
                      where foodItem.Element(ns + "Occurrences")
                                                  .Elements(ns + "Occurrence")
                                                  .Where(x => x.Element(ns + "FoodSubGroupCode") == null &&
                                                                x.Element(ns + "FoodGroupCode") != null && 
                                                                x.Element(ns + "FoodGroupCode").Value.Equals(foodGroupCode))
                                                  .ToList().Count > 0
                      //&& foodItem.Element(ns + "Occurrences")
                      //                              .Elements(ns + "Occurrence")
                      //                            .Where(x => x.Element(ns + "FoodSubGroupCode") == null)
                      //                            .ToList().Count == 0)
                      select new FoodItem()
                      {
                          Name = foodItem.Element(ns + "Name").Value,
                          CanAddFreeText = foodItem.Element(ns + "CanAddFreeText").Value,
                          FoodGroupCode = foodGroupCode
                      }).ToList();
            return result;
        }

        #endregion

        #region FoodItems

        public static List<FoodItems> GetFoodItemByFoodSubGroup(out string fileLocation, string foodSubGroupCode, string foodGroupCode)
        {
            List<FoodItems> result = new List<FoodItems>();

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);
            fileLocation = path + "\\DataPackages\\FoodGroupData.xml";

            string foodItemsXmlString = File.ReadAllText(path + "\\DataPackages\\FoodGroupData.xml");
            XDocument foodItemsXml = XDocument.Parse(foodItemsXmlString);

            var ns = foodItemsXml.Root.Name.Namespace;

            result = (from foodItem in foodItemsXml.Element(ns + "FoodGroupData")
                                                   .Element(ns + "FoodItems")
                                                   .Elements(ns + "FoodItem")
                                                   //.Where(x => x.Element(ns + "Occurrences")
                                                   //     .Element(ns + "Occurrence")
                                                   //     .Descendants(ns + "FoodSubGroupCode").Any())
                      where foodItem.Element(ns + "Occurrences")
                                    .Elements(ns + "Occurrence")
                                    .Where(x => x.Element(ns + "FoodSubGroupCode") != null &&  
                                                x.Element(ns + "FoodSubGroupCode").Value.Equals(foodSubGroupCode) &&
                                                x.Element(ns + "FoodGroupCode") != null &&  
                                                x.Element(ns + "FoodGroupCode").Value.Equals(foodGroupCode))
                                    .ToList().Count > 0
                      select new FoodItems()
                      {
                          Name = foodItem.Element(ns + "Name").Value,
                          CanAddFreeText = foodItem.Element(ns + "CanAddFreeText").Value,
                          FoodGroupCode = foodGroupCode,
                          FoodSubGroupCode = foodSubGroupCode
                          //FoodGroupCode = foodItem.Element(ns + "Occurrences")
                          //                              .Element(ns + "Occurrence")
                          //                              .Element(ns + "FoodGroupCode")
                          //                              .Value,
                          //FoodSubGroupCode = foodItem.Element(ns + "Occurrences")
                          //                              .Element(ns + "Occurrence")
                          //                              .Element(ns + "FoodSubGroupCode")
                          //                              .Value,
                      }).ToList();
            return result;
        }
        #endregion

        #region NavalEducationalOrganizations

        public static List<NavalEducationalOrganization> GetNavalEducationalOrganization(out string fileLocation)
        {
            List<NavalEducationalOrganization> result = new List<NavalEducationalOrganization>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\NavalEducationalOrganizationsData.xml";

            string navalEducationalOrganizationsXmlString = File.ReadAllText(path + "\\DataPackages\\NavalEducationalOrganizationsData.xml");
            XDocument navalEducationalOrganizationsXml = XDocument.Parse(navalEducationalOrganizationsXmlString);

            var ns = navalEducationalOrganizationsXml.Root.Name.Namespace;
            result = (from navalEducationalOrganizations in navalEducationalOrganizationsXml.Element(ns + "NavalEducationalOrganizationsData")
                                                   .Element(ns + "NavalEducationalOrganizations")
                                                   .Elements(ns + "NavalEducationalOrganization")
                      select new NavalEducationalOrganization()
                      {
                          Code = navalEducationalOrganizations.Element(ns + "NavalEducationalOrganizationCode").Value,
                          Name = navalEducationalOrganizations.Element(ns + "NavalEducationalOrganizationName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region NavalCompetencyCourses

        public static List<NavalCompetencyCourse> GetNavalCompetencyCourse(out string fileLocation)
        {
            List<NavalCompetencyCourse> result = new List<NavalCompetencyCourse>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\NavalCompetencyCoursesData.xml";

            string navalCompetencyCoursesXmlString = File.ReadAllText(path + "\\DataPackages\\NavalCompetencyCoursesData.xml");
            XDocument navalCompetencyCoursesXml = XDocument.Parse(navalCompetencyCoursesXmlString);

            var ns = navalCompetencyCoursesXml.Root.Name.Namespace;
            result = (from navalCompetencyCourses in navalCompetencyCoursesXml.Element(ns + "NavalCompetencyCoursesData")
                                                   .Element(ns + "NavalCompetencyCourses")
                                                   .Elements(ns + "NavalCompetencyCourse")
                      select new NavalCompetencyCourse()
                      {
                          Code = navalCompetencyCourses.Element(ns + "Code").Value,
                          Name = navalCompetencyCourses.Element(ns + "Name").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region CertificateIssuingCities

        public static List<CertificateIssuingCity> GetCertificateIssuingCity(out string fileLocation)
        {
            List<CertificateIssuingCity> result = new List<CertificateIssuingCity>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\IAMACertificateIssuingCityData.xml";

            string certificateIssuingCitiesXmlString = File.ReadAllText(path + "\\DataPackages\\IAMACertificateIssuingCityData.xml");
            XDocument certificateIssuingCitiesXml = XDocument.Parse(certificateIssuingCitiesXmlString);

            var ns = certificateIssuingCitiesXml.Root.Name.Namespace;
            result = (from certificateIssuingCities in certificateIssuingCitiesXml.Element(ns + "IAMACertificateIssuingCityData")
                                                   .Element(ns + "IAMACertificateIssuingCitys")
                                                   .Elements(ns + "IAMACertificateIssuingCity")
                      select new CertificateIssuingCity()
                      {
                          Code = certificateIssuingCities.Element(ns + "IAMACertificateIssuingCityCode").Value,
                          Name = certificateIssuingCities.Element(ns + "IAMACertificateIssuingCityName").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region SeaWorkCompetencyGroups

        public static List<SeaWorkCompetencyGroup> GetSeaWorkCompetencyGroup(out string fileLocation)
        {
            List<SeaWorkCompetencyGroup> result = new List<SeaWorkCompetencyGroup>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\SeaWorkCompetencyData.xml";

            string seaWorkCompetencyGroupsXmlString = File.ReadAllText(path + "\\DataPackages\\SeaWorkCompetencyData.xml");
            XDocument seaWorkCompetencyGroupsXml = XDocument.Parse(seaWorkCompetencyGroupsXmlString);

            var ns = seaWorkCompetencyGroupsXml.Root.Name.Namespace;
            result = (from seaWorkCompetencyGroups in seaWorkCompetencyGroupsXml.Element(ns + "SeaWorkCompetencyData")
                                                   .Element(ns + "SeaWorkCompetencyGroups")
                                                   .Elements(ns + "SeaWorkCompetencyGroup")
                      select new SeaWorkCompetencyGroup()
                      {
                          Code = seaWorkCompetencyGroups.Element(ns + "Code").Value,
                          Name = seaWorkCompetencyGroups.Element(ns + "Name").Value,
                      }).ToList();

            return result;
        }

        #endregion

        #region SeaWorkCompetencies

        public static List<SeaWorkCompetency> GetSeaWorkCompetency(out string fileLocation, string groupCode)
        {
            List<SeaWorkCompetency> result = new List<SeaWorkCompetency>();
            //string docLocation = ConfigurationManager.AppSettings["DataPackagesLocation"];

            string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
            string uriPath = Uri.UnescapeDataString(uri.Path);
            string path = Path.GetDirectoryName(uriPath);

            fileLocation = path + "\\DataPackages\\SeaWorkCompetencyData.xml";

            string seaWorkCompetenciesXmlString = File.ReadAllText(path + "\\DataPackages\\SeaWorkCompetencyData.xml");
            XDocument seaWorkCompetenciesXml = XDocument.Parse(seaWorkCompetenciesXmlString);

            var ns = seaWorkCompetenciesXml.Root.Name.Namespace;
            result = (from seaWorkCompetencies in seaWorkCompetenciesXml.Element(ns + "SeaWorkCompetencyData")
                                                   .Element(ns + "SeaWorkCompetencies")
                                                   .Elements(ns + "SeaWorkCompetency")
                      where seaWorkCompetencies.Elements(ns + "GroupCode")
                                                   .Where(x => x.Value.Equals(groupCode))
                                                   .ToList().Count > 0

                      select new SeaWorkCompetency()
                      {
                          Name = seaWorkCompetencies.Element(ns + "Name").Value,
                          GroupCode = groupCode,
                      }).ToList();

            return result;
        }

        #endregion
    }
}