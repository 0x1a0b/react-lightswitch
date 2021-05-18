import Typography from '@material-ui/core/Typography';
import React, {Component, useState} from "react";
import {
    GraphView,
} from 'react-digraph';
import sample from './diagraph.json';
import './diagraph.css'

const GraphConfig =  {
    NodeTypes: {
        empty: { // required to show empty nodes
            typeText: "None",
            shapeId: "#empty", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="empty" key="0">
                    <circle cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        custom: { // required to show empty nodes
            typeText: "Custom",
            shapeId: "#custom", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 50 25" id="custom" key="0">
                    <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
                </symbol>
            )
        }
    },
    NodeSubtypes: {},
    EdgeTypes: {
        emptyEdge: {  // required to show empty edges
            shapeId: "#emptyEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
                </symbol>
            )
        }
    }
}

const NODE_KEY = "id"

export default class ReactDiagraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            graph: sample,
            selected: {},
        }
    }

    render() {
        const nodes = this.state.graph.nodes;
        const edges = this.state.graph.edges;
        const selected = this.state.selected;

        const NodeTypes = GraphConfig.NodeTypes;
        const NodeSubtypes = GraphConfig.NodeSubtypes;
        const EdgeTypes = GraphConfig.EdgeTypes;

        return (
            <div id='graph' className={this.props.materialThemeName} style={{ height: "50rem" }}>
                <Typography variant="h2" gutterBottom>
                    ReactDiagraph
                </Typography>
                <Typography variant="body1" gutterBottom>
                    https://github.com/uber/react-digraph
                </Typography>
                <GraphView  ref='GraphView'
                            nodeKey={NODE_KEY}
                            nodes={nodes}
                            edges={edges}
                            selected={selected}
                            nodeTypes={NodeTypes}
                            nodeSubtypes={NodeSubtypes}
                            edgeTypes={EdgeTypes}
                            allowMultiselect={true} // true by default, set to false to disable multi select.
                            onSelect={this.onSelect}
                            onCreateNode={this.onCreateNode}
                            onUpdateNode={this.onUpdateNode}
                            onDeleteNode={this.onDeleteNode}
                            onCreateEdge={this.onCreateEdge}
                            onSwapEdge={this.onSwapEdge}
                            onDeleteEdge={this.onDeleteEdge}
                            gridDotSize={1}
                />
            </div>
        );
    }

}
