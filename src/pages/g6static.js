import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import Typography from "@material-ui/core/Typography";
import data1 from './g6static-data1.json';
import Slider from '@material-ui/core/Slider';

const newGraph = (container, boxSize) => {
    return new G6.TreeGraph({
        container: container,
        width: boxSize,
        height: boxSize,
        linkCenter: true,
        fitView: true,
        fitViewPadding: 15,
        fitCenter: true,
        modes: {
            default: [
                {
                    type: 'collapse-expand',
                    onChange: function onChange(item, collapsed) {
                        const data = item.get('model');
                        data.collapsed = collapsed;
                        return true;
                    },
                },
                'drag-canvas',
                'zoom-canvas',
            ],
        },
        defaultNode: {
            size: 26,
        },
        layout: {
            type: 'dendrogram',
            direction: 'LR',
            nodeSep: 20,
            rankSep: 100,
            radial: true,
        },
    })

}

const colors = { a: '#588c73', b: '#f2e394', c: '#d96459', d: '#f2ae72' };

export default function G6Static() {
    const ref = React.useRef(null);
    let graph = null;
    const [initial, setInitial] = React.useState(false);
    const [boxSize, setBoxSize] = React.useState(600);

    useEffect(() => {
        const container = ReactDOM.findDOMNode(ref.current);
        if (initial === false) {
            container.innerHTML = "";
        }
        if (!graph) {
            graph = newGraph(container, boxSize);

            graph.node(function (node) {
                return {
                    label: node.id,
                    color: colors[node.type],
                    style: {
                        fill: colors[node.type],
                        lineWidth: 0,
                    },
                };
            });
        }
        graph.data(data1);
        graph.render();
        graph.fitView();
        setInitial(false);

        console.log(graph)
    }, [boxSize]);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                G6 Radial Tree
            </Typography>
            <Typography variant="body1" gutterBottom>
                https://g6.antv.vision/en/examples/tree/radialtree#radialDendrogram
            </Typography>
            <div style={{width: "500px"}}>
                <Slider
                    defaultValue={boxSize}
                    onChange={ (e, val) => setBoxSize(val) }
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={100}
                    marks
                    min={600}
                    max={1500}
                />
            </div>
            <div ref={ref}></div>
        </div>
    );
}