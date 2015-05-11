using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на архивните стойности на документите в АИС
    /// </summary>
    public enum AdministrativeNomenclatureDocumentTypeArchivalType
    {
        /// <summary>
        /// Наименование: С архивна стойност
        /// 
        /// Представя начална оценка относно задължението на съответната администрация 
        /// да осигури предоставянето на документа на Националния архивен фонд за съхранение,
        /// отбелязани "с архивна стойност” 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000038")]
        [XmlEnum("0006-000038")]
        WithArchiveValue,

        /// <summary>
        /// Наименование: Без архивна стойност
        /// 
        /// Представя начална оценка относно задължението на съответната администрация
        /// да осигури предоставянето на документа на Националния архивен фонд за съхранение,
        /// отбелязани "без архивна стойност”
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000039")]
        [XmlEnum("0006-000039")]
        WithoutArchiveValue,

        /// <summary>
        /// Наименвоание: За оценка от експертна комисия
        /// 
        /// Представя начална оценка отностно задължението на съответната администрация 
        /// да осигури предоставянето на документа на Националния архивен фонд за съхранение,
        /// отбелязани " за оценка от експертна комисия” 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000040")]
        [XmlEnum("0006-000040")]
        ToBeEvaluatedByExpertCommission
    }
}
