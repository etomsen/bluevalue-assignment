import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  text: attr('string'),
  fontSize: attr('number'),
  start: belongsTo('vertex'),
  end: belongsTo('vertex')
});
