import React, { useState } from "react";
import { Icon } from '../../Icons';
import Items from './Items';
import { Link, useLocation } from "react-router-dom";

const Home = (props) => {

    const menuLocation = useLocation();

    const [isListOn, setIsListOn] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const menuItem = [
        {
            id: '1',
            name: 'Bloklar',
            url: '/bloklar',
        },
        {
            id: '2',
            name: 'Derslikler',
            url: '/derslikler',
        },
        {
            id: '3',
            name: 'Yeme - İçme',
            url: '/yeme-icme',
        },
        {
            id: '4',
            name: 'Details',
            url: '/details',
        },
        {
            id: '5',
            name: 'Anasayfa',
            url: '/',
        }
    ];

    const coordinates = props.coordinates;

    return (
        <>
            <div className="relative container mx-auto px-5 pt-10 flex items-center justify-between">
                <div className="hidden md:block ekoNav-navigation">
                    <ul className="flex items-center justify-start gap-10 text-ekonavLink/50 font-bold">
                        {
                            menuItem.map( (menu) => (
                                <li className={menuLocation.pathname === menu.url ? 'active' : ''} key={menu.id}>
                                    <Link to={menu.url} >{menu.name}</Link>
                                </li>

                            ) )
                        }
                    </ul>
                </div>

                <div className="md:hidden flex items-center">
                    <button className="outline-none cursor-pointer transition-all" onClick={() => setMobileMenu(!mobileMenu)}>
                        { mobileMenu ?
                            <Icon name="menuActive" className="text-ekonavGray" size={30} />
                            :
                            <Icon name="menu" className="text-ekonavGray" size={30} />
                        }
                    </button>
                </div>
                <div className={mobileMenu ? '' : 'hidden'}>
                    <ul className="absolute bg-white pt-6 pr-6 pl-6 pb-11 left-0 top-24 flex gap-10 text-sm w-full text-ekonavLink/50 font-bold flex-wrap transition-all">
                        {
                            menuItem.map( (menu) => (
                                <li className={menuLocation.pathname === menu.url ? 'active relative' : 'relative'} key={menu.id}>
                                    <Link to={menu.url} >{menu.name}</Link>
                                </li>
                            ) )
                        }
                        <span className="absolute bottom-[5.2rem] left-5 w-0 h-0 border-r-[15px] border-l-[15px] border-l-transparent border-r-transparent border-t-0 border-b-[20px] border-b-white"></span>
                    </ul>
                </div>

                <form className="form-check flex items-center justify-center">
                    <label for="gridToList" className="flex items-center cursor-pointer relative">
                        <input type="checkbox" id="gridToList" className="sr-only" onChange={(e) => { setIsListOn(e.target.checked) }} />
                        <div className="gridToList bg-[#F4F2F8] border border-[#DCDBE0] h-10 w-20 rounded-lg flex items-center justify-around">
                            <Icon name='grid' size={22} className="gridIcon" />
                            <Icon name='list' size={22} className="listIcon" />
                        </div>
                    </label>
                </form>
            </div>
            <Items coordinates={coordinates} isListOn={isListOn} />
        </>
    )
}

export default Home
