import Controller from '@ember/controller';
import { debounce } from '@ember/runloop';
import faker from 'faker';

export default Controller.extend({
  actions: {
    changeState() {
      // TODO: pass new model state and update it if needed
      this.set('showSpinner', true);
      debounce(this, this.doChangeState, 5000);
    }
  },

  doChangeState() {
    this.model.save().then(() => {
      this.set('showSpinner', false);
    })
  },

  getRandomText: function() {
    const numberWords = faker.random.number({min: 50, max: 300});
    return faker.lorem.words(numberWords);
  }
});
