using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете услуги, спрямо срока за предоставянето им.
    /// 
    /// Използва се за описване на приетите от доставчика на електронни административни услуги, срокове за предоставянето им.
    /// </summary>
    public enum ServiceTermType
    {
        /// <summary>
        /// Обикновена услуга.
        /// 
        /// Вид на услугата, спрямо срока на предоставянето й, когато услугата се предоставя в законно установения срок.
        /// </summary>
        [XmlEnum("0006-000083")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000083")]
        Normal,
        /// <summary>
        /// Бърза услуга.
        /// 
        /// Вид на услугата, спрямо срока на предоставянето й, когато услугата се изпълнява в срок, по-кратък от законно установения.
        /// </summary>
        [XmlEnum("0006-000084")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000084")]
        Fast,
        /// <summary>
        /// Експресна услуга.
        /// 
        /// Вид на услугата, спрямо срока на предоставянето й, когато услугата се предоставя обикновено в рамките на работния ден.
        /// </summary>
        [XmlEnum("0006-000085")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000085")]
        Express
    }
}
