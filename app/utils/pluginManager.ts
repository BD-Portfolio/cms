export const AVAILABLE_PLUGINS: string[] = ["Hashtag Plugin"];

class PluginManager {

    static plugins: string[] = [];

    // Initialized plugin array
    constructor() {
        PluginManager.plugins = [];
    }

    // Method to install plugins
    static installPlugin(plugin: string) {
        PluginManager.plugins.push(plugin);
    }

    // Method to uninstall plugins
    static uninstallPlugin = (plugin: string) => {
        PluginManager.plugins = PluginManager.plugins.filter(p => p !== plugin);
    }

    // Method to render all plugins
    static getAllActivePlugins(): string[] {
        return PluginManager.plugins;
    }

}

export default PluginManager;
