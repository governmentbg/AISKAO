using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;
using System.Linq.Expressions;
namespace TechnoLogica.Eservices.Public.Infrastructure.Repositories
{
    public class SQLRepository<T> : IRepository<T> where T: class
    {

        protected DbContext Context;

        public SQLRepository(DbContext context)
        {
            this.Context = context;
        }

        protected DbSet<T> DbSet
        {
            get { return this.Context.Set<T>(); }
        }


        public IQueryable<T> GetAll()
        {
            return DbSet.AsQueryable();
        }

        public T FindSingle(Expression<Func<T, bool>> whereClause)
        {
            return DbSet.Where(whereClause).FirstOrDefault();
        }

        public IQueryable<T> Find(Expression<Func<T, bool>> whereClause)
        {
            return DbSet.Where(whereClause).AsQueryable();
        }

        public virtual T GetByKey(params object[] keyValues)
        {
            return DbSet.Find(keyValues);
        }

        public void Add(T entity)
        {
            DbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
