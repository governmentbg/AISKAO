using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете становища в АИС
    /// </summary>
    public enum DocumentOpinionType
    {
        /// <summary>
        /// Наименование: Съгласен
        /// 
        /// Вид становище по документ в АИС, с който се изразява съгласие със съдържанието на документа
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000055")]
        [XmlEnum("0006-000055")]
        Agreed,

        /// <summary>
        /// Наименование: Несъгласен
        /// 
        /// Вид становище по документ в АИС, с който се изразява несъгласие със съдържанието на документ,
        /// което не прекратява процедурата по неговата обработка
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000056")]
        [XmlEnum("0006-000056")]
        NotAgreed,

        /// <summary>
        /// Наименование: Прекратявам процедурата
        /// 
        /// Вид становище по документ в АИС, с който се изразява несъгласие със съдържанието на документ, 
        /// което прекратява процедурата по неговата обработка
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000057")]
        [XmlEnum("0006-000057")]
        SuspendProcedure,

        /// <summary>
        /// Наименование: За доработка
        /// 
        /// Вид становище по документ в АИС, с който се изразява несъгласие със съдържанието на документ, 
        /// което връща процедурата по неговата обработка на по-ранен етап
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000058")]
        [XmlEnum("0006-000058")]
        ForFurtherProcessing
    }
}