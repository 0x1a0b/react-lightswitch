import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import Typography from "@material-ui/core/Typography";
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import './g6dataDisplay.css'
import ls from "local-storage";

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
        lbBa: "#2a6fdb",
        lbSvc: "#48d6d2",
        lbFe: "#fefcbf",
        dnsCname: "#543c52",
        dnsA: "#f55951",
        dnsHost: "#edd2cb",
        proxyInst: "#e0f0ea",
        proxyListener: "#95adbe",
        proxyVhost: "#574f7d",
    },
    light: {
        lbBa: "#2a6fdb",
        lbSvc: "#48d6d2",
        lbFe: "#fefcbf",
        dnsCname: "#543c52",
        dnsA: "#f55951",
        dnsHost: "#edd2cb",
        proxyInst: "#e0f0ea",
        proxyListener: "#95adbe",
        proxyVhost: "#574f7d",
    },
};

const times = x => f => {
    if (x > 0) {
        f()
        times (x - 1) (f)
    }
}

export default function G6DataDisplay(props) {
    const ref = React.useRef(null);
    let graph = null;
    const [initial, setInitial] = React.useState(false);
    const [boxSize, setBoxSize] = React.useState(600);
    const [colorScheme, setColorScheme] = React.useState("dark");
    const [lastHoverObject, setLastHoverObject] = React.useState({id: "details", props: { type: "a", description: "Hover a node for details"}});

    useEffect(() => {
        setColorScheme(props.materialThemeName)

        const storedBoxSize = ls.get('g6zoom')
        if (storedBoxSize) {
            if (storedBoxSize !== boxSize) {
                setBoxSize(storedBoxSize)
            }
        } else {
            ls.set('g6zoom', boxSize)
        }

        const container = ReactDOM.findDOMNode(ref.current);
        if (initial === false) {
           container.innerHTML = "";
        }
        if (!graph) {
            graph = newGraph(container, boxSize);

            graph.node(function (node) {
                return {
                    label: node.id,
                    color: colors[props.materialThemeName][node.props.type],
                    style: {
                        fill: colors[props.materialThemeName][node.props.type],
                        lineWidth: 0,
                    },
                };
            });

            graph.on('node:mouseenter', (evt) => {
                const { item } = evt;
                graph.setItemState(item, 'hover', true);
                if (item._cfg.type === "node") {
                    setLastHoverObject({id: item._cfg.model.id, props: {description: item._cfg.model.props.description, type: item._cfg.model.props.type }}) ;
                }
            });

        }
        graph.data(props.graphdata);
        graph.render();
        graph.fitView();
        setInitial(false);

    }, [boxSize, props.materialThemeName, props.graphdata]);

    return (
        <div id="g6dyn" className={"g6static-"+colorScheme}>
            <div className="title">
                <Typography variant="h2" gutterBottom>
                    { props.graphdata.id }
                </Typography>
                <Typography variant="body1" gutterBottom>
                    { props.graphdata.props.description }
                </Typography>
            </div>
            <hr />
            <div className="options" style={{width: "500px"}}>
                <Slider
                    defaultValue={ ls.get('g6zoom') }
                    onChange={ (e, val) => {setBoxSize(val); ls.set('g6zoom', val)} }
                    valueLabelDisplay="auto"
                    step={100}
                    marks
                    min={600}
                    max={1500}
                />
            </div>
            <div ref={ref} className="graph"></div>
            <div className="details">
                <hr />
                <Paper variant="outlined" square >
                    <Typography variant="h6" gutterBottom>
                        {lastHoverObject.id}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {lastHoverObject.props.description} ({lastHoverObject.props.type})
                    </Typography>
                </Paper>
                <hr />
            </div>
            <div className="scrollForce">
                { times (20) (() => <br /> ) }
            </div>
        </div>
    );
}