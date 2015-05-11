using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете трансформации на документи
    /// </summary>
    public enum DocumentTransformationType
    {
        /// <summary>
        /// HTML визуализация
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "DocumentTransformationTypeHTMLView")]
        HTMLView,

        /// <summary>
        /// HTML редакция
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "DocumentTransformationTypeHTMLEdit")]
        HTMLEdit,

        /// <summary>
        /// RegiX заявка
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "DocumentTransformationTypeRegiXRequest")]
        RegiXRequest,

        /// <summary>
        /// Документ
        /// </summary>
        [Display(ResourceType = typeof(Resources.Labels), Name = "DocumentTransformationTypeDocument")]
        Document
    }
}
