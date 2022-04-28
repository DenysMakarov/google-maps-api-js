import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import "./google_map.css"

import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import {defaultTheme} from "./theme";

const address_1 = "Volodymyrska St, 40А, Kyiv, Ukraine, 01034"
const address_2 = "1600 Pennsylvania Avenue NW, Washington, DC"
const address_3 = "88 Canada Olympic Rd SW, Calgary, AB T3B 5R5, Canada"


const MapContainer = () => {
    const API_KEY = "AIzaSyBErxUWWTHAI6wc-dEt2jwJxxniYZSeYo8"
    const API_KEY_POSITIONSTACK = "feb144f2403096f6bdf7a2dc25392400"

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: API_KEY
    })

    const [pos, setPos] = useState(null);
    const [address, setAddress] = useState("1600 Pennsylvania Avenue NW, Washington, DC")

    useEffect(() => {
        getPositions()
    }, [])

    const getPositions = () => {
        fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY_POSITIONSTACK}&query=${address}`)
            .then(data => data.json())
            .then((addr) => {
                setPos(addr.data)
            })
    }

    const setPositions = () => {
        getPositions()
    }

    const handleChange = (e) => {
        e.preventDefault()
        setAddress(e.target.value)
    }


    return (
        <div>
            <input className="inputField" type="text" value={address} onChange={handleChange}/>
            <button onClick={setPositions} className="btn">FIND PLACE</button>
            {
                isLoaded
                    ?
                    <Map pos={pos}/>
                    : <h1>Loading...</h1>
            }
        </div>
    );
};


/*
* another component
* */

const Map = ({pos}) => {
    const mapRef = useRef(undefined)
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined
    }, [])

    // useEffect(() => {
    //     console.log(pos)
    // }, [pos])

    const defaultOptions = {
        mapId: "1fc8b246893e6652",
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        clickableIcons: false,
        keyboardShortcuts: false,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        // styles: defaultTheme
    }

    const additionOptions = {
        ...defaultOptions,
        strokeOpacity: 0.5,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
    };

    const closeOptions = {
        ...defaultOptions,
        zIndex: 3,
        fillOpacity: 0.05,
        strokeColor: "#8BC34A",
        fillColor: "#8BC34A",
    };
    const middleOptions = {
        ...defaultOptions,
        zIndex: 2,
        fillOpacity: 0.05,
        strokeColor: "#FBC02D",
        fillColor: "#FBC02D",
    };
    return (
        <div className="wrapper">

            {
                pos &&
                <GoogleMap
                    zoom={10}
                    center={{lat: pos[0].latitude, lng: pos[0].longitude}}
                    mapContainerClassName="map-container"
                    options={defaultOptions}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {
                        pos.map((map, idx) => (
                            <Marker key={idx} position={{lat: map.latitude, lng: map.longitude}}/>
                        ))
                    }
                </GoogleMap>
            }

        </div>

    )
}

export default MapContainer;