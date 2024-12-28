import React from 'react';
import { TrashIcon, PencilSquareIcon, XMarkIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline'

// handleAccept
const handleAccept = id => {
    console.log("Accept:", id);
}

// handleReject
const handleReject = id => {
    console.log("Reject:", id);
}

const Applicant = ({ jobHolder }) => {
    const { _id } = jobHolder;
    return (
        <tr>
            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div class="inline-flex items-center gap-x-3">
                    <div class="flex items-center gap-x-2">
                        <img class="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                        <div>
                            <h2 class="font-medium text-gray-800 dark:text-white ">Name</h2>
                        </div>
                    </div>
                </div>
            </td>


            <td class="ps-16 pe-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Design Director</td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">authurmelo@example.com</td>
            <td class="px-4 py-4 text-sm whitespace-nowrap">
                <div class="flex items-center gap-x-2">
                    <p class="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">Design</p>
                    <p class="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">Product</p>
                    <p class="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">Marketing</p>
                </div>
            </td>
            <td class="px-4 py-4 text-sm whitespace-nowrap">
                <div class="flex items-center gap-x-6">
                    {/* accept btn */}
                    <button className="group">
                        <CheckIcon className="size-5 text-green-400 transition-colors duration-200 dark:group-hover:text-green-600 dark:text-green-400 group-hover:text-green-600 focus:outline-none" onClick={() => handleAccept(_id)} />
                    </button>

                    {/* reject btn */}
                    <button className="group">
                        <XMarkIcon className="size-5 text-red-400 transition-colors duration-200 dark:group-hover:text-red-600 dark:text-red-400 group-hover:text-red-600 focus:outline-none" onClick={() => {
                            handleReject(_id)
                        }} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Applicant;