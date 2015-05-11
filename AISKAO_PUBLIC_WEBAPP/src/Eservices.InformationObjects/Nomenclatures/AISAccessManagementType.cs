using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на начините за удостоверяване на правото на достъп на потребител
    /// </summary>
    public enum AISAccessManagementType
    {
        /// <summary>
        /// Наименование: Чрез потребителско име и парола
        /// 
        /// Определя начина за удостоверяване на правото на достъп на потребител 
        /// „чрез потребителско име и парола”
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000043")]
        [XmlEnum("0006-000043")]
        WithUsernameAndPassword,

        /// <summary>
        /// Наименование: Чрез удостоверение за електронен подпис
        /// 
        /// Определя начина за удостоверяване на правото на достъп на потребител „чрез удостоверение за електронен подпис”
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000044")]
        [XmlEnum("0006-000044")]
        WithCertificateForDigitalSignature,

        /// <summary>
        /// Наименование: Чрез директориен LDAP сървър
        /// 
        /// Определя начина за удостоверяване на правото на достъп на потребител „чрез директориен LDAP сървър”
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000045")]
        [XmlEnum("0006-000045")]
        WithLDAPserver,

        /// <summary>
        /// Наименование: По друг начин
        /// 
        /// Определя начина за удостоверяване на правото на достъп на потребител „по друг начин”
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000046")]
        [XmlEnum("0006-000046")]
        OtherMethod
    }
}
