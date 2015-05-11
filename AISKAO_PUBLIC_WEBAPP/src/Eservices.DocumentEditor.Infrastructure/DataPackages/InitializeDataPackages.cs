using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages
{
    public static class InitializeDataPackages
    {

        public static List<Country> InitializeCountries()
        {
            string fileLocation = "";
            List<Country> countries = (List<Country>)HttpContext.Current.Cache["Countries"];
            if (countries == null)
            {
                countries = LoadDataPackages.GetCountries(out fileLocation);
                HttpContext.Current.Cache.Insert("Countries", countries, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return countries;
        }
        public static List<District> InitializeDistricts()
        {
            string fileLocation = "";
            List<District> districts = (List<District>)HttpContext.Current.Cache["Districts"];
            if (districts == null)
            {
                districts = LoadDataPackages.GetDistricts(out fileLocation);
                HttpContext.Current.Cache.Insert("Districts", districts, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return districts;
        }
        public static List<Municipality> InitializeMunicipalities()
        {
            string fileLocation = "";
            List<Municipality> municipalities = (List<Municipality>)HttpContext.Current.Cache["Municipalities"];
            if (municipalities == null)
            {
                municipalities = LoadDataPackages.GetMunicipalities(out fileLocation);
                HttpContext.Current.Cache.Insert("Municipalities", municipalities, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return municipalities;
        }
        public static List<Settlement> InitializeSettlements()
        {
            string fileLocation = "";
            List<Settlement> settlements = (List<Settlement>)HttpContext.Current.Cache["Settlements"];
            if (settlements == null)
            {
                settlements = LoadDataPackages.GetSettlements(out fileLocation);
                HttpContext.Current.Cache.Insert("Settlements", settlements, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return settlements;
        }

        public static List<Mayoralty> InitializeMayoralties()
        {
            string fileLocation = "";
            List<Mayoralty> mayoralties = (List<Mayoralty>)HttpContext.Current.Cache["Mayoralties"];
            if (mayoralties == null)
            {
                mayoralties = LoadDataPackages.GetMayoralties(out fileLocation);
                HttpContext.Current.Cache.Insert("Mayoralties", mayoralties, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return mayoralties;
        }

        public static List<Area> InitializeAreas()
        {
            string fileLocation = "";
            List<Area> areas = (List<Area>)HttpContext.Current.Cache["Areas"];
            if (areas == null)
            {
                areas = LoadDataPackages.GetAreas(out fileLocation);
                HttpContext.Current.Cache.Insert("Areas", areas, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return areas;
        }

        public static List<IAMADirectorate> InitializeIAMADirectorate()
        {
            string fileLocation = "";
            List<IAMADirectorate> directorates = (List<IAMADirectorate>)HttpContext.Current.Cache["IAMADirectorates"];
            if (directorates == null)
            {
                directorates = LoadDataPackages.GetIAMADirectorate(out fileLocation);
                HttpContext.Current.Cache.Insert("IAMADirectorates", directorates, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return directorates;
        }

        public static List<Direction> InitializeDirections()
        {
            string fileLocation = "";
            List<Direction> directions = (List<Direction>)HttpContext.Current.Cache["Directions"];
            if (directions == null)
            {
                directions = LoadDataPackages.GetDirection(out fileLocation);
                HttpContext.Current.Cache.Insert("Directions", directions, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return directions;
        }

        public static List<AnimalType> InitializeAnimalTypes()
        {
            string fileLocation = "";
            List<AnimalType> animalTypes = (List<AnimalType>)HttpContext.Current.Cache["AnimalTypes"];
            if (animalTypes == null)
            {
                animalTypes = LoadDataPackages.GetAnimalType(out fileLocation);
                HttpContext.Current.Cache.Insert("AnimalTypes", animalTypes, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return animalTypes;
        }

        public static List<AnimalCategory> InitializeAnimalCategories()
        {
            string fileLocation = "";
            List<AnimalCategory> animalCategories = (List<AnimalCategory>)HttpContext.Current.Cache["AnimalCategories"];
            if (animalCategories == null)
            {
                animalCategories = LoadDataPackages.GetAnimalCategory(out fileLocation);
                HttpContext.Current.Cache.Insert("AnimalCategories", animalCategories, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return animalCategories;
        }

        public static List<AnimalPurpose> InitializeAnimalPurposes()
        {
            string fileLocation = "";
            List<AnimalPurpose> animalPurposes = (List<AnimalPurpose>)HttpContext.Current.Cache["AnimalPurposes"];
            if (animalPurposes == null)
            {
                animalPurposes = LoadDataPackages.GetAnimalPurpose(out fileLocation);
                HttpContext.Current.Cache.Insert("AnimalPurposes", animalPurposes, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return animalPurposes;
        }

        public static List<AnimalRisingTechnology> InitializeAnimalRisingTechnologies()
        {
            string fileLocation = "";
            List<AnimalRisingTechnology> animalRisingTechnologies = (List<AnimalRisingTechnology>)HttpContext.Current.Cache["AnimalRisingTechnologies"];
            if (animalRisingTechnologies == null)
            {
                animalRisingTechnologies = LoadDataPackages.GetAnimalRisingTechnology(out fileLocation);
                HttpContext.Current.Cache.Insert("AnimalRisingTechnologies", animalRisingTechnologies, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return animalRisingTechnologies;
        }

        public static List<FarmCapacity> InitializeFarmCapacities()
        {
            string fileLocation = "";
            List<FarmCapacity> farmCapacities = (List<FarmCapacity>)HttpContext.Current.Cache["FarmCapacities"];
            if (farmCapacities == null)
            {
                farmCapacities = LoadDataPackages.GetFarmCapacity(out fileLocation);
                HttpContext.Current.Cache.Insert("FarmCapacities", farmCapacities, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return farmCapacities;
        }

        public static List<AnimalProductionType> InitializeAnimalProductionTypes()
        {
            string fileLocation = "";
            List<AnimalProductionType> animalProductionTypes = (List<AnimalProductionType>)HttpContext.Current.Cache["AnimalProductionTypes"];
            if (animalProductionTypes == null)
            {
                animalProductionTypes = LoadDataPackages.GetAnimalProductionType(out fileLocation);
                HttpContext.Current.Cache.Insert("AnimalProductionTypes", animalProductionTypes, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return animalProductionTypes;
        }

        public static List<FoodGroup> InitializeFoodGroups(string foodPurpose)
        {
            string fileLocation = "";
            List<FoodGroup> foodGroups = (List<FoodGroup>)HttpContext.Current.Cache[foodPurpose];
            if (foodGroups == null)
            {
                foodGroups = LoadDataPackages.GetFoodGroup(out fileLocation, foodPurpose);
                HttpContext.Current.Cache.Insert(foodPurpose, foodGroups, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return foodGroups;
        }

        public static List<FoodSubGroup> InitializeFoodSubGroups(string foodGroupCode)
        {
            string fileLocation = "";
            List<FoodSubGroup> foodSubGroups = (List<FoodSubGroup>)HttpContext.Current.Cache[foodGroupCode + "-SubGroups"];
            if (foodSubGroups == null)
            {
                foodSubGroups = LoadDataPackages.GetFoodSubGroup(out fileLocation, foodGroupCode);
                HttpContext.Current.Cache.Insert(foodGroupCode + "-SubGroups", foodSubGroups, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return foodSubGroups;
        }

        public static List<FoodItem> InitializeFoodItemsPerPurpose(string foodPurpose)
        {
            string fileLocation = "";
            List<FoodItem> foodItems = (List<FoodItem>)HttpContext.Current.Cache[foodPurpose + "ItemsPerPurpose"];
            if (foodItems == null)
            {
                foodItems = LoadDataPackages.GetFoodItemsPerPurpose(out fileLocation, foodPurpose);
                HttpContext.Current.Cache.Insert(foodPurpose + "ItemsPerPurpose", foodItems, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return foodItems;
        }

        public static List<FoodItem> InitializeFoodItem(string foodGroupCode)
        {
            string fileLocation = "";
            List<FoodItem> foodItems = (List<FoodItem>)HttpContext.Current.Cache[foodGroupCode + "ItemsPerGroups"];
            if (foodItems == null)
            {
                foodItems = LoadDataPackages.GetFoodItemByFoodGroup(out fileLocation, foodGroupCode);
                HttpContext.Current.Cache.Insert(foodGroupCode + "ItemsPerGroups", foodItems, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return foodItems;
        }

        public static List<FoodItems> InitializeFoodItems(string foodSubGroupCode, string foodGroupCode)
        {
            string fileLocation = "";
            List<FoodItems> foodItems = (List<FoodItems>)HttpContext.Current.Cache[foodGroupCode + "/" + foodSubGroupCode + "ItemsPerSubGroup"];
            if (foodItems == null)
            {
                foodItems = LoadDataPackages.GetFoodItemByFoodSubGroup(out fileLocation, foodSubGroupCode, foodGroupCode);
                HttpContext.Current.Cache.Insert(foodGroupCode + "/" + foodSubGroupCode + "ItemsPerSubGroup", foodItems, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return foodItems;
        }

        public static List<NavalEducationalOrganization> InitializeNavalEducationalOrganization()
        {
            string fileLocation = "";
            List<NavalEducationalOrganization> navalEducationalOrganizations = (List<NavalEducationalOrganization>)HttpContext.Current.Cache["NavalEducationalOrganizations"];
            if (navalEducationalOrganizations == null)
            {
                navalEducationalOrganizations = LoadDataPackages.GetNavalEducationalOrganization(out fileLocation);
                HttpContext.Current.Cache.Insert("NavalEducationalOrganizations", navalEducationalOrganizations, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return navalEducationalOrganizations;
        }

        public static List<NavalCompetencyCourse> InitializeNavalCompetencyCourse()
        {
            string fileLocation = "";
            List<NavalCompetencyCourse> navalCompetencyCourses = (List<NavalCompetencyCourse>)HttpContext.Current.Cache["NavalCompetencyCourses"];
            if (navalCompetencyCourses == null)
            {
                navalCompetencyCourses = LoadDataPackages.GetNavalCompetencyCourse(out fileLocation);
                HttpContext.Current.Cache.Insert("NavalCompetencyCourses", navalCompetencyCourses, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return navalCompetencyCourses;
        }

        public static List<CertificateIssuingCity> InitializeCertificateIssuingCity()
        {
            string fileLocation = "";
            List<CertificateIssuingCity> certificateIssuingCities = (List<CertificateIssuingCity>)HttpContext.Current.Cache["CertificateIssuingCities"];
            if (certificateIssuingCities == null)
            {
                certificateIssuingCities = LoadDataPackages.GetCertificateIssuingCity(out fileLocation);
                HttpContext.Current.Cache.Insert("CertificateIssuingCities", certificateIssuingCities, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return certificateIssuingCities;
        }

        public static List<SeaWorkCompetencyGroup> InitializeSeaWorkCompetencyGroup()
        {
            string fileLocation = "";
            List<SeaWorkCompetencyGroup> seaWorkCompetencyGroups = (List<SeaWorkCompetencyGroup>)HttpContext.Current.Cache["SeaWorkCompetencyGroups"];
            if (seaWorkCompetencyGroups == null)
            {
                seaWorkCompetencyGroups = LoadDataPackages.GetSeaWorkCompetencyGroup(out fileLocation);
                HttpContext.Current.Cache.Insert("SeaWorkCompetencyGroups", seaWorkCompetencyGroups, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return seaWorkCompetencyGroups;
        }

        public static List<SeaWorkCompetency> InitializeSeaWorkCompetency(string groupCode)
        {
            string fileLocation = "";
            List<SeaWorkCompetency> seaWorkCompetencies = (List<SeaWorkCompetency>)HttpContext.Current.Cache[groupCode];
            if (seaWorkCompetencies == null)
            {
                seaWorkCompetencies = LoadDataPackages.GetSeaWorkCompetency(out fileLocation, groupCode);
                HttpContext.Current.Cache.Insert("SeaWorkCompetencies", seaWorkCompetencies, new CacheDependency(fileLocation), DateTime.Now.AddMinutes(10), Cache.NoSlidingExpiration);
            }
            return seaWorkCompetencies;
        }
    }
}