import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  text() {
    return faker.lorem.words(2)
  },
  fontSize() {
    return faker.random.number({min: 8, max: 21}); 
  },
});
