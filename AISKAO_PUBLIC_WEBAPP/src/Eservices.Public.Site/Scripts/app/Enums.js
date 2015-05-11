define('Enums',
    ['ko'],
    function (ko) {

        var Enums = function () {
            var attachedDocumentTypes = [{
                key: "attachedDocument",
                name: "Неструктуриран документ"
            },
                {
                    key: "attachedXmlDocument",
                    name: "Структуриран документ"
                }],
                personTypes =
                [{
                    key: "person",
                    name: "Физическо лице"
                },
                {
                    key: "foreignPerson",
                    name: "Физическо лице, нерегистрирано по българското законодателство"
                }],
                entityTypes =
                [{
                    key: "entity",
                    name: "Юридическо лице"
                },
                {
                    key: "foreignEntity",
                    name: "Чуждестранно юридическо лице"
                }],
                identifierType =
                [{
                    key: "EGN",
                    name: "ЕГН"
                },
                {
                    key: "LNCh",
                    name: "ЛНЧ"
                }],
                identifierTypes =
                [{
                    key: "egn",
                    name: "ЕГН"
                },
                {
                    key: "lnch",
                    name: "ЛНЧ"
                }],

                applicationTypes =
                [{
                    key: "0006-000121",
                    name: "Първоначално заявление за предоставяне на електронна административна услуга"
                },
                {
                    key: "0006-000122",
                    name: "Заявление за промяна или допълване на данни в първоначално подадено заявление"
                },
                {
                    key: "0006-000123",
                    name: "Заявление за отстраняване на нередовности или предоставяне на информация"
                }],
                electronicServiceProviderTypes =
                [{
                    key: "0006-000031",
                    name: "Административен орган"
                },
                {
                    key: "0006-000032",
                    name: "Лице, осъществяващо публични функции"
                },
                {
                    key: "0006-000033",
                    name: "Организация, предоставящи обществени услуги"
                }],
                serviceTermTypes =
                [{
                    key: "0006-000083",
                    name: "Обикновена"
                },
                {
                    key: "0006-000084",
                    name: "Бърза"
                },
                {
                    key: "0006-000085",
                    name: "Експресна"
                }],
                serviceResultReceiptMethods =
                [{
                    key: "0006-000076",
                    name: "Чрез електронна поща/уеб базирано приложение"
                },
                {
                    key: "0006-000077",
                    name: "На гише"
                },
                {
                    key: "0006-000078",
                    name: "На гише в общинска администрация"
                },
                {
                    key: "0006-000079",
                    name: "Чрез пощенски куриерски служби, на посочения адрес за кореспонденция"
                },
                {
                    key: "0006-000080",
                    name: "Чрез пощенски куриерски служби, на друг адрес"
                },
                {
                    key: "0006-000081",
                    name: "Чрез пощенски куриерски служби, пощенска кутия"
                }],
                transportTypes =
                [{
                    key: "0006-000001",
                    name: "Пренос на електронен документ чрез уеб базирано приложение"
                },
                {
                    key: "0006-000002",
                    name: "Пренос на електронен документ чрез електронна поща"
                },
                {
                    key: "0006-000003",
                    name: "Пренос на електронен документ чрез физически носител"
                },
                {
                    key: "0006-000004",
                    name: "Пренос на електронен документ чрез единната среда за обмен на електронни документи"

                }],
                discrepancyTypes =
                [{
                    key: "0006-000005",
                    name: "Подаваното заявление не е в нормативно установения формат"
                },
                {
                    key: "0006-000006",
                    name: "Размерът на заявлението заедно с приложенията надвишава определения от административния орган размер за електронните административни услуги, предоставяни от съответната администрация"
                },
                {
                    key: "0006-000007",
                    name: "Приложените към заявлението документи не са в нормативно установения формат"
                },
                {
                    key: "0006-000008",
                    name: "Подаденото заявление и приложенията към него съдържат вируси или друг нежелан софтуер"
                },
                {
                    key: "0006-000009",
                    name: "Подаденото заявление не съдържа уникален идентификатор на заявителя и на получателя на електронната административна услуга при законово изискване за идентификация"
                },
                {
                    key: "0006-000010",
                    name: "Заявителят не е посочил електронен пощенски адрес"
                }],
                officials = [{
                    key: "PersonNames",
                    name: "Лице, регистрирано по българското законодателство"
                },
                {
                    key: "ForeignCitizenNames",
                    name: "Лице, нерегистрирано по българското законодателство"
                }],
                IAMANavigableExperienceLanguageTypes = [{
                    key: "R-1013",
                    name: "Български език"
                },
                {
                    key: "R-1014",
                    name: "Английски език"
                },
                {
                    key: "R-1015",
                    name: "Български и английски език"
                }],
                IAMALeaderShipTypes = [{
                    key: "R-1020",
                    name: "Водач на кораб до 40 БТ по море"
                },
                {
                    key: "R-1021",
                    name: "Водач на малък кораб"
                }],
                foodObjectPurposeTypes = [{
                    key: "R-1009",
                    name: "Производство на храни"
                },
                {
                    key: "R-1010",
                    name: "Търговия на едро с храни"
                },
                {
                    key: "R-1011",
                    name: "Търговия на дребно с храни"
                },
                {
                    key: "R-1015",
                    name: "Търговия на дребно с храни с производство и реализация на място"
                },
                {
                    key: "R-1012",
                    name: "Търговия на дребно с храни на територията на училища"
                },
                {
                    key: "R-1013",
                    name: "Заведение за обществено хранене"
                },
                {
                    key: "R-1014",
                    name: "Заведение за организирано хранене на територията на детски заведения и училища"
                }],
                foodObjectRegistrationTypes = [{
                    key: "R-1067",
                    name: "Постоянна регистрация"
                },
                {
                    key: "R-1066",
                    name: "Временна регистрация"
                }],
                plantObjectActivityTypes = [{
                    key: "R-1080",
                    name: "Търговия с продукти за растителна защита"
                },
                {
                    key: "R-1081",
                    name: "Преопаковане на продукти за растителна защита"
                }],
                plantObjectTypes = [{
                    key: "R-1087",
                    name: "Склад"
                },
                {
                    key: "R-1088",
                    name: "Селскостопанска аптека"
                },
                {
                    key: "R-1089",
                    name: "Цех"
                }],
                forageObjectVehicleTypes = [{
                    key: "R-1117",
                    name: "собствени транспортни средства"
                },
                {
                    key: "R-1118",
                    name: "наемни транспортни средства"
                }],
                forageMaterialProductTypes = [{
                    key: "R-1123",
                    name: "Продукти, получени от преработката на зърнени култури"
                },
                {
                    key: "R-1124",
                    name: "Продукти, получени от преработката на маслодайни семена и маслодайни плодове"
                },
                {
                    key: "R-1125",
                    name: "Продукти, получени от преработката на семена на бобови култури"
                },
                {
                    key: "R-1126",
                    name: "Продукти, получени от преработката на клубеплодни и кореноплодни"
                },
                {
                    key: "R-1127",
                    name: "Продукти, получени от преработката на други семена и плодове"
                },
                {
                    key: "R-1128",
                    name: "Продукти, получени от преработката на тревни и груби фуражи"
                },
                {
                    key: "R-1129",
                    name: "Продукти, получени от преработката на други растения и водорасли"
                },
                {
                    key: "R-1130",
                    name: "Продукти, получени от преработката на млечни продукти"
                },
                {
                    key: "R-1131",
                    name: "Продукти, получени от преработката на сухоземни животни"
                },
                {
                    key: "R-1132",
                    name: "Продукти, получени от преработката на риба и други водни животни"
                },
                {
                    key: "R-1133",
                    name: "Минерали и получените от тях продукти"
                },
                {
                    key: "R-1134",
                    name: "Странични продукти от ферментацията на микроорганизми"
                },
                {
                    key: "R-1135",
                    name: "Разни (продукти, получени от производството на тестени и макаронени изделия, сладкарски изделия, зърнени закуски, захарни изделия, снаксове и др.)"
                }],
                forageSupplementTypes = [{
                    key: "R-1146",
                    name: "Технологични фуражни добавки, с изключение на: Добавките, които са предмет на точка 1, буква б) („антиоксиданти”) от Приложение І на Регламент (ЕО) № 1831/2003: само добавките с фиксирано максимално съдържание"
                },
                {
                    key: "R-1147",
                    name: "Сензорни добавки, с изключение на: Добавките, които са предмет на точка 2, буква а) („оцветители”) от Приложение І на Регламент (ЕО) № 1831/2003: каротеноиди и ксантофили"
                }],
                foragePremixTypes = [{
                    key: "R-1154",
                    name: "Хранителни добавки, с изключение на добавките, които са предмет на точка 3, буква а) от Приложение І на Регламент (ЕО) № 1831/2003: витамини А и Д"
                },
                {
                    key: "R-1155",
                    name: "Хранителни добавки, с изключение на добавките, които са предмет на точка 3, буква б) от Приложение І на Регламент (ЕО) № 1831/2003: мед и селен"
                },
                {
                    key: "R-1156",
                    name: "Зоотехнически добавки, с изключение на добавките, които са предмет на точка 4, буква г) (“други зоотехнически добавки”) от Приложение І към Регламент (ЕО) № 1831/2003"
                }],
                forageCombinedMaterialCountTypes = [{
                    key: "R-1163",
                    name: "Комбинирани фуражи, включващи до три фуражни суровини"
                },
                {
                    key: "R-1164",
                    name: "Комбинирани фуражи, включващи над три фуражни суровини"
                }],
                forageCombinedSupplementPremixTypes = [{
                    key: "R-1171",
                    name: "Комбинирани фуражи, предназначени само за пазара, съдържащи фуражни добавки и/или премикси, изготвени на основата на фуражни добавки, изброени в чл. 6 и Приложение І на Регламент (ЕО) № 1831/2003, относно добавки за използване при храненето на животните, с изключение на фуражни добавки от категорията „кокцидиостатици и хистомоностатици”, посочени в буква д) на чл. 6, параграф 1 и буква г) от Приложение І на Регламент (ЕО) № 1831/2003 – „други зоотехнически добавки”"
                },
                {
                    key: "R-1173",
                    name: "Комбинирани фуражи, предназначени за собствено животновъдство и за пазара, съдържащи фуражни добавки и/или премикси, изготвени на основата на фуражни добавки, изброени в чл. 6 и Приложение І на Регламент (ЕО) № 1831/2003, относно добавки за използване при храненето на животните, с изключение на фуражни добавки от категорията „кокцидиостатици и хистомоностатици”, посочени в буква д) на чл. 6, параграф 1 и буква г) от Приложение І на Регламент (ЕО) № 1831/2003 – „други зоотехнически добавки”"
                },
                {
                    key: "R-1172",
                    name: "Комбинирани фуражи, предназначени само за собствено животновъдство, съдържащи фуражни добавки и/или премикси, изготвени на основата на фуражни добавки, изброени в чл. 6 и Приложение І на Регламент (ЕО) № 1831/2003, относно добавки за използване при храненето на животните, с изключение на фуражни добавки от категорията „кокцидиостатици и хистомоностатици”, посочени в буква д) на чл. 6, параграф 1 и буква г) от Приложение І на Регламент (ЕО) № 1831/2003 – „други зоотехнически добавки”"
                },
                {
                    key: "R-1174",
                    name: "Млекозаместители, предназначени за пазара"
                }],
                forageMaterialByProductionTypes = [{
                    key: "R-1181",
                    name: "Фуражни суровини от местно производство"
                },
                {
                    key: "R-1182",
                    name: "Фуражни суровини от внос"
                }],
                forageCombinedTradingTypes = [{
                    key: "R-1193",
                    name: "Пълноценни фуражи"
                },
                {
                    key: "R-1194",
                    name: "Млекозаместители"
                },
                {
                    key: "R-1195",
                    name: "Допълващи фуражи, съдържащи фуражни добавки и премикси, изготвени на основата на фуражни добавки"
                },
                {
                    key: "R-1196",
                    name: "Комбинирани фуражи, съдържащи само фуражни суровини"
                },
                {
                    key: "R-1197",
                    name: "Минерални фуражи"
                },
                {
                    key: "R-1198",
                    name: "Допълващи фуражи, изготвени на основата на меласа"
                },
                {
                    key: "R-1199",
                    name: "Храни за домашни любимци, предназначени за търговия на едро"
                },
                {
                    key: "R-1200",
                    name: "Фуражи със специално предназначение"
                }],
                forageTradingTypes = [{
                    key: "R-1207",
                    name: "Фуражни суровини"
                },
                {
                    key: "R-1208",
                    name: "Фуражни добавки и премикси на основата на фуражни добавки"
                },
                {
                    key: "R-1209",
                    name: "Комбинирани фуражи"
                }],
                animalPurposes = [{
                    key: "1",
                    name: "За репродукция"
                },
                {
                    key: "2",
                    name: "За продукция"
                },
                {
                    key: "3",
                    name: "За спорт"
                },
                {
                    key: "4",
                    name: "За компаньон"
                },
                {
                    key: "5",
                    name: "За работа"
                }],
                forageFormTypes = [{
                    key: "R-1295",
                    name: "Насипни"
                },
                {
                    key: "R-1296",
                    name: "Течни"
                },
                {
                    key: "R-1297",
                    name: "Опаковани"
                }],

                animalTypes = [{
                    key: "R-1216",
                    name: "Птици"
                },
                {
                    key: "R-1217",
                    name: "Свине"
                },
                {
                    key: "R-1218",
                    name: "Зайци"
                },
                {
                    key: "R-1219",
                    name: "Преживни"
                },
                {
                    key: "R-1220",
                    name: "Други"
                }],
                forageFormTypes = [{
                    key: "R-1295",
                    name: "Насипни"
                },
                {
                    key: "R-1296",
                    name: "Течни"
                },
                {
                    key: "R-1297",
                    name: "Опаковани"
                }],
                forageTypeForTransportations = [{
                    key: "R-1191",
                    name: "Фуражни суровини"
                },
                {
                    key: "R-1237",
                    name: "Фуражни добавки"
                },
                {
                    key: "R-1238",
                    name: "Премикси, изготвени на основата на фуражни добавки"
                },
                {
                    key: "R-1193",
                    name: "Комбинирани фуражи"
                },
                {
                    key: "R-1184",
                    name: "Фуражи със специално предназначение"
                },
                {
                    key: "R-1239",
                    name: "Медикаментозни фуражи"
                }],
                returnCodeTypes = [{
                    key: "0000",
                    name: "успешна операция"
                },
                {
                    key: "0100",
                    name: "няма данни отговарящи на условието"
                }],
                statusTypes = [{
                    key: "Нова партида",
                    name: "Нова партида"
                },
                {
                    key: "Пререгистрирана партида",
                    name: "Пререгистрирана партида"
                },
                {
                    key: "Нова закрита партида",
                    name: "Нова закрита партида"
                },
                {
                    key: "Пререгистрирана закрита партида",
                    name: "Пререгистрирана закрита партида"
                }],
                revisedAnimalProteinTypes = [{
                    key: "R-1233",
                    name: "рибно брашно"
                },
                {
                    key: "R-1234",
                    name: "кръвно брашно"
                }],
                bloodProductsTypes = [{
                    key: "R-1244",
                    name: "хемоглобин"
                },
                {
                    key: "R-1243",
                    name: "кръвна плазма"
                }],
                otherProductTypes = [{
                    key: "R-1253",
                    name: "рибно масло"
                },
                {
                    key: "R-1254",
                    name: "мляко и/или млечни продукти и производни продукти (суроватка, цвик)"
                },
                {
                    key: "R-1255",
                    name: "топени мазнини"
                }],
                animalTypeFedWithRelatedAnimalProducts = [{
                    key: "R-1270",
                    name: "свине"
                },
                {
                    key: "R-1271",
                    name: "птици"
                },
                {
                    key: "R-1272",
                    name: "преживни"
                },
                {
                    key: "R-1273",
                    name: "риби"
                }],
                forageFormBulkOrPackeds = [{
                    key: "R-1295",
                    name: "Насипни"
                },
                {
                    key: "R-1297",
                    name: "Опаковани"
                }],
                navigationCompetencies = [{
                    key: "R-1157",
                    name: "Капитан вътрешно плаване"
                },
                {
                    key: "R-1158",
                    name: "Щурман"
                },
                {
                    key: "R-1159",
                    name: "Щурман обща категория"
                },
                {
                    key: "R-1021",
                    name: "Водач на малък кораб"
                },
                {
                    key: "R-1160",
                    name: "Механик вътрешно плаване"
                },
                {
                    key: "R-1161",
                    name: "Електромеханик вътрешно плаване"
                },
                {
                    key: "R-1162",
                    name: "Моряк - моторист"
                }],
                seaWorkRestrictions = [{
                    key: "R-1134",
                    name: "Нефтени танкери"
                },
                {
                    key: "R-1135",
                    name: "Танкери газовози"
                },
                {
                    key: "R-1136",
                    name: "Танкери химикаловози"
                }];
            return {
                attachedDocumentTypes: attachedDocumentTypes,
                personTypes: personTypes,
                entityTypes: entityTypes,
                identifierTypes: identifierTypes,
                identifierType: identifierType,
                applicationTypes: applicationTypes,
                electronicServiceProviderTypes: electronicServiceProviderTypes,
                serviceTermTypes: serviceTermTypes,
                serviceResultReceiptMethods: serviceResultReceiptMethods,
                transportTypes: transportTypes,
                discrepancyTypes: discrepancyTypes,
                officials: officials,
                IAMANavigableExperienceLanguageTypes: IAMANavigableExperienceLanguageTypes,
                IAMALeaderShipTypes: IAMALeaderShipTypes,
                foodObjectPurposeTypes: foodObjectPurposeTypes,
                foodObjectRegistrationTypes: foodObjectRegistrationTypes,
                plantObjectActivityTypes: plantObjectActivityTypes,
                plantObjectTypes: plantObjectTypes,
                forageObjectVehicleTypes: forageObjectVehicleTypes,
                forageMaterialProductTypes: forageMaterialProductTypes,
                forageSupplementTypes: forageSupplementTypes,
                foragePremixTypes: foragePremixTypes,
                forageCombinedMaterialCountTypes: forageCombinedMaterialCountTypes,
                forageCombinedSupplementPremixTypes: forageCombinedSupplementPremixTypes,
                forageMaterialByProductionTypes: forageMaterialByProductionTypes,
                forageCombinedTradingTypes: forageCombinedTradingTypes,
                forageTradingTypes: forageTradingTypes,
                animalPurposes: animalPurposes,
                animalTypes: animalTypes,
                forageFormTypes: forageFormTypes,
                forageTypeForTransportations: forageTypeForTransportations,
                returnCodeTypes: returnCodeTypes,
                statusTypes: statusTypes,
                revisedAnimalProteinTypes: revisedAnimalProteinTypes,
                bloodProductsTypes: bloodProductsTypes,
                otherProductTypes: otherProductTypes,
                animalTypeFedWithRelatedAnimalProducts: animalTypeFedWithRelatedAnimalProducts,
                forageFormBulkOrPackeds: forageFormBulkOrPackeds,
                navigationCompetencies: navigationCompetencies,
                seaWorkRestrictions: seaWorkRestrictions,
            };
          }();
          return Enums;
    });