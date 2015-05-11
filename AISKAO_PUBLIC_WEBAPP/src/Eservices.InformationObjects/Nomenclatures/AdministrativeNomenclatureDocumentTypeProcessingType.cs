using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на начините на обработка на документите в АИС
    /// </summary>
    public enum AdministrativeNomenclatureDocumentTypeProcessingType
    {
        /// <summary>
        /// Наименование: Започване предоставяне на услуга или изпълнението на процедура
        /// 
        /// Използва се, когато документът е заявление или иницииращ документът на процедура
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000035")]
        [XmlEnum("0006-000035")]
        BeginDeliveringServiceOrExecutingProcedure,

        /// <summary>
        /// Наименование: Продължаване предоставянето на услугата или изпълнението на процедурата
        /// 
        /// Използва се, когато документът е отговор на запитване или друг документ от страна на администрацията
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000036")]
        [XmlEnum("0006-000036")]
        ContinueDeliveringServiceOrExecutingProcedure,

        /// <summary>
        /// Наименование: Документ, постъпил във връзка с услугата или процедура, 
        /// който не е отговор на запитване или друг документ от страна на администрацията
        /// 
        /// Използва се когато документът е постъпил във връзка с услугата или процедура,
        /// и не е отговор на запитване или друг документ от страна на администрацията
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000037")]
        [XmlEnum("0006-000037")]
        DocumentForAServiceOrProcedureNotAnAnswerFromTheAdministration
    }
}
