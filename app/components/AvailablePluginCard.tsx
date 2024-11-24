'use client';

import { useContext } from "react";
import PluginManager, { AVAILABLE_PLUGINS } from "../utils/pluginManager";
import { PostContext } from "../contexts/PostContext";

interface PluginDetails {
    name: string
}

export default function AvailablePluginCard() {
    return <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Available Plugins</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Select any plugin from the available list</p>

        {/* Iterate through each available plugin */}
        {AVAILABLE_PLUGINS.map((plugin, index) => <Plugin name={plugin} key={index} />)}
    </div>
}


function Plugin(props: PluginDetails) {

    const { setActivePlugins, activePlugins } = useContext(PostContext);

    // Install Hashtag plugin
    const updatePlugin = (e: any) => {
        // on check, install plugin
        if (e.target.checked) {
            PluginManager.installPlugin(AVAILABLE_PLUGINS[0]);
        } else {
            // on uncheck, uninstall plugin
            PluginManager.uninstallPlugin(AVAILABLE_PLUGINS[0]);
        }
        setActivePlugins(PluginManager.getAllActivePlugins());
    }

    return <label className="inline-flex items-center cursor-pointer">
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">{props.name}</span>
        <input type="checkbox" checked={activePlugins.length ? true : false} value="" className="sr-only peer" onChange={(e: any) => updatePlugin(e)} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
}