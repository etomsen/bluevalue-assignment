import Component from '@ember/component';
import go from 'gojs';

/**
 * TODO:
 * 1. [ ] Pass params data to graph
 * 2. [x] Linking
 * 3. [ ] Link Shifting
 * 4. [x] Relinking
 * 5. [ ] context menu for both nodes and text with one font-size button
 */
export default Component.extend({
  actions: {
    updateModel() {
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    const {vertices} = this;
    if (Array.isArray(vertices)) {
      this.set('vertices', vertices);
    } else {
      this.set('vertices', []);
    }
  },

  didInsertElement() {
    const Graph = go.GraphObject.make;
    const graph = Graph(go.Diagram, this.elementId);
    const nodeData = [
      { key: 'Alfa', fill: "lightblue", fig: 'Circle'},
      { key: 'Betta', fill: "lightgreen", fig: 'RoundedRectangle' },
      { key: 'Gamma', fill: "lightblue", fig: 'RoundedRectangle'}
    ];
    const linkData = [
      { to: 'Betta', from: 'Alfa'},
      { to: 'Betta', from: 'Gamma'}
    ];
    const node = Graph(
      go.Shape,
      {
        portId: '',
        fromLinkable: true,
        toLinkable: true
      },
      new go.Binding('figure', 'fig'),
      new go.Binding('fill', 'fill')
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
      { margin: 5 },
      new go.Binding('text', 'key')
    );
    graph.nodeTemplate = Graph(
      go.Node,
      'Auto',
      node,
      nodeText
    );
    graph.linkTemplate = Graph(
      go.Link,
      { relinkableFrom: true, relinkableTo: true },
      Graph(go.Shape),
      Graph(go.Shape, { toArrow: "Standard" })
    );
    graph.model = new go.GraphLinksModel(nodeData, linkData);
    this.graph = graph;
  },

  willDestroyElement() {
    this.graph.destroy();
    this._super(...arguments);
  }
});
