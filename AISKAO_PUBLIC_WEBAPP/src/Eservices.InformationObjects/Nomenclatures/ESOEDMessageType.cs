using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете съобщения пренасяни през ЕСОЕД
    /// </summary>
    public enum ESOEDMessageType
    {
        /// <summary>
        /// Неизвестен тип
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ESOEDMessageTypeUnknown")]
        Unknown,

        /// <summary>
        /// Документ
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ESOEDMessageTypeDocument")]
        Document,

        /// <summary>
        /// Потвърждение за получаването на документ в АИС на получателя
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ESOEDMessageTypeDocumentReceipt")]
        DocumentReceipt,

        /// <summary>
        /// Потвърждение за получаването на документ в ЕСОЕД
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ESOEDMessageTypeEsoedResponse")]
        EsoedResponse,

        /// <summary>
        /// Грешка, установена от ЕСОЕД
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ESOEDMessageTypeEsoedError")]
        EsoedError,

        /// <summary>
        /// Грешка, установена от КК 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ESOEDMessageTypeCCError")]
        CCError
    }
}
