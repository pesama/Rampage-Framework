/**
 * Interface for the Youtube Player API. It can load videos and manage all the playing options.
 * It works just like the Youtube Player API. Same function names, except the loadVideo method (commented below).
 * @author Pelayo Sanchez Margareto
 * @date Feb 10th, 2011
 * @version 1.0
 * For more info about the working of Youtube's player API
 * @see http://code.google.com/intl/es-ES/apis/youtube/js_api_reference.html
 * 
 * @uses Rampage.apis.google.youtube.SWFObject
 */

Rampage.apis.google.youtube.Player = {
	params : {allowScriptAccess : "always"}, //The params for the video loading
  	atts : {id : 'Rampage_apis_google_youtube_Player_video'}, //The id the video will have
	video : null, //The video HTMLObject
        _ready : false, //isReady flag
        _playOnReady : false, //playOnReady flag

        _init : function() {
            this.video.addEventListener('onStateChange', 'Rampage.apis.google.youtube.Player.onStateChange');
            this.video.addEventListener('onPlaybackQualityChange', 'Rampage.apis.google.youtube.Player.onPlaybackQualityChange');
            this.video.addEventListener('onError', 'Rampage.apis.google.youtube.Player.onError');
            this._ready = true;
            if(this._playOnReady) this.playVideo();
	},

        /**
         * This function returns true if video player is ready to play videos.
         * @return boolean _ready the isReady flag
         */
        isReady : function() {
            return this._ready;
        },

        /**
         * This function will load a Chromeless AS3 Yt player using Google's SWFObject technology
         * @param width The width of the player
         * @param height The height of the player
         */
        loadChromelessPlayer : function(width, height) {
            this._playOnReady = false;
            Rampage.apis.google.youtube.SWFObject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3", this.atts.id, width, height, "8", null, null, this.params, this.atts);
	},

        /**
         * This function will load a video using Google's SWFObject technology
         * @param id The id of the video
         * @param width The width of the video
         * @param height The height of the video
         * 
         * @see http://code.google.com/p/swfobject/
         */
	loadVideo : function(id, width, height) {
            this._playOnReady = true;
            Rampage.apis.google.youtube.SWFObject.embedSWF("http://www.youtube.com/v/"+id+"?enablejsapi=1", this.atts.id, width, height, "8", null, null, this.params, this.atts);
	},

        /**
         * This is an event function called by the video element when it's ready to work
         * It initiates the playing process.
         */
	onYouTubePlayerReady : function() {
            this.video = Rampage.id(this.atts.id);
            this._init();
	},
	
	/*Listeners*/
	onStateChange : function(state) {
            /*implement here the listener*/
	},
	
	onPlaybackQualityChange : function(quality) {
            /*Implement here the listener*/
	},
	
	onError : function(code) {
            alert('Error '+code);
            /*Implement here the listener*/
	},
	
	/*API Methods*/
        cueVideoById : function(videoId, startSeconds, suggestedQuality) {
            this.video.cueVideoById(videoId, startSeconds, suggestedQuality);
        },

        loadVideoById : function(videoId, startSeconds, suggestedQuality) {
            this.video.loadVideoById(videoId, startSeconds, suggestedQuality);
        },

        cueVideoByUrl : function(mediaContentUrl, startSeconds) {
            this.video.cueVideoByUrl(mediaContentUrl, startSeconds);
        },

        loadVideoByUrl : function(mediaContentUrl, startSeconds) {
            this.video.loadVideoByUrl(mediaContentUrl, startSeconds);
        },

	playVideo : function() {
            this.video.playVideo();
	},

	pauseVideo : function() {
            this.video.pauseVideo();
	},

	stopVideo : function() {
            this.video.stopVideo();
	},
	
	clearVideo : function() {
            this.video.clearVideo();
	},
	
	mute : function() {
            this.video.mute();
	},
	
	unMute : function() {
            this.video.unMute();
	},
	
	isMuted : function() {
            return this.video.isMuted();
	},
	
	setVolume : function(volume) {
            this.video.setVolume(volume);
	},
	
	getVolume : function() {
            return this.video.getVolume();
	},
	
        setSize : function(width, height) {
            this.video.setSize(width, height);
	},
	
	getVideoBytesLoaded : function() {
            return this.video.getVideoBytesLoaded();
	},
	
        getVideoBytesTotal : function() {
            return this.video.getVideoBytesTotal();
	},
	
	getVideoStartBytes : function() {
            return this.video.getVideoStartBytes();
	},
	
	getPlayerState : function() {
            return this.video.getPlayerState();
	},
	
        getCurrentTime : function() {
            return this.video.getCurrentTime();
	},
	
	getPlaybackQuality : function() {
            return this.video.getPlaybackQuality();
	},
	
	setPlaybackQuality : function(suggestedQuality) {
            /*
             * Qualities can be:
             * small < 640 x 360
             * medium >: 640 x 360
             * large >: 854 x 480
             * hd720 >: 1280 x 720
             * default : Imagine...
             */
            this.video.setPlaybackQuality(suggestedQuality);
	},
	
	getAvailableQualityLevels : function() {
            return this.video.getAvailableQualityLevels();
	},
	
	getDuration : function() {
            return this.video.getDuration();
	},
	
	getVideoUrl : function() {
            return this.video.getVideoUrl();
	},
	
	getVideoEmbedCode : function() {
            return this.video.getVideoEmbedCode();
	}
}

var onYouTubePlayerReady = function(id) {
    Rampage.apis.google.youtube.Player.onYouTubePlayerReady();
}

Rampage.ready();