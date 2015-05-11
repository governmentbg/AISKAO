using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects.Nomenclatures
{
    /// <summary>
    /// Номенклатура на видовете оценки на изпълнение на задача
    /// </summary>
    public enum AISTaskExecutionAssessmentType
    {
        /// <summary>
        /// Наименование: Липса на проблеми
        /// 
        /// Вид оценка на изпълнение на задача, с която се констатира липсата на проблеми
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000059")]
        [XmlEnum("0006-000059")]
        NoProblems,

        /// <summary>
        /// Наименование: Недостиг на ресурс
        /// 
        /// Вид оценка на изпълнение на задача, с която се констатира недостигът на ресурс
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000060")]
        [XmlEnum("0006-000060")]
        InsufficientResource,

        /// <summary>
        /// Наименование: Външноведомствен проблем
        /// 
        /// Вид оценка на изпълнение на задача, с която се външноведомствен проблем, 
        /// когато се дават указания за предприемане на действия за преодоляването му
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000061")]
        [XmlEnum("0006-000061")]
        NonDepartmentProblem,

        /// <summary>
        /// Наименование: Невъзможност за изпълнение
        /// 
        /// Вид оценка на изпълнение на задача, с която се констатира 
        /// външноведомствен проблем и невъзможност за изпълнение и задачата се отменя
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000062")]
        [XmlEnum("0006-000062")]
        FailureToComply,

        /// <summary>
        /// Наименование: Върната за доработване
        /// 
        /// Вид оценка на изпълнение на задача, с която се констатира невъзможност за изпълнение
        /// и задачата се връща за доработване
        /// </summary>
        [Display(ResourceType = typeof(Resources.Terms), Name = "_0006_000063")]
        [XmlEnum("0006-000063")]
        ReturnedForFurtherProcessing
    }
}