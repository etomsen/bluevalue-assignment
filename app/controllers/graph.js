import Controller from '@ember/controller';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  actions: {
    changeState() {
      this.set('showSpinner', true);
      debounce(this, this.doChangeState, 5000);
    }
  },

  doChangeState() {
    this.model.save().then(() => {
      this.set('showSpinner', false);
    })
  },
});
