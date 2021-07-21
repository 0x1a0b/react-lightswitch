import dnsData from './g6static-data-dnsMap.json';
import integralData from './g6static-data-integralMapOne.json';
import lbData from './g6static-data-lbMap.json';
import proxyData from './g6static-data-proxyMap.json';
import React, {useEffect} from "react";
import Button from '@material-ui/core/Button';
import G6DataDisplay from "../components/g6dataDisplay";
import './g6dynamic.css';

export default function G6Dynamic(props) {
    const [data, setData] = React.useState({});

    useEffect(() => {

    }, [data, props.materialThemeName]);

    return (
        <div className="parent">
            <Button
                variant="contained"
                color="primary"
                onClick={() => { setData(dnsData) }}
            >
                DNS Data
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { setData(lbData) }}
            >
                LB Data
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { setData(proxyData) }}
            >
                Proxy Data
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { setData(integralData) }}
            >
                Integral view
            </Button>
            { data.id &&
               <G6DataDisplay materialThemeName={props.materialThemeName} graphdata={data} />
            }
        </div>
    )
}