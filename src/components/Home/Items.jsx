import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { Icon } from '../../Icons'
import { request } from 'graphql-request';
import Details from '../Details';

export default function Items( props ) {

    // const [ymaps, setYmaps] = useState(null);
    // const mapRef = useRef(null);
    // const coordinates = props.coordinates;

    // const mapState = { center: [coordinates.latitude, coordinates.longitude], zoom: 14 };

    const [blocks, setBlocks] = useState(null);

    useEffect(() => {
        const fetchBlocks = async () => {
            const { blocks } = await request(
                process.env.REACT_APP_GRAPH_CMS_API,
                `
                {
                    blocks {
                        id
                        blockName
                        coordinates
                        slug
                        createdAt
                        totalClassNum
                        updatedAt
                        blockImage {
                          url
                        }
                    }
                }
                `
            );

            setBlocks(blocks);
        };
    
        fetchBlocks();
    }, []);

    let navigate = useNavigate();

    /*
    const getRoutes = () => {
        console.log(
          ymaps.coordSystem.geo.getDistance(
            [coordinates.latitude, coordinates.longitude],
            [38.390434, 27.044572]
          )
        );
        //mapRef.current.geoObjects.each((item) => console.log(item));
      };
    */

    return (
        <>
            {!blocks ? 'Loading...' : 
            <div className="container mx-auto px-5 py-12">
            { props.isListOn ?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {blocks.map( ({ id, blockName, slug, blockImage, totalClassNum }) => 
                    <Link to="blocks" >
                        <div key={id} className="cursor-pointer hover:shadow-2xl item flex justify-between flex-row bg-white rounded-xl shadow-lg">
                            <img className="overflow-hidden flex-1 w-56 max-w-sm object-cover rounded-l-xl" src={blockImage.url} alt="" />
                            <div className="details flex flex-1 flex-col justify-center items-center p-3 md:p-5 lg:p-9 gap-6">
                                <div className="topInfo flex md:text-2xl text-lg">
                                    <h1 className="title font-bold">{blockName}</h1>
                                </div>
                                <div className="bottomInfo flex gap-10 md:gap-14 lg:gap-20 flex-1 items-center justify-between text-sm md:text-base">
                                    <div className="classNum flex items-center justify-center gap-2">
                                        <Icon name="door" size={18} className="fill-ekonavGray/75"/>
                                        {totalClassNum}
                                    </div>
                                    <div className="viewNum flex items-center justify-center gap-2">
                                        {totalClassNum}
                                        <Icon name="view" size={18} className="fill-ekonavGray/75"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
                </div>
            :
                <div className="itemGrid">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {blocks.map( ({ id, blockName, slug, blockImage, totalClassNum }) => 
                            <Link
                                to={{
                                    pathname: `blocks/${slug}`,
                                    query: {thing: 'asdf', another1: 'stuff'}
                                }}
                            >
                                <div key={id} className="cursor-pointer hover:shadow-2xl item flex justify-center flex-col bg-white rounded-xl shadow-lg">
                                    <img className="overflow-hidden w-full object-cover rounded-t-xl" src={blockImage.url} alt="" />
                                    <div className="details flex flex-col justify-center items-center p-6 md:p-5 lg:p-9 gap-6">
                                        <div className="topInfo flex flex-1 text-xl md:text-xl lg:text-2xl">
                                            <div className="title font-bold">{blockName}</div>
                                        </div>
                                        <div className="bottomInfo flex gap-16  md:text-md lg:text-lg">
                                            <div className="classNum flex items-center justify-center gap-2">
                                                <Icon name="door" size={20} className="fill-ekonavGray/75"/>
                                                {totalClassNum}
                                            </div>
                                            <div className="viewNum flex items-center justify-center gap-2">
                                                {totalClassNum}
                                                <Icon name="view" size={20} className="fill-ekonavGray/75"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                        
                    </div>
                </div>
            }
            </div>
            }
        </>
    )
}
