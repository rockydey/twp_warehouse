import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='container mx-auto px-20 bg-[#0C293B]'>
            <div class="navbar">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-white bg-[#0C293B] lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#0C293B] rounded-box w-52">
                            <li><Link className='text-lg font-normal text-white' to='/home'>Home</Link></li>
                            <li><Link className='text-lg font-normal text-white' to='/inventories'>Inventories</Link></li>
                            <li><Link className='text-lg font-normal text-white' to='/dashboard'>Dashboard</Link></li>
                            <li><Link className='text-lg font-normal text-white' to='/login'>Login</Link></li>
                        </ul>
                    </div>
                    <a href='/' class="normal-case font-bold text-4xl text-white">TWP</a>
                </div>
                <div class="navbar-end hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        <li><Link className='text-lg font-normal hover:bg-[#0C294F] text-white' to='/home'>Home</Link></li>
                        <li><Link className='text-lg font-normal hover:bg-[#0C294F] text-white' to='/inventories'>Inventories</Link></li>
                        <li><Link className='text-lg font-normal hover:bg-[#0C294F] text-white' to='/dashboard'>Dashboard</Link></li>
                        <li><Link className='text-lg font-normal hover:bg-[#0C294F] text-white' to='/login'>Login</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;