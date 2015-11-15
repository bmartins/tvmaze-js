/***********************************************************
Author: Bruno Martins <bscmartins@gmail.com

https://github.com/bmartins/tvmaze-js
***********************************************************/

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

	TVMaze.prototype.show_lookup = function(id,id_type,callback) {
		return request(this, 'lookup/shows?' + id_type +'=' + id, callback);
	};

	TVMaze.prototype.show_episode_list = function(show_id, show_specials,callback) {
		var specials = 0;
		if (show_specials) {
			specials = 1;
		}
		return request(this, 'shows/' + show_id + '/episodes?specials=' + specials, callback);
	};	

	TVMaze.prototype.show_cast = function(id,callback) {
		return request(this, 'shows/' + id + '/cast', callback);
	};	

	TVMaze.prototype.show_akas = function(id,callback) {
		return request(this, 'shows/' + id + '/akas', callback);
	};	

	TVMaze.prototype.show_index = function(page, callback) {
		return request(this, 'shows?page=' + page , callback);
	};	

	TVMaze.prototype.episode_by_number = function(id,season,number, callback) {
		return request(this, 'shows/' + id + '/episodebynumber?season=' + season + '&number=' + number, callback);
	};	

	TVMaze.prototype.episode_by_date = function(id,date, callback) {
		return request(this, 'shows/' + id + '/episodesbydate?date=' + date  , callback);
	};	

	TVMaze.prototype.schedule = function(country_code,date,  callback) {
		return request(this, 'schedule?country=' + country_code + '&date=' + date  , callback);
	};

	TVMaze.prototype.full_schedule = function(callback) {
		return request(this, 'schedule/full' , callback);
	};

	TVMaze.prototype.people_search = function(search, callback) {
		return request(this, 'search/people?q=' + search , callback);
	};

	TVMaze.prototype.people = function(id, callback) {
		return request(this, 'people/' + id , callback);
	};

	TVMaze.prototype.person_cast_credits = function(id, embed, callback) {
		var uri = 'people/' + id + '/castcredits';
		var embed_shows = 0;
		if (embed) {
			uri = uri + '?embed=show';
		}
		return request(this, uri, callback);
	};

	TVMaze.prototype.person_crew_credits = function(id, embed, callback) {
		var uri = 'people/' + id + '/crewcredits';
		var embed_shows = 0;
		if (embed) {
			uri = uri + '?embed=show';
		}
		return request(this, uri, callback);
	};

	TVMaze.prototype.updates = function(callback) {
		return request(this, 'updates/shows' , callback);
	};



      window.TVMaze = TVMaze;
  })(this);
