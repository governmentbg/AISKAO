using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.Text.RegularExpressions;
using System.IO;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(RealEstateAddressDataLandOrUrbanPropertyAddressMD))]
    public partial class RealEstateAddressDataLandOrUrbanPropertyAddress : IInformationObject
    {
        [SelfValidation]
        public void RealEstateAddressDataLandOrUrbanPropertyAddressValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            string[] items = Items;
            int value;
            string msg;
            Regex regex1;
            Regex regex2;
            FileStream docStream;
            XDocument doc;

            if (items != null && ItemsElementName != null)
            {
                if (ItemsElementName.Count() > 0)
                {
                    for(int i = 0; i < ItemsElementName.Count(); i++)
                    {
                        switch (ItemsElementName[i])
                        {
                            case ItemsChoiceTypeAddressData.StreetBoulevardSquare:
                                if (items[i].Length > 1000)
                                {
                                    msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000227, "1000");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                                }
                                break;

                            case ItemsChoiceTypeAddressData.StreetBoulevardSquareNumber:
                                if (items[i].Length > 8)
                                {
                                    msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000228, "8");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                                }
                                break;

                            case ItemsChoiceTypeAddressData.ResidentialComplex:
                                if (items[i].Length > 1000)
                                {
                                    msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000226, "1000");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                                }
                                break;

                            case ItemsChoiceTypeAddressData.BuildingNumber:
                                if (items[i].Length > 4)
                                {
                                    msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000125, "4");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                                }

                                regex1 = new Regex(@"^[А-Яа-я0-9]*$");

                                if (!regex1.IsMatch(items[i]))
                                {
                                    msg = String.Format(Resources.Terms._0006_000018, Resources.Fields._0008_000125, "цифри и букви на кирилица");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000018", null));
                                }
                                break;

                            case ItemsChoiceTypeAddressData.Entrance:
                                if (items[i].Length > 2)
                                {
                                    msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000126, "2");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                                }

                                regex1 = new Regex(@"^[0-9]*$");
                                regex2 = new Regex(@"^[А-Яа-я]{1}$");

                                if (
                                    (!regex1.IsMatch(items[i]) && !regex2.IsMatch(items[i]))
                                    ||
                                    (regex1.IsMatch(items[i]) && regex2.IsMatch(items[i]))
                                    )
                                {
                                    msg = Resources.Terms._0006_000086;
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000082", null));
                                }
                                break;

                            case ItemsChoiceTypeAddressData.Floor:
                                if (items[i].Length > 2)
                                {
                                    msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000127, "2");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                                }

                                regex1 = new Regex(@"^[0-9]*$");

                                if (!regex1.IsMatch(items[i]))
                                {
                                    msg = String.Format(Resources.Terms._0006_000018, Resources.Fields._0008_000127, "цифри");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000018", null));
                                }
                                break;

                            case ItemsChoiceTypeAddressData.SeparateBuildingUnitFunctionalDesignationCode:

                                if (Int32.TryParse(items[i], out value))
                                {
                                    if ((value < 100) || (value > 999))
                                    {
                                        msg = String.Format(Resources.Terms._0006_000139, Resources.Fields._0008_000272, "100", "999");
                                        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000139", null));
                                    }
                                }
                                else
                                {
                                    msg = String.Format(Resources.Terms._0006_000139, Resources.Fields._0008_000272, "100", "999");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000139", null));
                                }

                                docStream = File.OpenRead(Path.Combine(DataAnnotation.Common.StartupPath, "Documents\\BuildingAndSeparateBuildingUnitFunctionalDesignationData.xml"));
                                doc = XDocument.Load(docStream);

                                var functionalDesignationTypes = from designationTypes in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignationType").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Code")
                                                                 select designationTypes.Value;

                                var functionalDesignations = from designations in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignation").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Code")
                                                             select designations.Value;

                                if (!(functionalDesignations.Contains(items[i]) || functionalDesignationTypes.Contains(items[i])))
                                {
                                    msg = String.Format(Resources.Terms._0006_000141, Resources.Fields._0008_000272, "Code", "Класификатор за предназначение на сградите и на самостоятелните обекти в тях по ЗКИР");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000141", null));
                                }

                                docStream.Close();
                                break;

                            case ItemsChoiceTypeAddressData.SeparateBuildingUnitFunctionalDesignationName:
                                docStream = File.OpenRead(Path.Combine(DataAnnotation.Common.StartupPath, "Documents\\BuildingAndSeparateBuildingUnitFunctionalDesignationData.xml"));
                                doc = XDocument.Load(docStream);
                                
                                functionalDesignationTypes = from designationTypes in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignationType").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Name")
                                                     select designationTypes.Value;

                                functionalDesignations = from designations in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignation").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Name")
                                                             select designations.Value;

                                if (!(functionalDesignations.Contains(items[i]) || functionalDesignationTypes.Contains(items[i])))
                                {
                                    msg = String.Format(Resources.Terms._0006_000141, Resources.Fields._0008_000273, "Name", "Класификатор за предназначение на сградите и на самостоятелните обекти в тях по ЗКИР");
                                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000141", null));
                                }

                                docStream.Close();
                                break;

                            default:
                                break;
                                
                        }
                    }
                }

                //if (items.Count() == 9)
                //{
                //    //StreetBoulevardSquare validation
                //    if (items[0].Length > 1000)
                //    {
                //        msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000227, "1000");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                //    }

                //    //StreetBoulevardSquareNumber validation
                //    if (items[1].Length > 8)
                //    {
                //        msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000228, "8");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                //    }

                //    //ResidentialComplex validation
                //    if (items[2].Length > 1000)
                //    {
                //        msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000226, "1000");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                //    }

                //    //BuildingNumber validation
                //    if (items[3].Length > 4)
                //    {
                //        msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000125, "4");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                //    }

                //    regex1 = new Regex(@"^[А-Яа-я0-9]*$");

                //    if (!regex1.IsMatch(items[3]))
                //    {
                //        msg = String.Format(Resources.Terms._0006_000018, Resources.Fields._0008_000125, "цифри и букви на кирилица");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //    }

                //    //Entrance validation
                //    if (items[4].Length > 2)
                //    {
                //        msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000126, "2");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                //    }

                //    regex1 = new Regex(@"^[0-9]*$");
                //    regex2 = new Regex(@"^[А-Яа-я]{1}$");

                //    if (
                //        (!regex1.IsMatch(items[4]) && !regex2.IsMatch(items[4]))
                //        ||
                //        (regex1.IsMatch(items[4]) && regex2.IsMatch(items[4]))
                //        )
                //    {
                //        msg = Resources.Terms._0006_000086;
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //    }

                //    //Floor validation
                //    if (items[5].Length > 2)
                //    {
                //        msg = String.Format(Resources.Terms._0006_000017, Resources.Fields._0008_000127, "2");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000017", null));
                //    }

                //    regex1 = new Regex(@"^[0-9]*$");

                //    if (!regex1.IsMatch(items[5]))
                //    {
                //        msg = String.Format(Resources.Terms._0006_000018, Resources.Fields._0008_000127, "цифри");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //    }

                //    //SeparateBuildingUnitFunctionalDesignationCode validation

                //    if (Int32.TryParse(items[6], out value))
                //    {
                //        if ((value < 100) || (value > 999))
                //        {
                //            msg = String.Format(Resources.Terms._0006_000139, Resources.Fields._0008_000272, "100", "999");
                //            results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //        }
                //    }
                //    else
                //    {
                //        msg = String.Format(Resources.Terms._0006_000139, Resources.Fields._0008_000272, "100", "999");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //    }

                //    docStream = File.OpenRead("../../../../InformationObjects/Documents/BuildingAndSeparateBuildingUnitFunctionalDesignationData.xml");
                //    doc = XDocument.Load(docStream);

                //    var functionalDesignationTypes = from designationTypes in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignationType").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Code")
                //                                     select designationTypes.Value;

                //    var functionalDesignations = from designations in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignation").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Code")
                //                                 select designations.Value;

                //    if (!(functionalDesignations.Contains(items[6]) || functionalDesignationTypes.Contains(items[6])))
                //    {
                //        msg = String.Format(Resources.Terms._0006_000141, Resources.Fields._0008_000272, "Code", "Класификатор за предназначение на сградите и на самостоятелните обекти в тях по ЗКИР");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //    }

                //    //SeparateBuildingUnitFunctionalDesignationName validation
                //    functionalDesignationTypes = from designationTypes in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignationType").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Name")
                //                                     select designationTypes.Value;

                //    functionalDesignations = from designations in doc.Descendants("{http://ereg.egov.bg/segment/R-9012}" + "FunctionalDesignation").Descendants("{http://ereg.egov.bg/segment/R-9012}" + "Name")
                //                                 select designations.Value;

                //    if (!(functionalDesignations.Contains(items[7]) || functionalDesignationTypes.Contains(items[7])))
                //    {
                //        msg = String.Format(Resources.Terms._0006_000141, Resources.Fields._0008_000273, "Name", "Класификатор за предназначение на сградите и на самостоятелните обекти в тях по ЗКИР");
                //        results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "", null));
                //    }   

                //    //SeparateBuildingUnitNumber validation

                //    docStream.Close();
                //}
            }
        }


        public static string GetEnumProperty<T>(T[] itemsElementNames, string[] items, T enumValue)
            where T : struct
        {
            if (itemsElementNames != null)
            {
                for (int i = 0; i < itemsElementNames.Length; i++)
                {
                    if (itemsElementNames[i].Equals(enumValue))
                    {
                        return items[i];
                    }
                }
            }
            return String.Empty;

        }

        public static void SetEnumProperty<T>(
            T[] itemsElementNames, 
            string[] items, 
            T enumValue, 
            string value,
            out T[] outItemsElementNames,
            out string[] outItems)
            where T: struct, IComparable
        {
            SortedDictionary<T, string> sortedItemsList = new SortedDictionary<T, string>();
            if (items != null)
            {
                for (int i = 0; i < items.Length; i++)
                {
                    sortedItemsList.Add(itemsElementNames[i], items[i]);
                }
            }
            if (string.IsNullOrEmpty(value) && sortedItemsList.ContainsKey(enumValue))
            {
                sortedItemsList.Remove(enumValue);
            }
            else
            {
                if (sortedItemsList.ContainsKey(enumValue))
                {
                    sortedItemsList[enumValue] = value;
                }
                else
                {
                    sortedItemsList.Add(enumValue, value);
                }
            }
            outItemsElementNames = sortedItemsList.Keys.ToArray();
            outItems = sortedItemsList.Values.ToArray();
        }

        [XmlIgnore]
        public string BuildingNumber
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.BuildingNumber);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.BuildingNumber,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("BuildingNumber");
            }   
        }

        [XmlIgnore]
        public string Entrance
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.Entrance);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.Entrance,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("Entrance");
            }
        }

        [XmlIgnore]
        public string Floor
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.Floor);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.Floor,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("Floor");
            }
        }

        [XmlIgnore]
        public string LandPropertyArealName
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.LandPropertyArealName);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.LandPropertyArealName,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("LandPropertyArealName");
            }
        }

        [XmlIgnore]
        public string ResidentialComplex
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.ResidentialComplex);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.ResidentialComplex,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("ResidentialComplex");
            }
        }

        [XmlIgnore]
        public string SeparateBuildingUnitFunctionalDesignationCode
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.SeparateBuildingUnitFunctionalDesignationCode);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.SeparateBuildingUnitFunctionalDesignationCode,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("SeparateBuildingUnitFunctionalDesignationCode");
            }
        }

        [XmlIgnore]
        public string SeparateBuildingUnitFunctionalDesignationName
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.SeparateBuildingUnitFunctionalDesignationName);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.SeparateBuildingUnitFunctionalDesignationName,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("SeparateBuildingUnitFunctionalDesignationName");
            }
        }

        [XmlIgnore]
        public string SeparateBuildingUnitNumber
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.SeparateBuildingUnitNumber);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.SeparateBuildingUnitNumber,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("SeparateBuildingUnitNumber");
            }
        }

        [XmlIgnore]
        public string StreetBoulevardSquare
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.StreetBoulevardSquare);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.StreetBoulevardSquare,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("StreetBoulevardSquare");
            }
        }

        [XmlIgnore]
        public string StreetBoulevardSquareNumber
        {
            get
            {
                return GetEnumProperty<ItemsChoiceTypeAddressData>(ItemsElementName, Items, ItemsChoiceTypeAddressData.StreetBoulevardSquareNumber);
            }
            set
            {
                ItemsChoiceTypeAddressData[] outItemsElementNameField;
                string[] outItemsField;
                SetEnumProperty<ItemsChoiceTypeAddressData>(
                    ItemsElementName,
                    Items,
                    ItemsChoiceTypeAddressData.StreetBoulevardSquareNumber,
                    value,
                    out outItemsElementNameField,
                    out outItemsField);

                itemsField = outItemsField;
                itemsElementNameField = outItemsElementNameField;
                OnPropertyChanged("StreetBoulevardSquareNumber");
            }
        }
    }
}
