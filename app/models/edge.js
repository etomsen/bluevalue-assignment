import Model, { belongsTo } from '@ember-data/model';

export default Model.extend({
  start: belongsTo('vertex'),
  end: belongsTo('vertex')
});
