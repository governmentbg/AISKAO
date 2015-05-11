using System.ComponentModel.DataAnnotations;
using System;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Segments;
using System.Xml.Serialization;
using System.Linq;
namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ForeignEntityBasicDataMD))]
    public partial class ForeignEntityBasicData : IInformationObject
    {
        [SelfValidation]
        public void ForeignEntityBasicDataValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            //Проверка дали е попълно или OtherData
            //или Register и Identifier
            if (!(!string.IsNullOrEmpty(OtherData)
                ^
                (
                    !string.IsNullOrEmpty(Register) && !string.IsNullOrEmpty(Identifier)
                )))
            {
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(Resources.Terms._0006_000072, this, "", "0006-000072", null));
            }
        }

        [XmlIgnore]
        public string OtherData
        {
            get
            {
                if (ItemsElementName != null)
                {
                    for (int i = 0; i < this.ItemsElementName.Length; i++)
                    {
                        if (this.ItemsElementName[i] == ItemChoiceTypeForeignEntityData.ForeignEntityOtherData)
                        {
                            return this.Items[i];
                        }
                    }
                }
                return String.Empty;

            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    if (ItemsElementName != null &&
                        ItemsElementName.Where(en => en == ItemChoiceTypeForeignEntityData.ForeignEntityOtherData).Count() > 0)
                    {
                        ItemChoiceTypeForeignEntityData[] itemsElementNames = new ItemChoiceTypeForeignEntityData[ItemsElementName.Length - 1];
                        string[] items = new string[Items.Length - 1];
                        for (int i = 0, j = 0; i < ItemsElementName.Length; i++)
                        {
                            if (ItemsElementName[i] != ItemChoiceTypeForeignEntityData.ForeignEntityOtherData)
                            {
                                itemsElementNames[j] = ItemsElementName[i];
                                items[j] = Items[i];
                                j++;
                            }
                        }
                        itemsField = items;
                        itemsElementNameField = itemsElementNames;
                    }
                    
                }
                else
                {
                    if (ItemsElementName == null)
                    {
                        ItemChoiceTypeForeignEntityData[] itemsElementNames1 = new ItemChoiceTypeForeignEntityData[1] { ItemChoiceTypeForeignEntityData.ForeignEntityOtherData };
                        string[] items1 = new string[1]{value};
                        itemsField = items1;
                        itemsElementNameField = itemsElementNames1;
                        return;
                    }     
                    for (int i = 0; i < this.ItemsElementName.Length; i++)
                    {
                        if (this.ItemsElementName[i] == ItemChoiceTypeForeignEntityData.ForeignEntityOtherData)
                        {
                            this.Items[i] = value;
                            return;
                        }
                    }
                    ItemChoiceTypeForeignEntityData[] itemsElementNames = new ItemChoiceTypeForeignEntityData[ItemsElementName.Length + 1];
                    string[] items = new string[Items.Length + 1];
                    for (int i = 0; i < itemsElementNames.Length - 1; i++)
                    {
                        itemsElementNames[i] = ItemsElementName[i];
                        items[i] = Items[i];
                    }
                    itemsElementNames[itemsElementNames.Length - 1] = ItemChoiceTypeForeignEntityData.ForeignEntityOtherData;
                    items[items.Length - 1] = value;
                    itemsField = items;
                    itemsElementNameField = itemsElementNames;
                }
            }
        }

        [XmlIgnore]
        public string Register
        {
            get
            {
                if (ItemsElementName != null)
                {
                    for (int i = 0; i < this.ItemsElementName.Length; i++)
                    {
                        if (this.ItemsElementName[i] == ItemChoiceTypeForeignEntityData.ForeignEntityRegister)
                        {
                            return this.Items[i];
                        }
                    }
                }
                return String.Empty;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    if (ItemsElementName!= null &&
                        ItemsElementName.Where(en => en == ItemChoiceTypeForeignEntityData.ForeignEntityRegister).Count() > 0)
                    {
                        ItemChoiceTypeForeignEntityData[] itemsElementNames = new ItemChoiceTypeForeignEntityData[ItemsElementName.Length - 1];
                        string[] items = new string[Items.Length - 1];
                        for (int i = 0, j = 0; i < ItemsElementName.Length; i++)
                        {
                            if (ItemsElementName[i] != ItemChoiceTypeForeignEntityData.ForeignEntityRegister)
                            {
                                itemsElementNames[j] = ItemsElementName[i];
                                items[j] = Items[i];
                                j++;
                            }
                        }
                        itemsField = items;
                        itemsElementNameField = itemsElementNames;
                    }
                }
                else
                {
                    if (ItemsElementName == null)
                    {
                        ItemChoiceTypeForeignEntityData[] itemsElementNames1 = new ItemChoiceTypeForeignEntityData[1] { ItemChoiceTypeForeignEntityData.ForeignEntityRegister };
                        string[] items1 = new string[1] { value };
                        itemsField = items1;
                        itemsElementNameField = itemsElementNames1;
                        return;
                    }     
                    for (int i = 0; i < this.ItemsElementName.Length; i++)
                    {
                        if (this.ItemsElementName[i] == ItemChoiceTypeForeignEntityData.ForeignEntityRegister)
                        {
                            this.Items[i] = value;
                            return;
                        }
                    }
                    ItemChoiceTypeForeignEntityData[] itemsElementNames = new ItemChoiceTypeForeignEntityData[ItemsElementName.Length + 1];
                    string[] items = new string[Items.Length + 1];
                    for (int i = 0; i < itemsElementNames.Length - 1; i++)
                    {
                        itemsElementNames[i] = ItemsElementName[i];
                        items[i] = Items[i];
                    }
                    itemsElementNames[itemsElementNames.Length - 1] = ItemChoiceTypeForeignEntityData.ForeignEntityRegister;
                    items[items.Length - 1] = value;
                    itemsField = items;
                    itemsElementNameField = itemsElementNames;
                }
            }
        }

        [XmlIgnore]
        public string Identifier
        {
            get
            {

                if (ItemsElementName != null)
                {
                    for (int i = 0; i < this.ItemsElementName.Length; i++)
                    {
                        if (this.ItemsElementName[i] == ItemChoiceTypeForeignEntityData.ForeignEntityIdentifier)
                        {
                            return this.Items[i];
                        }
                    }
                }
                return String.Empty;
            }
            set
            {  
                if (string.IsNullOrEmpty(value))
                {
                    if (ItemsElementName != null &&
                        ItemsElementName.Where(en => en == ItemChoiceTypeForeignEntityData.ForeignEntityIdentifier).Count() > 0)
                    {
                        ItemChoiceTypeForeignEntityData[] itemsElementNames = new ItemChoiceTypeForeignEntityData[ItemsElementName.Length - 1];
                        string[] items = new string[Items.Length - 1];
                        for (int i = 0, j = 0; i < ItemsElementName.Length; i++)
                        {
                            if (ItemsElementName[i] != ItemChoiceTypeForeignEntityData.ForeignEntityIdentifier)
                            {
                                itemsElementNames[j] = ItemsElementName[i];
                                items[j] = Items[i];
                                j++;
                            }
                        }
                        itemsField = items;
                        itemsElementNameField = itemsElementNames;
                    }
                    
                }
                else
                {
                    if (ItemsElementName == null)
                    {
                        ItemChoiceTypeForeignEntityData[] itemsElementNames1 = new ItemChoiceTypeForeignEntityData[1] { ItemChoiceTypeForeignEntityData.ForeignEntityIdentifier };
                        string[] items1 = new string[1] { value };
                        itemsField = items1;
                        itemsElementNameField = itemsElementNames1;
                        return;
                    }                        
                    for (int i = 0; i < this.ItemsElementName.Length; i++)
                    {
                        if (this.ItemsElementName[i] == ItemChoiceTypeForeignEntityData.ForeignEntityIdentifier)
                        {
                            this.Items[i] = value;
                            return;
                        }
                    }
                    ItemChoiceTypeForeignEntityData[] itemsElementNames = new ItemChoiceTypeForeignEntityData[ItemsElementName.Length + 1];
                    string[] items = new string[Items.Length + 1];
                    for (int i = 0; i < itemsElementNames.Length - 1; i++)
                    {
                        itemsElementNames[i] = ItemsElementName[i];
                        items[i] = Items[i];
                    }
                    itemsElementNames[itemsElementNames.Length - 1] = ItemChoiceTypeForeignEntityData.ForeignEntityIdentifier;
                    items[items.Length - 1] = value;
                    itemsField = items;
                    itemsElementNameField = itemsElementNames;
                }
            }
        }        

        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
