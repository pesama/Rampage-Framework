/**
 * Main class of Rampage framework. It contains the AutoLoad methods and defines the namespace Rampage (which will be used in the whole framework.
 * This is the only script that will be loaded manually in the HTML or PHP file, and it will load all the needed scripts automatically.
 * @author Pelayo Sanchez Margareto
 * @date Feb 10th, 2011
 * @version 1.0
 *
 * @uses Rampage.structures.Queue
 */

window.onload = function() {
    Rampage.init();
}

/**
 * Rampage main Object. It's the only global variable used in the framework.
 * Other objects will be appended here.
 */
var Rampage = {
 /*
 * #########################################################################################################################
 * #                        PLEASE READ CAREFULLY THE DOCUMENTATION BEFORE CHANGING ANYTHING HERE.                         #
 * #                                OTHERWISE YOU'LL PROBABLY MAKE FRAMEWORK CRASH DOWN                                    #
 * #########################################################################################################################
 */

    _root : '', //The root of the framework

    /**
     * Put in _apis every api code needed to work with each api.
     */
    _apis : {
        google : {
            youtube : '',
            maps : ''
        }
    },

    /**
     * Main options for diagrams
     */
    _diagramBackground : '#FFFFFF',
    _diagramReferenceLinesAlpha : 0.5,
    _diagramReferenceLinesBackground : '#222222',
    _diagramReferenceLinesSpacing : 10,
    _diagramReferenceLinesWidth : 1,

    /**
     * This variable defines the aspect Ratio for the Gallery (4:3, 16:9, etc)
     */
    _galleryAspectRatio : {width : 4, height : 3},
    _galleryMainPicOffsetHzMargin : 0.1,
    _galleryMainPicOffsetTopMargin : 0.03,
    _galleryCenterSpacing : 20,
    _galleryMiniPicContainerOffsetHzMargin : 10,

     /**
     * The HTMLElement's id that will contain all the gui elements of Rampage This div will be over the others.
     */
    _guiContainer : 'Rampage_canvas',

    /**
     * Options for line diagrams
     */
    _lineDiagramFillAlpha : 0.5,
    _lineDiagramFillStyle : 'rgb(80, 80, 80)',
    _lineDiagramLineWidth : 4,
    _lineDiagramStrokeAlpha : 1.0,
    _lineDiagramStrokeStyle : 'rgb(50, 50, 50)',

    /**
     * The lookAnd feel for the Rampage graphic libraries.
     * This access to 'Rampage.lib/styles/'+_lookAndFeel+'.css'
     * You can download more look and files available, or create your own.
     */
    _lookAndFeel : 'default',

    /**
     * _maxWebsiteIndex indicates the maximum allowed Z-index for items into website. Over there it will be modal elements to work with screen locked
     */
    _maxWebsiteIndex : 99,

    /*
     * #########################################################################################################################
     * #                                        DON'T TOUCH ANYTHING BELOW THIS POINT.                                         #
     * #                                        THIS PART IS FIX FOR ALL APPLICATIONS                                          #
     * #########################################################################################################################
     */

    _includeCallback : null, //The callback for the ready method when including files.
    _loading : null, //This is the Queue of the loading scripts. Initialized on Rampage.start() method.
    _isCurrentlyLoading : false, //True if it's loading. False otherwise.

    _ready : false,

    /**
     * Private Method
     * _addToQueue will add the given path to the _loading queue.
     * @param path The path to load.
     */
    _addToQueue : function(path) {
        this._loading.push(path);
    },

    /**
     * Private Method
     * _getHead will give a link to the head of the HTML or PHP file.
     * @return HTMLObject the HEAD of the page
     */
    _getHead : function() {
        return document.getElementsByTagName('head')[0];
    },

    /**
     * Private Method
     * _getNextLoad will give a path to load if stack's not empty, and null otherwise
     * @return String The next path to load
     */
    _getNextLoad : function() {
        if(!this._loading.isEmpty()) return this._loading.pop();
        return null;
    },

    /**
     * Private Method
     * _getScriptElement creates a Script tag using DOM
     * It receives a Path to load given as Rampage.package.Class. It will convert it to Rampage/Package/Class where Rampage is the http adress of the root of the project
     *
     * @param path The path of the file to load
     * @return HTMLObject the script tag.
     */
    _getScriptElement : function(path) {
        var file;
        if(path.indexOf('http://') != 0) {
            var paths = path.split('.');
            paths[0] = this._root;
            file = paths.join('/');
            file += '.js';
        }
        else {
            this._isCurrentlyLoading = false;
            file = path;
        }
        var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('id', path);
            script.setAttribute('src', file);

        return script;
    },

    /**
     * Private Method
     * _init will be called when all the items are loaded, and will start the application.
     */
    _init : function() {
        if(this.core) this.core.init();
        this._startHTMLCore();
        if(this._isIncluded('Rampage.html.Store')) {
            while(!this.html.Store.executionQueue.isEmpty()) {
                var item = this.html.Store.executionQueue.pop();
                item.init();
            }
        }
    },

    /**
     * This function returns true if the file with the given path is already loaded. Otherwise, false.
     * @param path The path of the file
     * @return boolean
     */
    _isIncluded : function(path) {
        return this.id(path) != null;
    },

    /**
     * This method is called when the main include is loaded (Queue).
     * It will create the _loading queue and start the initialization process of the application.
     */
    _start : function() {
        this._includeCallback = this._init;
        this._isCurrentlyLoading = false;
        this._loading = new Rampage.structures.Queue();

        //Communications
        this.include('Rampage.communications.Ajax');

        //Gui Utilities
        this.include('Rampage.util.Gui');

        //Structures
        this.include('Rampage.structures.List');

        //GUI
        this.include('Rampage.gui.apps.AdminApp');
        this.include('Rampage.gui.apps.adminapp.Child');
        this.include('Rampage.gui.apps.adminapp.Events');
        this.include('Rampage.gui.Buttons');
        //this.include('Rampage.gui.canvas.Canvas');
        //this.include('Rampage.gui.canvas.StatisticDiagrams');
        this.include('Rampage.gui.Gallery');
        this.include('Rampage.gui.gallery.Events');
        this.include('Rampage.gui.Effects');
        this.include('Rampage.gui.Screen');
        this.include('Rampage.gui.panels.Frame');
        this.include('Rampage.gui.panels.AdminAppPane');
		this.include('Rampage.gui.panels.InputPane');

        //Forms
        //this.include('Rampage.forms.Validator');

        //APIs
        
        this.include('Rampage.apis.google.Maps');
        this.include('Rampage.apis.google.maps.Map');
        
        this.include('Rampage.apis.google.youtube.SWFObject');
        this.include('Rampage.apis.google.youtube.Player');

        //HTML
        this.include('Rampage.html.RampageProcessor');
        this.include('Rampage.html.CanvasProcessor');
        this.include('Rampage.html.Store');
        
        this.include('Rampage.structures.ListIterator');
        
        //Add here other includes
        //Styles
        Rampage.appendStylesheet('APP_ROOT/styles/Rampage_gui_Gallery');
        Rampage.appendStylesheet('APP_ROOT/styles/Rampage_gui_panels_Frame');
    },

    /**
     * This function starts the Rampage html parser and converter.
     * @see Rampage.html.RampageProcessor
     * @see Rampage.html.CanvasProcessor
     */
    _startHTMLCore : function() {
        this.html.RampageProcessor.init();
        //this.html.CanvasProcessor.init();
    },

    /**
     * Private Method
     * _startLoadingScript will activate the flag _isCurrentlyLoading, and then it will append to the page a new Script tag.
     * @param path the path to load
     */
    _startLoadingScript : function(path) {
        this._isCurrentlyLoading = true;
        this._getHead().appendChild(this._getScriptElement(path));
    },

    /**
     * This function will return ALL the children of an element (recursively).
     */
    all : function(root, list) {
        if(!list) list = new Rampage.structures.List();
        var elements = root.childNodes;
        list.add(root);
        for(var i=0;i<elements.length;i++) {
            Rampage.all(elements[i], list);
        }
        return list;
    },

    /**
     * This function includes a CSS file from Rampage into the system
     * @param path the path to load the script
     */
    appendStylesheet : function(path) {
        var style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('type', 'text/css');
            style.setAttribute('href', (path.indexOf('APP_ROOT') == 0 ? this._root + path.substring(8) : path) + '.css');
        this._getHead().appendChild(style);
    },

    /**
     * This method will return the HTMLObject identified with the given name
     * @param name The name of the element
     * @return HTMLObject the object specified
     */
    byName : function(name) {
        return document.getElementsByName(name)[0];
    },

    /**
     * This method will return the HTMLObjects identified with the given tag
     * @param tag The tag of the elements
     * @return Array<HTMLObject> the objects specified
     */
    byTag : function(tag) {
        return document.getElementsByTagName(tag);
    },

    /**
     * This function is the link with the config file and the lib.
     * To get a _config resource, you need to call it by Rampage.config.get()
     * @param item The name of the item
     * @return Object Rampage.config._item
     */
    get : function(item) {
        return this['_'+item];
    },

    /**
     * This function will return a resource identified with the given id from the Rampage.html.Store
     * @param id The id of the element
     * @return RampageElement.handler The handler of the needed resource.
     */
    getResource : function(id) {
        return this.html.Store.get(id);
    },

    /**
     * This method will return the HTMLObject identified with the given id.
     * @param id The id of the element
     * @return HTMLObject The object specified
     */
    id : function(id) {
		if(id) return document.getElementById(id);
		else return null;
    },

    /**
     * This method will start the loading process
     * @param path The path to load
     */
    include : function(path) {
        if(this._isIncluded(path)) return;
        if(!this._isCurrentlyLoading || !this._ready) this._startLoadingScript(path);
        else this._addToQueue(path);
    },

    /**
     * This function inits the application, setting up all the Rampage callers and including all the needed files
     */
    init : function() {
        if(!this._root) {
            var root = '/Rampage.js';
            var scripts = this.byTag('script');
            for(var i=0;i<scripts.length;i++) {
                if(scripts[i].src == root) {
                    this._root = '/lib';
                    break;
                }
                else if(scripts[i].src.indexOf(root) != -1) {
                    this._root = scripts[i].src.substring(0, scripts[i].src.indexOf(root))+ '/lib';
                    break;
                }
            }
        }
        this.include('Rampage.structures.Queue');
    },

    /**
     * This method will be called when a script has finally been loaded into the page, and it's ready to use.
     * If there are more includes that need to be loaded, it will init this process.
     * Otherwise it will initialize the application by calling _init()
     */
    ready : function() {
        if(!this._ready) {
            if(this._isIncluded('Rampage.structures.Queue')) {
                this._ready = true;
                this._start();
                return;
            }
        }
        if(this._isCurrentlyLoading) {
            this._isCurrentlyLoading = false;
            var next = this._getNextLoad();
            if(next) this.include(next);
            else this._includeCallback();
        }
    },

    /**
     * This function sets up the include Callback for the include
     * @param func A function to set the callback
     */
    setCallback : function(func) {
        this._includeCallback = func;
    },
    
    /**
     * This function will initialize the application, by loading the Queue.
     */

    /*
     * Below this line Rampage will initialize all the packages, to be ready when a class is loaded. 
     */

    
    apis : { //apis package
        google : { //google's APIs package
            maps : {}, //maps apis package
            youtube : {} //Youtube's APIs package
        }
    },
    communications : {}, //Rampage.communications package
    forms : {}, //Rampage.forms package
    gui : { //Rampage.gui.package
        apps : {//apps package
            adminapp : {}
        },
        canvas : {}, //canvas packages
        gallery : {}, //gallery package
        panels : {} //Rampage panels package
    },
    html : {}, //Rampage.html package
    structures : {}, //Data structures package
    util : {} //Rampage.util package
};