using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете пренос по електронен път, посредством който 
    /// документи се получават от доставчик на електронна административна услуга
    /// </summary>
    public enum DocumentElectronicTransportType
    {
        /// <summary>
        /// Обозначава начина на пренос на електронен документ чрез уеб базирано приложение.
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000001")]
        [XmlEnum("0006-000001")]
        WebBasedApplication,
        /// <summary>
        /// Обозначава начина на пренос на електронен документ чрез електронна поща.
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000002")]
        [XmlEnum("0006-000002")]
        Email,
        /// <summary>
        /// Обозначава начина на пренос на електронен документ чрез физически носител.
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000003")]
        [XmlEnum("0006-000003")]
        PhysicalCarrier,
        /// <summary>
        /// Обозначава начина на пренос на електронен документ чрез единната среда за обмен на електронни документи (ЕСОЕД).
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000004")]
        [XmlEnum("0006-000004")]
        UEEED
    }
}
