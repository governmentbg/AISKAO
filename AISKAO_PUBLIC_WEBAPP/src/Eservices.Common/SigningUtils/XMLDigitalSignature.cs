using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TechnoLogica.Eservices.Common.SigningUtils
{
     public class XMLDigitalSignature
    {
        //[DisplayName("Наименование")]
        public string IssuerNameCommonName { get; set; }

        //[DisplayName("Адрес")]
        public string IssuerAddress { get; set; }

        //[DisplayName("ЕГН или ЕИК на доставчика на удостоверителни услуги")]
        public string IssuerBulstat { get; set; }

        //[DisplayName("Националност")]
        public string IssuerCountry { get; set; }

        //[DisplayName("Име или наименование")]
        public string TitularName { get; set; }

        //[DisplayName("Адрес")]
        public string TitularAddres { get; set; }

        //[DisplayName("Данни за регистрацията на титуляра на усъвършенствания електронен подпис")]
        public string TitularOrgCourtRegistration { get; set; }

        //[DisplayName("Основание на овластяването")]
        public string AuthorQuality { get; set; }

        //[DisplayName("Име")]
        public string SubjectCommonName { get; set; }

        //[DisplayName("Адрес")]
        public string SubjectAddress { get; set; }

        //[DisplayName("Валиден от")]
        public DateTime NotBefore { get; set; }

        //[DisplayName("Валиден до")]
        public DateTime NotAfter { get; set; }

        //[DisplayName("Ограничения на действието на подписа")]
        public string CretificateUsageRestrictions { get; set; }

        //[DisplayName("Уникален идентификационен код на удостоверението")]
        public string SerialNumber { get; set; }
    }
}
