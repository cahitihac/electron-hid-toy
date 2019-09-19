
"use strict";

const React         = require('react');
const ReactDOM      = require('react-dom');

const Row           = require('react-bootstrap').Row;
const Col           = require('react-bootstrap').Col;
const Grid          = require('react-bootstrap').Grid;
const Table         = require('react-bootstrap').Table;

const HID           = require('node-hid');

const devices = HID.devices();

const App = () => {

    const createDeviceRow = (dev, index) => {
        let deviceHandle = null;

        return (
            <tr key={index}>
                <td>{dev.vendorId}</td>
                <td>{dev.productId}</td>
                <td>{dev.product}</td>
                <td>{dev.manufacturer}</td>
                <td>{dev.serialNumber}</td>
                <td>{dev.path}</td>
                <td>
                    <button onClick={ () => {
                        deviceHandle = new HID.HID(dev.path);
                        deviceHandle.write([0x02, 0x04]);
                    } }>Open Device</button>
                </td>
                <td>
                    <button onClick={ () => {
                        deviceHandle.write([0x02, 0x00]);
                    } }>Close Device</button>
                </td>
            </tr>
        );
    };

    return (
        <Grid>
            <h1> Electron HID Toy! </h1>

            <Row>
                <Col xs={12}>
                    <h4> HID Devices connected </h4>
                    <Table bordered condensed hover >
                        <thead>
                            <tr>
                                <th>VendorId</th>
                                <th>ProductId</th>
                                <th>Product</th>
                                <th>Manufacturer</th>
                                <th>SerialNumber</th>
                                <th>Path</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map( createDeviceRow, this )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Grid>
    );
}

ReactDOM.render( <App />,  document.getElementById('example') );
