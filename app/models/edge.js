import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  modelName: computed.alias('constructor.modelName'),
  text: attr('string'),
  fontSize: attr('number'),
  graph: belongsTo('graph'),
  start: attr('string'),
  end: attr('string')
});
