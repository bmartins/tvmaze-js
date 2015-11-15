(function(exports) {

	this.http_code = '';

	function TVMaze() {
		this.endpoint ='http://api.tvmaze.com';
	}
	function request(me, uri, callback) {
		var url = me.endpoint + '/' + uri;

		var xmlHttp = new XMLHttpRequest();
		if (callback != undefined) {
			 xmlHttp.onreadystatechange = function() { 
        		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					me.http_code = '200';
            		callback(JSON.parse(xmlHttp.responseText));
				}
        		if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
					me.http_code = xmlHttp.status;
					callback({});
				}
				
    		}
    		xmlHttp.open("GET", url, true); 
    		xmlHttp.send(null);
		} else {
    		xmlHttp.open( "GET", url, false ); 
    		xmlHttp.send( null );
    		return JSON.parse(xmlHttp.responseText);
		}
	};

	TVMaze.prototype.shows = function(show_id,callback) {
		return request(this, 'shows/' +  show_id, callback);
	};	
	TVMaze.prototype.show_search = function(search,callback) {
		return request(this, 'search/shows?q=' +  search, callback);
	};	
	TVMaze.prototype.show_single_search = function(search,callback) {
		return request(this, 'singlesearch/shows?q=' +  search, callback);
	};	

	TVMaze.prototype.show_episode_list = function(show_id, show_specials,callback) {
		var specials = 0;
		if (show_specials) {
			specials = 1;
		}
		return request(this, 'shows/' + show_id + '/episodes?specials=' + specials, callback);
	};	

/*
	show_lookup
	show_cast
	show_akas
	show_index
	episode_by_number
	episodes_by_date
	schedule
	full_schedule
	people_search
	people
	person_cast_credits
	person_crew_credits
	updates
*/


      window.TVMaze = TVMaze;
  })(this);
