import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default Model.extend({
  text: attr('string'),
  fontSize: attr('number'),
  edges: hasMany('edge'),
  graph: belongsTo('graph')
});
