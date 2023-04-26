import React from 'react'

export default function Footer() {
    return (
        <footer className='w-full border-t-[1px] border-neutral-200'>
            <div className='my-12 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 text-neutral-600 font-medium'>

                <ul className='w-full md:w-max text-center'>
                    <li>
                        <a className='hover:text-neutral-900' href="/">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a className='hover:text-neutral-900' href="/">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a className='hover:text-neutral-900' href="/">
                            Contact Us
                        </a>
                    </li>
                </ul>

                <ul className='w-full md:w-max text-center'>
                    <li>
                        <a className='hover:text-neutral-900' href="/">
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a className='hover:text-neutral-900' href="/">
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a className='hover:text-neutral-900' href="/">
                            Twitter
                        </a>
                    </li>
                </ul>

            </div>
        </footer>
    )
}