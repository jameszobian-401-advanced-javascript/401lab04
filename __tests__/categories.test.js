const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  it('can delete() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
    .then(record => {
      return categories.delete(record.id)
        .then(async() => {
          let fromDB = categories.get(record.id);
          expect(fromDB.length).toBe(0);
        });
    });
  });

  it('can update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        expect(record.name).toEqual('Test Category')
        let updatedRecord = {id:record.id, name:'Testing'};
        return categories.update(record.id, updatedRecord);
      })
        .then(record => {
          expect(record.name).toEqual('Testing');
        });
            });
          });