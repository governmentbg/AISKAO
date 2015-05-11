using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на начините на получаване на резултат от услуга
    /// 
    /// Описва възможните начини на получаване на резултат от услуга, когато резултатът е документ/документи.
    /// </summary>
    public enum ServiceResultReceiptMethod
    {
        /// <summary>
        /// Чрез електронна поща/уеб базирано приложение.
        /// 
        /// Обозначава начин на получаване на резултат от електронна административна услуга по електронен път.
        /// </summary>
        [XmlEnum("0006-000076")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000076")]
        PerEmail,
        /// <summary>
        /// На гише
        /// 
        /// Обозначава начин на получаване на резултат от електронна административна услуга
        /// на гише при доставчика на електронни административни услуги.
        /// </summary>
        [XmlEnum("0006-000077")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000077")]
        PerCounter,
        /// <summary>
        /// На гише в общинска администрация
        /// 
        /// Обозначава начин на получаване на резултат от електронна административна услуга на
        /// гише в общинска администрация. Когато услугата е общинска се има предвид, общинска администрация, различна от доставчика.
        /// </summary>
        [XmlEnum("0006-000078")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000078")]
        PerCounterInMunicipality,
        /// <summary>
        /// Чрез пощенски куриерски служби, на посочения адрес за кореспонденция
        /// 
        /// Обозначава начин на получаване на резултат от електронна административна услуга
        /// чрез пощенски куриерски служби на посочения от заявителя адрес за кореспонденция в данните за контакт.
        /// </summary>
        [XmlEnum("0006-000079")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000079")]
        PerCourierContactAddres,
        /// <summary>
        /// Чрез пощенски куриерски служби, на друг адрес
        /// 
        /// Обозначава начин на получаване на резултат от електронна административна услуга
        /// чрез пощенски куриерски служби на адрес, различен от посочения от заявителя адрес за кореспонденция в данните за контакт.
        /// </summary>
        [XmlEnum("0006-000080")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000080")]
        PerCourierOthers,
        /// <summary>
        /// Чрез пощенски куриерски служби, пощенска кутия
        /// 
        /// Обозначава начин на получаване на резултат от електронна административна услуга
        /// чрез пощенски куриерски служби в пощенска кутия, разположена в пощенски клон.
        /// </summary>
        [XmlEnum("0006-000081")]
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000081")]
        PerPostOfficeBox
    }
}
