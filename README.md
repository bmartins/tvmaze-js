# README

Simple Javascript interface for TVMaze API http://www.tvmaze.com/api

### Usage
```
<script src="tvmaze.js"></script>
<script type="text/javascript">
    var tvmaze = new TVMaze();
    tvmaze.shows(4, function(show) { console.log(show.name) } );
</script>
```

#### Available functions
```javascript
shows(show_id, callback)
show_search(keyword, callback)
show_single_search(keyword, callback)
show_lookup(id, id_type, callback) // id_type must be 'tvrage' or 'thetvdb' or 'imdb'
show_seasons(id)
show_episode_list(id, show_specials, callback) //show_specials is a boolean
show_cast(id, callback)
show_akas(id, callback)
show_index(page, callback) // pagination starts at 0
episode_by_number(id, season, number, callback)
episode_by_date(id, date, callback)
schedule(country_code, date, callback)
full_schedule(callback)
people_search(keyword, callback)
people(id, callback)
person_cast_credits(id, embed, callback) // embed is a boolean
person_crew_credits(id, embed, callback) // embed is a boolean
updates(callback)
```

##### Notice
For all functions, if you don't pass a callback, the http request will be done synchronously and the result will be returned directly by the function

```
var show = tvmaze.shows(4);
console.log(show.name);
````

