var key = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var action = process.argv[2];

    console.log(key);
    console.log(action);

if(action === '-----')
{
	
	fs.readFile("random.txt", "utf8", function(err, data) {
    		if (err) {
      		return console.log(err);
      	}
      	console.log(data);
      	
	action = data;
	console.log(action);
	switchAction(action);


	var result = [];
	         result = data.split(","); 
	console.log(result);
	         action = result[0];
	trackName = result[1];



	console.log(action);
	console.log(trackName);
	switchAction();

	});
}
else
{
	switchAction();
}

function switchAction()
{
	switch(action){
		case "my-tweets": myTweets();
							break;
		case "spotify-this-song": var trackName = process.argv.splice(3).join(' ');
		     						myTrack(trackName);
									break;
		case "movie-this": myMovie();
							break;
		default: break;

	} 
}

function myTweets()
// {
	// var client = new Twitter({
  	// consumer_key: key.tkey.consumer_key,
 	  // consumer_secret: key.tkey.consumer_secret,
  	// access_token_key: key.tkey.access_token_key,
  	// access_token_secret: key.tkey.access_token_secret
// });
	console.log(key.tkey);

	var params = {screen_name: '@lavs_subramany'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    console.log(tweets);
    tweets.forEach(function (element) {
                fs.appendFile('log.txt', JSON.stringify(element, null, 2) + '\n', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log('Created at: ' + element.created_at);
                console.log(element.text);
                console.log("\n=============\n");
            });
            }
});
}

function myTrack(trackName)
{
    var newTrack
	var spotify = new Spotify({
		id: key.spotifyKey.id,
		secret: key.spotifyKey.secret
	});
	if(!trackName)
	{
		newTrack = 'The Sign';
	}
	else
	{
		newTrack = trackName;
	}
	spotify.search({ type: 'track', query: newTrack, limit: 10}, function(err, data) {
  if (err) {
    console.error('Something went wrong', err.message);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
  console.log('I got ' + data.tracks.total + ' results!');
  var firstPage = data.tracks.items;
  console.log('The tracks details are:');

  firstPage.forEach(function(track, index) {
 if(track.name.toLowerCase() === newTrack.toLowerCase())
   {

    console.log('');
    console.log('');
    console.log('');
  }
 });
  
});
}

function myMovie()
{

	         if(process.argv[3])
	         {
		       Var movieName = process.argv.splice(3).join(' ');
	         }  
	         else
	         {
		      var movieName = 'Mr.Nobody';
	         }
	                         console.log(movieName);
	         var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

                           console.log(queryUrl);

request(queryUrl, function(error, response, body) {

// THIS IS NOT WORKING ///////////

 // if (!error && response.statusCode === 200) {
 //   console.log(JSON.stringify(body, null, 2));
 //   console.log("Release Year: " + JSON.parse(body).Year);
 //   console.log("Movie: " + JSON.parse(body).Title);
 //    console.log("The IMDB rating: " + JSON.parse(body).imdbRating);
    // console.log("The production country: " + JSON.parse(body).Country);
    // console.log("The movie language: " + JSON.parse(body).Language);
    // console.log("The plot: " + JSON.parse(body).Plot);
    // console.log("The actors: " + JSON.parse(body).Actors);
  }
});
}

