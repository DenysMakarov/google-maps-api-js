import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import "./google_map.css"



import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import {defaultTheme} from "./theme";
import MyMarkerFirst from "./markers/MyMarkerFirst";
import MyMarkerSecond from "./markers/MyMarkerSecond";

const address_1 = "Volodymyrska St, 40А, Kyiv, Ukraine, 01034"
const address_2 = "1600 Pennsylvania Avenue NW, Washington, DC"
const address_3 = "88 Canada Olympic Rd SW, Calgary, AB T3B 5R5, Canada"
const libraries = ['places']


const MapContainer = () => {
    const API_KEY = "AIzaSyBErxUWWTHAI6wc-dEt2jwJxxniYZSeYo8"
    const API_KEY_POSITIONSTACK = "feb144f2403096f6bdf7a2dc25392400"

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: API_KEY,
        // libraries
    })

    const [pos, setPos] = useState(null);
    const [address, setAddress] = useState("1600 Pennsylvania Avenue NW, Washington, DC")

    const getPositions = () => {
        fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY_POSITIONSTACK}&query=${address}`)
            .then(data => data.json())
            .then((addr) => {
                console.log(addr)
                setPos(addr.data)
            })
    }

    useEffect(() => {
        getPositions()
    }, [])


    const handleChange = (e) => {
        e.preventDefault()
        setAddress(e.target.value)
    }

    const [zoom, setZoom] = useState(17)
    const [mockZoom, setMockZoom] = useState(10)
    const [valueOfMockZoom, setValueOfMockZoom] = useState(0.1)
    const handleChangeValueOfZoom = (e) => {
        e.preventDefault()
        setValueOfMockZoom(+e.target.value)
        console.log(mockZoom)
    }

    return (
        <div>
            <input className="inputField" type="text" value={address} onChange={handleChange}/>
            <button onClick={getPositions} className="btn-search">FIND PLACE</button>

            <div className="btn_block_left">
                <button onClick={() => {setZoom(zoom + 0.2)}} className="btn-zoom btn-plus">PLUS</button>
                <button onClick={() => {setZoom(zoom - 0.2)}} className="btn-zoom btn-plus">MINUS</button>
            </div>

            <div className=" btn_block_right">
                <label htmlFor="zoom">{valueOfMockZoom}</label>
                <input onChange={handleChangeValueOfZoom} className="btn-input" type="range" min={0.1} max={1} step={0.1} id="zoom" name="zoom"/>

                <button onClick={() => {setMockZoom(mockZoom + valueOfMockZoom)}} className="btn-zoom btn-plus">PLUS</button>
                <button onClick={() => {setMockZoom(mockZoom - valueOfMockZoom)}} className="btn-zoom btn-plus">MINUS</button>
            </div>
            {
                isLoaded
                    ? <Map pos={pos} zoom={zoom} mockZoom={mockZoom}/>
                    : <h1>Loading...</h1>
            }
        </div>
    );
};


/*
* another component
* */

const Map = ({pos, zoom, mockZoom}) => {
    const mapRef = useRef(undefined)
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])
    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined
    }, [])

    const defaultOptions = {
        // mapId: "1fc8b246893e6652",
        panControl: false,
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
        // styles: defaultTheme  // -> SNAZZY MAPS
    }

    const secondOptions = {
        mapId: "1fc8b246893e6652",
        panControl: false,
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
        // styles: defaultTheme  // -> SNAZZY MAPS
    }

    const mockPos = {
            lat: 51.082379,
            lng: -114.21525
    }

    return (
        <div className="wrapper">

            {
                pos && (
                    <>
                        <GoogleMap
                            zoom={zoom}
                            // center={{lat: pos[0].latitude, lng: pos[0].longitude}}
                            center={{lat: parseFloat(pos[0].latitude), lng: parseFloat(pos[0].longitude)}}
                            mapContainerClassName="map-container"
                            options={defaultOptions}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {/*{*/}
                            {/*    pos.map((map, idx) => (*/}
                            {/*        <MyMarkerFirst key={idx} position={{lat: map.latitude, lng: map.longitude}}/>*/}
                            {/*    ))*/}
                            {/*}*/}

                            <MyMarkerFirst
                                position={{lat: parseFloat(pos[0].latitude), lng: parseFloat(pos[0].longitude)}}
                            />
                        </GoogleMap>

                        <GoogleMap
                            zoom={mockZoom}
                            center={mockPos}
                            mapContainerClassName="map-container"
                            options={secondOptions}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {/*{*/}
                            {/*    pos.map((map, idx) => (*/}
                            {/*        <MyMarkerFirst key={idx} position={{lat: map.latitude, lng: map.longitude}}/>*/}
                            {/*    ))*/}
                            {/*}*/}

                            <MyMarkerSecond
                                position={mockPos}
                            />
                        </GoogleMap>

                    </>
                )
            }
        </div>

    )
}

export default MapContainer;