import React from 'react';
import {Circle, Marker, GoogleMap} from "@react-google-maps/api";


const additionOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};
const middleOptions = {
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};

const MyMarkerFirst = ({position}) => {

    return (
        <>
            <Marker
                onClick={() => {console.log("Hello")}}
                position={position}
                clickable={true}
                icon={{
                    url: "/b.png",
                    scaledSize: new window.google.maps.Size(50, 50),
                    origin: new window.google.maps.Point(0,0), // -> origin The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image (0, 0)
                    // anchor: new window.google.maps.Point(50, 50) // -> anchor  The position at which to anchor an image in correspondence to the location of the marker on the map. By default, the anchor is located along the center point of the bottom of the image.
            }}

                // icon={{
                //     path:
                //         "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                //     fillColor: "yellow",
                //     fillOpacity: 0.9,
                //     scale: 2,
                //     strokeColor: "gold",
                //     strokeWeight: 2,
                // }}

                shape={{ // clickable position of marker
                    coords: [1, 1, 1, 20, 18, 20, 18, 1],
                    type: "poly",
                }}
                // zIndex={1000}
                visible={true}
                title={"Hello Word"}
                opacity={0.9}
                // label={{text: "Hello World", className: "text"}}
            />

        </>

    )
};

export default MyMarkerFirst;