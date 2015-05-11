using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете документи по отношение на процеса
    /// </summary>
    public enum DocumentProcessType
    {
        /// <summary>
        /// Наименование: Документ, инициирал услуга или процедура в процес на изпълнение
        /// 
        /// Вид документа по отношение на процеса, с който се обозначава, 
        /// че документът е инициирал услуга или процедура в процес на изпълнение
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000050")]
        [XmlEnum("0006-000050")]
        DocumentThatInitiatedAServiceOrProcessInProgress,

        /// <summary>
        /// Наименование: Документ, инициирал приключила услуга или процедура
        /// 
        /// Вид документа по отношение на процеса, с който се обозначава, 
        /// че документът е инициирал приключила услуга или процедура 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000051")]
        [XmlEnum("0006-000051")]
        DocumentThatInitiatedCompletedServiceOrProcedure,

        /// <summary>
        /// Наименование: Изпратен документ в изчакване на отговор
        /// 
        /// Вид документа по отношение на процеса, с който се обозначава, 
        /// че документът е изпратен в изчакване на отговор 
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000052")]
        [XmlEnum("0006-000052")]
        SentDocumentWaitingForAnswer,

        /// <summary>
        /// Наименование: Документ с получен отговор
        /// 
        /// Вид документа по отношение на процеса, с който се обозначава,
        /// че документът е изпратен с получен отговор
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000053")]
        [XmlEnum("0006-000053")]
        DocumentWithReceivedAnswer,

        /// <summary>
        /// Наименование: Екземпляр за подписване
        /// 
        /// Вид документа по отношение на процеса, с който се обозначава, 
        /// че документът създаден екземпляр за подписване
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000054")]
        [XmlEnum("0006-000054")]
        CopyForSignature

    }
}
