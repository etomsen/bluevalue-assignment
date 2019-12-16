import Component from '@ember/component';
import go from 'gojs';

function mapEdgeToGo(e) {
  return {
    to: e.end,
    from: e.start
  };
}

function mapVertexToGo(v) {
  const result = {
    key: `${v.modelName}-${v.id}`,
    text: v.text,
    font: `${v.fontSize}px serif`,
    fill: v.fill || 'white'
  };
  if (v.modelName === 'vertex/node') {
    result.fig = 'RoundedRectangle'
  }
  if (v.modelName === 'vertex/circle') {
    result.fig = 'Circle'
    result.radius = v.radius;
  }
  return result;
}

export default Component.extend({
  actions: {
    updateModel() {
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
  },

  didInsertElement() {
    const Graph = go.GraphObject.make;
    const graph = Graph(go.Diagram, this.elementId);
    const nodeData = this.vertices.map(mapVertexToGo);
    const linkData = this.edges.map(mapEdgeToGo);

    const node = Graph(
      go.Shape,
      {
        portId: '',
        fromLinkable: true,
        toLinkable: true
      },
      new go.Binding('figure', 'fig'),
      new go.Binding('fill', 'fill'),
      new go.Binding('radius', 'radius'),
    );

    graph.toolManager.linkingTool.temporaryLink = Graph(
      go.Link,
      { layerName: 'Tool' },
      Graph(go.Shape, { stroke: 'red', strokeWidth: 2, strokeDashArray: [4, 2]})
    );

    /**
     * TODO: links shifting
     * https://github.com/NorthwoodsSoftware/GoJS/blob/master/extensions/LinkShifting.html
     */

    /**
     * 

  var tempfromnode =
    $(go.Node,
      { layerName: "Tool" },
      $(go.Shape, "RoundedRectangle",
        { stroke: "chartreuse", strokeWidth: 3, fill: null,
          portId: "", width: 1, height: 1 })
    );
  diagram.toolManager.linkingTool.temporaryFromNode = tempfromnode;
  diagram.toolManager.linkingTool.temporaryFromPort = tempfromnode.port;

  var temptonode =
    $(go.Node,
      { layerName: "Tool" },
      $(go.Shape, "RoundedRectangle",
        { stroke: "cyan", strokeWidth: 3, fill: null,
          portId: "", width: 1, height: 1 })
    );
  diagram.toolManager.linkingTool.temporaryToNode = temptonode;
  diagram.toolManager.linkingTool.temporaryToPort = temptonode.port;

     */
    const nodeText = Graph(
      go.TextBlock,
      {
        margin: 5
      },
      new go.Binding('text', 'text'),
      new go.Binding('font', 'font'),
    );
    graph.nodeTemplate = Graph(
      go.Node,
      'Auto',
      node,
      nodeText
    );
    graph.linkTemplate = Graph(
      go.Link,
      {
        relinkableFrom: true,
        relinkableTo: true
      },
      Graph(go.Shape),
      Graph(go.Shape, { toArrow: 'Standard' })
    );
    graph.model = new go.GraphLinksModel(nodeData, linkData);
    this.graph = graph;
  },

  willDestroyElement() {
    this.graph.destroy();
    this._super(...arguments);
  }
});
