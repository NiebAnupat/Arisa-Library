using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services {
    public class BaseService<T> : IBaseService<T> where T : BaseEntity {
        private readonly ArisaLibraryContext _context;
        public BaseService(ArisaLibraryContext context) {
            _context = context;
        }

        public async Task<T> CreateAsync(T entity) {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> DeleteAsync(T entity) {
            // Set IsActive to false for soft delete
            entity.IsActive = false;
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<IEnumerable<T>> GetAllAsync() {
            // Retrieve only active entities
            return await _context.Set<T>().Where(e => e.IsActive).ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id) {
            T entity = await _context.Set<T>().FindAsync(id);
            // Return entity only if it's active
            return entity?.IsActive == true ? entity : null;
        }

        public async Task<T> UpdateAsync(T entity) {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
