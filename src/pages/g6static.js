import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import Typography from "@material-ui/core/Typography";
import data1 from './g6static-data1.json';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './g6static.css'

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

const colors = {
    dark: {
        a: '#588c73',
        b: '#f2e394',
        c: '#d96459',
        d: '#f2ae72',
        lbBa: "",
        lbSvc: "",
        lbFe: "",
        dnsCname: "",
        dnsA: "",
        dnsHost: "",
        proxyInst: "",
        proxyListener: "",
        proxyVhost: "",
    },
    light: {
        a: '#588c73',
        b: '#f2e394',
        c: '#d96459',
        d: '#f2ae72',
        lbBa: "",
        lbSvc: "",
        lbFe: "",
        dnsCname: "",
        dnsA: "",
        dnsHost: "",
        proxyInst: "",
        proxyListener: "",
        proxyVhost: "",
    },
};

export default function G6Static(props) {
    const ref = React.useRef(null);
    let graph = null;
    const [initial, setInitial] = React.useState(false);
    const [boxSize, setBoxSize] = React.useState(600);
    const [colorScheme, setColorScheme] = React.useState("dark");
    const [lastHoverObject, setLastHoverObject] = React.useState({id: "details", type: "a", description: "Hover a node for details"});

    useEffect(() => {
        setColorScheme(props.materialThemeName)

        const container = ReactDOM.findDOMNode(ref.current);
        if (initial === false) {
            container.innerHTML = "";
        }
        if (!graph) {
            graph = newGraph(container, boxSize);

            graph.node(function (node) {
                return {
                    label: node.id,
                    color: colors[props.materialThemeName][node.type],
                    style: {
                        fill: colors[props.materialThemeName][node.type],
                        lineWidth: 0,
                    },
                };
            });

            graph.on('node:mouseenter', (evt) => {
                const { item } = evt;
                graph.setItemState(item, 'hover', true);
                if (item._cfg.type === "node") {
                    setLastHoverObject({id: item._cfg.model.id, description: "addinfos", type: item._cfg.model.type }) ;
                }
                console.log(item);
            });

            graph.on('node:mouseleave', (evt) => {
                const { item } = evt;
                graph.setItemState(item, 'hover', false);
            });
        }
        graph.data(data1);
        graph.render();
        graph.fitView();
        setInitial(false);

        console.log(graph)
    }, [boxSize, props.materialThemeName]);

    return (
        <div id="g6static" className={"g6static-"+colorScheme}>
            <div className="title">
                <Typography variant="h6" gutterBottom>
                    G6 Radial Tree
                </Typography>
                <Typography variant="body1" gutterBottom>
                    https://g6.antv.vision/en/examples/tree/radialtree#radialDendrogram
                </Typography>
            </div>
            <hr />
            <div className="options" style={{width: "500px"}}>
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { setLastHoverObject({id: "mimi", description: "nanaaaa", type: "b"}) }}
                >
                    Update deail data
                </Button>
            </div>
            <div ref={ref} className="graph"></div>
            <div className="details">
                <hr />
                <Paper variant="outlined" square >
                    <Typography variant="h6" gutterBottom>
                        {lastHoverObject.id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {lastHoverObject.description} ({lastHoverObject.type})
                    </Typography>
                </Paper>
                <hr />
            </div>
        </div>
    );
}