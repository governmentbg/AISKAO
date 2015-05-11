define('dataPackages/datacontext',
    ['ko', 'GlobalParameters', 'breeze'],
    function (ko, gp, breeze) {
        var manager = gp.configureBreezeManager();

        var datacontext = function () {

            var getCountries = function (nomCountries) {
                var query = new breeze.EntityQuery()
                           .from("Countries");
                //.where("substring(code, 0, 1)", "==", 'A');
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    nomCountries(data.results);
                    //console.log("nomCountries is ready");
                }
            },

            //#region Common
            getDistrictsWebAPI = function (nomDistricts) {
                var query = new breeze.EntityQuery()
                           .from("Districts");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    //data.results.unshift({});
                    nomDistricts(data.results);
                    //console.log("nomDistrict is ready");
                }
            },
            getMunicipalitiesByDistrictsWebAPI = function (districtCode, nomMunicipalities) {
                var query = new breeze.EntityQuery()
                        .from("Municipalities")
                        .where("districtCode", "==", districtCode);

                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                .then(success)
                .fail(function (e) {
                    alert(e);
                });

                function success(data) {
                    //data.results.unshift({});
                    nomMunicipalities(data.results);
                    //console.log("nomMunicipalities is ready");
                };
            },
            getSettlementsByMunicipalityWebAPI = function (municipalityCode, nomSettlements) {
                var query = new breeze.EntityQuery()
                        .from("Settlements")
                        .where("municipalityCode", "==", municipalityCode);

                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                    .then(success)
                    .fail(function (e) {
                        alert(e);
                    });

                function success(data) {
                    //data.results.unshift({});
                    nomSettlements(data.results);
                }
            },

            getMayoraltiesByMunicipality = function (municipalityCode, nomMayoralties) {
                var query = new breeze.EntityQuery()
                           .from("Mayoralties")
                            .where("substring(code, 0, 5)", "==", municipalityCode);
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    if (data.results.length > 0) {
                        data.results.unshift({});
                        nomMayoralties(data.results);
                        //console.log("nomMayoralties is ready");
                    }
                }
            },

            getAreasByMunicipality = function (municipalityCode, nomAreas) {
                var query = new breeze.EntityQuery()
                           .from("Areas")
                           .where("substring(code, 0, 5)", "==", municipalityCode);
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    if (data.results.length > 0) {
                        data.results.unshift({});
                        nomAreas(data.results);
                        //console.log("nomAreas is ready");
                    }
                }
            },            
            //#endregion

            //#region IAMA
            getIAMADirectorates = function (nomDirectorates) {
                   var query = new breeze.EntityQuery()
                              .from("IAMADirectorates");
                   var lQuery = undefined;
                   try {
                       lQuery = manager.executeQueryLocally(query);
                   } catch (e) {
                       lQuery = undefined;
                   }
                   if (lQuery != undefined && lQuery.length > 0) {
                       var query = query.using(breeze.FetchStrategy.FromLocalCache);
                   }
                   return manager.executeQuery(query)
                                   .then(success)
                                   .fail(function (e) {
                                       alert(e);
                                   });

                   function success(data) {
                       //data.results.unshift({});
                       nomDirectorates(data.results);
                   }
            },
            getNavalEducationalOrganizations = function (nomNavalEducationalOrganizations) {
                  var query = new breeze.EntityQuery()
                             .from("NavalEducationalOrganizations");
                  var lQuery = undefined;
                  try {
                      lQuery = manager.executeQueryLocally(query);
                  } catch (e) {
                      lQuery = undefined;
                  }
                  if (lQuery != undefined && lQuery.length > 0) {
                      var query = query.using(breeze.FetchStrategy.FromLocalCache);
                  }
                  return manager.executeQuery(query)
                                  .then(success)
                                  .fail(function (e) {
                                      alert(e);
                                  });

                  function success(data) {
                      //data.results.unshift({});
                      nomNavalEducationalOrganizations(data.results);
                  }
              },
            getNavalCompetencyCourses = function (nomNavalCompetencyCourses) {
                var query = new breeze.EntityQuery()
                           .from("NavalCompetencyCourses");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    nomNavalCompetencyCourses(data.results);
                }
            },
            getCertificateIssuingCities = function (nomCertificateIssuingCities) {
                var query = new breeze.EntityQuery()
                           .from("CertificateIssuingCities");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    data.results.unshift({});
                    nomCertificateIssuingCities(data.results);
                }
            },
            getSeaWorkCompetencyGroups = function (nomSeaWorkCompetencyGroups) {
                var query = new breeze.EntityQuery()
                           .from("SeaWorkCompetencyGroups");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    //data.results.unshift({});
                    nomSeaWorkCompetencyGroups(data.results);
                }
            },
            getSeaWorkCompetencies = function (code, nomCompetencyNames) {
                var query = new breeze.EntityQuery()
                           .from("SeaWorkCompetencies")
                            .withParameters({ "groupCode": code });
                //.where("groupCode", "==", code);

                //var lQuery = undefined;
                //try {
                //    lQuery = manager.executeQueryLocally(query);
                //} catch (e) {
                //    lQuery = undefined;
                //}
                //if (lQuery != undefined && lQuery.length > 0) {
                //    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                //}
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    //data.results.unshift({});
                    nomCompetencyNames(data.results);
                }
            },
            //#endregion

            //#region BABH

            //#region Animal&Farm
            getDirectionsByCode = function (directionCode, directionName) {
                var directionCode = ko.utils.unwrapObservable(directionCode) ? ko.utils.unwrapObservable(directionCode) : "";
                var query = new breeze.EntityQuery()
                            .from("Directions")
                            .where("code", "==", directionCode);
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    var result = data.results !== undefined && data.results.length > 0 && data.results[0].name() !== undefined ? data.results[0].name() : undefined;
                    if (directionName) {
                        directionName(result);
                    }
                    return result;
                }
            },
            getDirections = function (nomDirections) {
                var query = new breeze.EntityQuery()
                           .from("Directions");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    // data.results.unshift({});
                    nomDirections(data.results);
                }
            },

             getDirections = function (nomDirections) {
                 var query = new breeze.EntityQuery()
                            .from("Directions");
                 var lQuery = undefined;
                 try {
                     lQuery = manager.executeQueryLocally(query);
                 } catch (e) {
                     lQuery = undefined;
                 }
                 if (lQuery != undefined && lQuery.length > 0) {
                     var query = query.using(breeze.FetchStrategy.FromLocalCache);
                 }
                 return manager.executeQuery(query)
                                 .then(success)
                                 .fail(function (e) {
                                     alert(e);
                                 });

                 function success(data) {
                     // data.results.unshift({});
                     nomDirections(data.results);
                 }
            },

            getAnimalTypes = function (nomAnimalTypes) {
                var query = new breeze.EntityQuery()
                           .from("AnimalTypes");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    //data.results.unshift({});
                    nomAnimalTypes(data.results);
                }
            },
            getAnimalCategories = function (nomAnimalCategories) {
                var query = new breeze.EntityQuery()
                           .from("AnimalCategories");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    data.results.unshift({});
                    nomAnimalCategories(data.results);
                }
            },
            getAnimalPurposes = function (nomAnimalPurposes) {
                var query = new breeze.EntityQuery()
                           .from("AnimalPurposes");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    nomAnimalPurposes(data.results);
                }
            },
            getAnimalRisingTechnologies = function (nomAnimalRisingTechnologies) {
                var query = new breeze.EntityQuery()
                           .from("AnimalRisingTechnologies");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    //data.results.unshift({});
                    nomAnimalRisingTechnologies(data.results);
                }
            },
            getAnimalProductionTypes = function (nomAnimalProductionTypes) {
                var query = new breeze.EntityQuery()
                           .from("AnimalProductionTypes");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    data.results.unshift({});
                    nomAnimalProductionTypes(data.results);
                }
            },
            getFarmCapacities = function (nomFarmCapacities) {
                var query = new breeze.EntityQuery()
                           .from("FarmCapacities");
                var lQuery = undefined;
                try {
                    lQuery = manager.executeQueryLocally(query);
                } catch (e) {
                    lQuery = undefined;
                }
                if (lQuery != undefined && lQuery.length > 0) {
                    var query = query.using(breeze.FetchStrategy.FromLocalCache);
                }
                return manager.executeQuery(query)
                                .then(success)
                                .fail(function (e) {
                                    alert(e);
                                });

                function success(data) {
                    data.results.unshift({});
                    nomFarmCapacities(data.results);
                }
            },
            //#endregion

            //#region Foods
            getFoodGroups = function (foodPurposeCode, nomFoodGroups) {

                var query = new breeze.EntityQuery()
                                .from("FoodGroups")
                                .withParameters({ "foodPurpose": foodPurposeCode });
                   return manager.executeQuery(query)
                                   .then(success)
                                   .fail(function (e) {
                                       alert(e);
                                   });
                   function success(data) {
                       nomFoodGroups(data.results);
                   }
            },
            getFoodSubGroups = function (code, nomFoodSubGroups) {
                var query = new breeze.EntityQuery()
                        .from("FoodSubGroups")
                        .withParameters({ "foodGroupCode": code });
                return manager.executeQuery(query)
                .then(success)
                .fail(function (e) {
                    alert(e);
                });

                function success(data) {
                    nomFoodSubGroups(data.results);
                };
            },
            getFoodItemsByFoodGroup = function (code, nomFoodItems) {
                var query = new breeze.EntityQuery()
                        .from("FoodItem")
                        .withParameters({ "foodGroupCode": code });
                return manager.executeQuery(query)
                .then(success)
                .fail(function (e) {
                    alert(e);
                });
                function success(data) {
                    nomFoodItems(data.results);
                };
            },
            getFoodItemsPerPurpose = function (code, nomFoodItems) {
                var query = new breeze.EntityQuery()
                        .from("FoodItem")
                        .withParameters({ "foodPurpose": code });
                return manager.executeQuery(query)
                .then(success)
                .fail(function (e) {
                    alert(e);
                });

                function success(data) {
                    nomFoodItems(data.results);
                };
            },
            getFoodItems = function (code, groupCode, nomFoodItems) {
                var query = new breeze.EntityQuery()
                        .from("FoodItems")
                        .withParameters({ "foodSubGroupCode": code, "foodGroupCode": groupCode });
                return manager.executeQuery(query)
                .then(success)
                .fail(function (e) {
                    alert(e);
                });
                function success(data) {
                    nomFoodItems(data.results);
                };
            },
            //#endregion

            //#endregion


            //#region FromAIS
            getElectronicServiceProviderBasicData = function (electronicServiceProviderBasicData) {
                jQuery.support.cors = true;
                return $.ajax({
                    type: "GET",
                    crossDomain: true,
                    dataType: 'json',
                    url: gp.publicDataURL + "ElectronicServiceProviderType"
                }).done(function (data) {
                    electronicServiceProviderBasicData.identifier(data.id);
                    electronicServiceProviderBasicData.name(data.name);
                })
            },
            getServiceTermTypes = function (documentNS, nomServiceTermTypes) {
                 jQuery.support.cors = true;
                 
                return $.ajax({
                    type: "GET",
                    crossDomain: true,
                    url: gp.publicDataURL + "ServiceTermTypes",
                    dataType: 'json',
                    data: { ns: documentNS }
                 }).success(function (data) {
                     nomServiceTermTypes(data);
                 }).fail(function (err) {
                     alert(err.statusText);
                 })

             },
            getServiceResultReceiptMethod = function (documentNS, nomServiceResultReceiptMethod) {
                jQuery.support.cors = true;
                return $.ajax({
                    type: "GET",
                    crossDomain: true,
                    dataType: 'json',
                    url: gp.publicDataURL + "ServiceResultReceiptMethod",
                    data: { ns: documentNS }
                }).done(function (data) {
                    nomServiceResultReceiptMethod(data);
                })
            },
            //#endregion

          isValidXML = function (xmlDocument) {
              $.ajax({
                  type: "POST",
                  url: "/api/",
                  processData: false,
                  data: xmlDocument
              }).done(function () {
                  //alert("data sent!");
              })
          };

            return {
                getCountries: getCountries,
                getDistricts: getDistrictsWebAPI,
                getMunicipalitiesByDistrict: getMunicipalitiesByDistrictsWebAPI,
                getSettlementsByMunicipality: getSettlementsByMunicipalityWebAPI,
                getMayoraltiesByMunicipality: getMayoraltiesByMunicipality,
                getAreasByMunicipality: getAreasByMunicipality,

                getIAMADirectorates: getIAMADirectorates,
                getDirectionsByCode: getDirectionsByCode,
                getDirections: getDirections,
                getNavalEducationalOrganizations: getNavalEducationalOrganizations,
                getNavalCompetencyCourses: getNavalCompetencyCourses,
                getCertificateIssuingCities: getCertificateIssuingCities,
                getSeaWorkCompetencyGroups: getSeaWorkCompetencyGroups,
                getSeaWorkCompetencies: getSeaWorkCompetencies,

                getAnimalTypes: getAnimalTypes,
                getAnimalCategories: getAnimalCategories,
                getAnimalPurposes: getAnimalPurposes,
                getAnimalRisingTechnologies: getAnimalRisingTechnologies,
                getAnimalProductionTypes: getAnimalProductionTypes,
                getFarmCapacities: getFarmCapacities,
                getFoodGroups: getFoodGroups,
                getFoodSubGroups: getFoodSubGroups,
                getFoodItemsByFoodGroup: getFoodItemsByFoodGroup,
                getFoodItems: getFoodItems,
                getFoodItemsPerPurpose: getFoodItemsPerPurpose,

                getServiceTermTypes: getServiceTermTypes,
                getElectronicServiceProviderBasicData: getElectronicServiceProviderBasicData,
                getServiceResultReceiptMethod: getServiceResultReceiptMethod
            };
        }();

        return datacontext;

    }
);