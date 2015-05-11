using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace TechnoLogica.Eservices.Public.Core.Repositories
{
    public interface IRepository<T> where T: class
    {
        //T Single();
        IQueryable<T> GetAll();
        T FindSingle(Expression<Func<T, bool>> whereClause);
        IQueryable<T> Find(Expression<Func<T, bool>> whereClause);
        T GetByKey(params object[] keyValues);
        //void Add(T entity);
        //void Delete(T entity);
        //void Update(T entity);
    }
}
