import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  text: attr('string'),
  fontSize: attr('number'),
  graph: belongsTo('graph'),
  start: attr('string'),
  end: attr('string')
});
