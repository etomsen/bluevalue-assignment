import Vertex from '../vertex';
import faker from 'faker';

export default Vertex.extend({
  radius() {
    return faker.random.number({min: 10, max: 50})
  }
});
