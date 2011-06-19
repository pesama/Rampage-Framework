/**
 * This function generates a picture gallery for the website
 * It can be called by Rampage.html tech or manually by Rampage.core
 * @author Pelayo Sanchez Margareto
 * @date Feb 24th, 2011
 * @version 1.0
 *
 * @see Rampage.html.RampageProcessor
 *
 * @param id The id of the HTMLGallery Element
 * @param url the URL to obtain the JSON gallery data in
 */

Rampage.gui.Gallery = function(id, url) {
    this._handler = Rampage.id(id);
    this._id = id;
    this._url = url;
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;

    this._nextLeftStep = 0;
    this._nextRightStep = 0;

    this._mainPic = null;
    this._miniPics = new Array();
    this._leftArrow = null;
    this._rightArrow = null;

    /**
     * This function initializes the application, converting all the given hrefs into HTML images and adding them into the store
     */
    this._init = function() {
        var req = Rampage.sync(this._url);
        var pictures = eval(req);

        var mpContainer = document.createElement('div');
            mpContainer.setAttribute('class', 'Rampage_gui_Gallery_mainPicContainer');
        this._mainPic = mpContainer;

        var miniContainer = document.createElement('div');
            miniContainer.setAttribute('class', 'Rampage_gui_Gallery_miniPicsContainer');

        this._handler.appendChild(mpContainer);
        this._handler.appendChild(miniContainer);

        this._leftArrow = document.createElement('div');
        this._leftArrow.setAttribute('class', 'Rampage_gui_Gallery_leftArrow');
        this._leftArrow.style.background = '#282627 url(\''+Rampage.get('root')+'/images/gallery_left_arrow_background.png\') top left no-repeat';

        this._rightArrow = document.createElement('div');
        this._rightArrow.setAttribute('class', 'Rampage_gui_Gallery_rightArrow');
        this._rightArrow.style.background = '#282627 url(\''+Rampage.get('root')+'/images/gallery_right_arrow_background.png\') top left no-repeat';


        this._leftArrow.setAttribute('onclick', 'Rampage.gui.gallery.Events.getTarget().previousPic()');
        this._rightArrow.setAttribute('onclick', 'Rampage.gui.gallery.Events.getTarget().nextPic()');

        var miniPics = document.createElement('ul');
            miniPics.setAttribute('id', this._id+'_ul');
            miniPics.setAttribute('class', 'Rampage_gui_Gallery_miniPics');

        miniContainer.appendChild(miniPics);

        for(var name in pictures) {
            var li = document.createElement('li');
                //li.setAttribute('onclick', 'Rampage.gui.gallery.Events.getTarget().loadPic(\''+pictures[name].href+'\')');

            var a = document.createElement('a');
                a.setAttribute('href', 'javascript:Rampage.gui.gallery.Events.getTarget().loadPic(\''+pictures[name].href+'\')');

            var img = document.createElement('img');
                img.setAttribute('src', pictures[name].thumb);

            miniPics.appendChild(li);
            li.appendChild(a);
            a.appendChild(img);
            
            var w = img.offsetWidth;
            var h = img.offsetHeight;
            var r = w / h;
            h = 100;
            w = h * r;

            img.setAttribute('style', 'width:'+w+'px;height:'+h+'px;');

            //alert(w+', '+h)

            this._miniPics.push(li);
        }

        
        
        miniContainer.appendChild(this._leftArrow);
        miniContainer.appendChild(this._rightArrow);

        //We allocate last item before first to allow user go to right
        var last = miniPics.lastChild;
        var first = miniPics.firstChild;
        miniPics.removeChild(last);
        miniPics.insertBefore(last, first);
        miniPics.style.left = (last.offsetWidth * -1)+'px';

        this.loadPic(pictures[0].href);
        Rampage.gui.gallery.Events.setTarget(this);
    }

    this.loadPic = function(href) {
        var a = document.createElement('a');
            a.setAttribute('href', 'javascript:Rampage.util.Gui.show(\''+href+'\', \'image\')');
        var img = document.createElement('img');
            img.setAttribute('src', href);
            img.setAttribute('height', '300');
        this._mainPic.innerHTML = '';
        this._mainPic.appendChild(a);
        a.appendChild(img);
    }

    this.nextPic = function() {
        this.slide('right');
    }
    
    this.previousPic = function() {
        this.slide('left');
    }

    this.slide = function(direction) {
        if(direction == 'left') {
            Rampage.gui.Effects.slide(Rampage.id(this._id+'_ul'), 100, {left : Rampage.id(this._id+'_ul').firstChild.offsetWidth*-1}, function(id) {
                var elem = Rampage.id(id);
                var first = elem.firstChild;
                //var last = elem.lastChild;
                elem.removeChild(first);
                elem.appendChild(first);
                elem.style.left = (first.offsetWidth*-1)+'px';
            });
        }
        else {
            Rampage.gui.Effects.slide(Rampage.id(this._id+'_ul'), 100, {left : Rampage.id(this._id+'_ul').firstChild.offsetWidth}, function(id) {
                var elem = Rampage.id(id);
                var first = elem.firstChild;
                var last = elem.lastChild;
                elem.removeChild(last);
                elem.insertBefore(last, first);
                elem.style.left = (first.offsetWidth*-1)+'px';
            });
        }
    }

    this._init();
}

Rampage.ready();