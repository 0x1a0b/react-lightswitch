import d3flare from './d3view-data.json';
import React from "react";
import Tree from "react-d3-tree";

import { useCallback, useState } from "react";
import Typography from "@material-ui/core/Typography";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const containerRef = useCallback((containerElem) => {
        if (containerElem !== null) {
            const { width, height } = containerElem.getBoundingClientRect();
            setTranslate({ x: width / 2, y: height / 2 });
        }
    }, []);
    return [translate, containerRef];
};

const containerStyles = {
    width: "100vw",
    height: "100vh"
};

export default function D3view() {
    const [translate, containerRef] = useCenteredTree();
    return (
        <div style={containerStyles} ref={containerRef}>
            <Typography variant="h2" gutterBottom>
                react-d3-tree
            </Typography>
            <Typography variant="body1" gutterBottom>
                https://github.com/bkrem/react-d3-tree
            </Typography>
            <Tree
                data={d3flare}
                translate={translate}
                orientation="vertical"
            />
        </div>
    );
}