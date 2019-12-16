import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  modelName: computed.alias('constructor.modelName'),
  text: attr('string'),
  fill: attr('string'),
  fontSize: attr('number'),
  graph: belongsTo('graph', { inverse: 'vertices'}),
  edges: hasMany('edge', { inverse: false})
});
