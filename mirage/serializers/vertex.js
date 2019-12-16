import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(models) {
    let json = { data: [] };
    
    models.forEach(model => {
      json.data.push({
        id: model.id,
        type: model.modelName,
        attributes: model.attrs
      });
    });
    
    return json;
  }
});
