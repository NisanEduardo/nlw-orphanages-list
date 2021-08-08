import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import leaflet from 'leaflet'

import mapMarketing from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import  '../styles/components/sidebar.css'
import 'leaflet/dist/leaflet.css'
import api from '../services/api'
import Orphanage from './Orphanage'

const mapIcon = leaflet.icon({
    iconUrl: mapMarketing,
    iconSize: [ 50, 58],
    iconAnchor: [ 25, 58 ],
    popupAnchor: [ 170, 5 ]
})

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

function OrphanagesMap() {

    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

    useEffect( () => {

        api.get( '/orphanages' ).then( response => {

            setOrphanages( response.data )

        })

    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={ mapMarketing } alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>

                    <p>Muitas crianças estão esperando a sua visita :</p>  
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map
                center={ [ -22.9743212, -43.2290541 ] }
                zoom= {15}
                style={ { width: '100%', height: '100%' } }  
            >
            
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
                orphanages.map( orphanage => {

                    return(
                        <Marker
                            icon={ mapIcon }
                            position={ [ orphanage.latitude, orphanage.longitude ] }
                            key={ orphanage.id }
                        >
                            <Popup closeButton={ false } minWidth={ 240 } maxWidth={ 240 } className="map-popup" >
                                { orphanage.name }
        
                                <Link to={ `/orphanages/${ orphanage.id }` }>
                                    <FiArrowRight size={ 20 } color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )

                })
            }

            </Map>

            <Link to="/orphanages/create" className="create-orphanage" >
                <FiPlus size={ 32 } color="#fff" />
            </Link>

        </div>
    )
}

export default OrphanagesMap