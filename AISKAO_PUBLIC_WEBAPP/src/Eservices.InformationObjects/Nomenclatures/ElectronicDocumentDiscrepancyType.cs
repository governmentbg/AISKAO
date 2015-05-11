using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на неуспешните проверки за приемане на заявление, подадено по електронен път
    /// </summary>
    public enum ElectronicDocumentDiscrepancyType
    {
        /// <summary>
        /// Обозначава неуспешна проверка дали подаваното заявление е в нормативно установения формат 
        /// при приемане на заявление за електронна административна услуга. 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000005")]
        [XmlEnum("0006-000005")]
        NotInStatutoryFormat,
        /// <summary>
        /// Обозначава неуспешна проверка дали размерът на заявлението за електронна административна 
        /// услуга заедно с приложенията не надвишава определения от административния орган размер 
        /// за електронните административни услуги, предоставяни от съответната администрация. 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000006")]
        [XmlEnum("0006-000006")]
        ExceedPrescribedSize,
        /// <summary>
        /// Обозначава неуспешна проверка дали приложените към заявлението за електронна административна 
        /// услуга документи са в нормативно установения формат. 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000007")]
        [XmlEnum("0006-000007")]
        AttachmentsNotInStatutoryFormat,
        /// <summary>
        /// Обозначава неуспешна проверка дали подаденото заявление за електронна административна 
        /// услуга и приложенията към него не съдържат вируси или друг нежелан софтуер. 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000008")]
        [XmlEnum("0006-000008")]
        ContainsVirusesOrOtherUnwantedSoftware,
        /// <summary>
        /// Обозначава неуспешна проверка дали подаденото заявление за електронна административна
        /// услуга съдържа уникален идентификатор на заявителя и на получателя на електронната 
        /// административна услуга при законово изискване за идентификация.  
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000009")]
        [XmlEnum("0006-000009")]
        MissingIdentifier,
        /// <summary>
        /// Обозначава неуспешна проверка дали заявителят на електронна административна услуга 
        /// е посочил електронен пощенски адрес. 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000010")]
        [XmlEnum("0006-000010")]
        MissingEmail,
        /// <summary>
        /// Обозначава неуспешна проверка дали е налице техническа възможност за достъп до съдържанието
        /// на подаден на физически носител електронен документ.  
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000011")]
        [XmlEnum("0006-000011")]
        NoTechnicalCapabilityToAccessContent
    }
}
