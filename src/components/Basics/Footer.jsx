import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='w-full border-t-[1px] border-neutral-200'>
            <div className='my-12 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 text-neutral-600 font-medium'>

                <ul className='w-full md:w-max text-center'>
                    <li>
                        <Link
                            to="/"
                            className='hover:text-neutral-900'>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className='hover:text-neutral-900'>
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className='hover:text-neutral-900'>
                            Contact Us
                        </Link>
                    </li>
                </ul>

                <ul className='w-full md:w-max text-center'>
                    <li>
                        <Link
                            to="/"
                            className='hover:text-neutral-900'>
                            Facebook
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className='hover:text-neutral-900'>
                            Instagram
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className='hover:text-neutral-900'>
                            Twitter
                        </Link>
                    </li>
                </ul>

            </div>
        </footer>
    )
}