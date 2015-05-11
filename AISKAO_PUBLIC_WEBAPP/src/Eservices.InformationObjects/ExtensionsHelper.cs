using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;

namespace TechnoLogica.Eservices.InformationObjects
{
    public static class ExtensionsHelper
    {
        public static string GetDisplayString(this MemberInfo memberInfo)
        {
            DisplayAttribute da = (DisplayAttribute)Attribute.GetCustomAttribute(memberInfo, typeof(DisplayAttribute), true);
            if (da != null)
            {
                return da.GetName();
            }
            else
            {
                //var mcda = (MultiCulturalDisplayNameAttribute)Attribute.GetCustomAttribute(memberInfo, typeof(MultiCulturalDisplayNameAttribute), true);
                //if (mcda != null)
                //{
                //    return mcda.DisplayName;
                //}
                //else
                //{
                    return memberInfo.Name;
                //}
            }
        }

        public static List<byte> BreakNumber(this Int64 number, int leadingZeros = 0)
        {
            List<byte> list = new List<byte>();

            do
            {
                list.Insert(0, (byte)(number % 10));
                number /= 10;
            } while (number != 0);
            for (int i = 0; i < leadingZeros; i++)
            {
                list.Insert(0, 0);
            }
            return list;
        }


        /// <summary>
        /// Връща дефинирания в атрибут MetadataType тип, а ако няма такъв атрибут входния параметър.
        /// </summary>
        /// <param name="type">Типът, за който ще се определи мета-типа.</param>
        /// <returns>Тип съдържащ метаописанието на подадения тип.</returns>
        public static Type GetMetadataType(this Type type)
        {
            var mta = Attribute.GetCustomAttribute(type, typeof(MetadataTypeAttribute)) as MetadataTypeAttribute;
            if (mta != null)
            {
                // ако е открит мета атрибут му се стойността на свойството
                return mta.MetadataClassType;
            }
            return type;
        }

        /// <summary>
        /// Определя свойството по низово описани на йерархията му в дефиницията на класове.
        /// </summary>
        /// <param name="type">Начален тип от йерархията.</param>
        /// <param name="propertyClassPathKey">Низ описващ пътя до свойството в следния формат "&ltсвойство&gt[[...].&ltсвойство&gt]".<</param>
        /// <returns>Свойството на последния елемент от йерархия или null.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="propertyClassPathKey"/> трябва да има стойност.</exception>
        public static PropertyInfo GetPropertyWithClassPath(this Type type, string propertyClassPathKey)
        {
            return type.GetPropertyWithClassPath(propertyClassPathKey, BindingFlags.Public | BindingFlags.Instance);
        }

        /// <summary>
        /// Определя свойството по низово описани на йерархията му в дефиницията на класове.
        /// </summary>
        /// <param name="type">Начален тип от йерархията.</param>
        /// <param name="propertyClassPathKey">Низ описващ пътя до свойството в следния формат "&ltсвойство&gt[[...].&ltсвойство&gt]".<</param>
        /// <param name="flags">A bitmask comprised of one or more System.Reflection.BindingFlags that specify
        /// how the search is conducted.-or- Zero, to return null.</param>
        /// <returns>Свойството на последния елемент от йерархия или null.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="propertyClassPathKey"/> трябва да има стойност.</exception>
        public static PropertyInfo GetPropertyWithClassPath(this Type type, string propertyClassPathKey, BindingFlags flags)
        {
            Type tempType = type;
            PropertyInfo result = null;
            if (String.IsNullOrWhiteSpace(propertyClassPathKey))
                // ако не е подаден параметър
                throw new ArgumentNullException("propertyClassPathKey");
            else
            {
                // определят се стъпките в йерархията
                string[] pathSteps = propertyClassPathKey.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries);

                for (int i = 0; i < pathSteps.Length; i++)
                {
                    // минава се последователно по всяка стъпка от йерархията
                    result = tempType.GetProperty(pathSteps[i], flags);
                    if (result == null)
                        // ако липсва някоя от свойствата на стъпка
                        return null;
                    tempType = result.PropertyType;
                }
            }
            return result;
        }

        /// <summary>
        /// Намира свойството в мета-типа на подадения тип по подаденате йерария.
        /// </summary>
        /// <param name="type">Типът, за който ще се определи мета-описаното свойство.</param>
        /// <param name="propertyClassPathKey">Низ описващ пътя до свойството в следния формат "&ltсвойство&gt[[...].&ltсвойство&gt]".</param>
        /// <returns>Свойството в мета-типа на подадения тип или null</returns>
        /// <exception cref="ArgumentNullException"><paramref name="propertyClassPathKey"/> трябва да има стойност.</exception>
        public static PropertyInfo GetMetadataProperty(this Type type, string propertyClassPathKey)
        {
            // търси свойството в йерархията на подадения клас
            PropertyInfo pi = type.GetPropertyWithClassPath(propertyClassPathKey);
            if (pi == null)
                // ако не е открито
                return null;
            else
            {
                // определя мета-типа на типа, в който е дефинирано свойството
                Type metadataDeclaringType = pi.DeclaringType.GetMetadataType();
                if (pi.DeclaringType.Equals(metadataDeclaringType))
                    // ако няма дефиниран мета-тип
                    return pi;
                else
                {
                    // определя се мета-свойството от мета-типа
                    PropertyInfo mdpi = metadataDeclaringType.GetProperty(pi.Name);
                    if (mdpi != null)
                        // ако не е открито мета-свойство
                        return mdpi;
                }
            }
            return pi;
        }
    }
}
