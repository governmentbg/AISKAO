using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на типовете данни за показване в публично приложение за заявяване на услуга
    /// </summary>
    public enum ServiceInformationBitType
    {
        /// <summary>
        /// Правно основание
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceInformationBitTypeLegalBasis")]
        LegalBasis,
        /// <summary>
        /// Необходим документ
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceInformationBitTypeRequiredDocument")]
        RequiredDocument,
        /// <summary>
        /// Изискване към документите
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceInformationBitTypeDocumentRequirement")]
        DocumentRequirement,
        /// <summary>
        /// Информация за плащане
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceInformationBitTypePaymentInformation")]
        PaymentInformation,
        /// <summary>
        /// Начини за подаване на електронни документи
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceInformationBitTypeRequestMethod")]
        RequestMethod,
        /// <summary>
        /// Вътрешен ход на административната услуга
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "ServiceInformationBitTypeInternalStep")]
        InternalStep
    }
}
