require("dotenv").config();
var request = require("request");//this is for movie
var spotifyrequire = require('node-spotify-api');//for spotify
var twitterrequire = require("twitter");//twitter
var dotenvrequire = require("dotenv");//dotenv
var keysINeed = require("./keys.js");//this is for Spotify and Twitter

var fs = require("fs");//readfile and writefile

var command = process.argv[2];
var userInput = process.argv[3];


if (command === "movie-this") {    
    moviefunction();
}
else if(command === "my-tweets") {
    twitterfunction();
}
else if(command === "spotify-this-song") {
    spotifyfunction();
}
else if(command === "do-what-it-says") {
    randomfile();
}
else {
    console.log ("That is not a valid command.");
}




function moviefunction() {

    if (userInput === undefined) {
        userInput = "Mr. Nobody";
    }
        
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        
        if (!error && response.statusCode === 200) {

            if (userInput === "Mr. Nobody") {
                console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>");
                console.log("It's on Netflix!");
                console.log("See movie details below.")
                console.log("*********");
            }

            // else { //use else if user inputs other movies.
            console.log("Title of the movie: ", JSON.parse(body).Title);
            console.log("Year: ", JSON.parse(body).Year);
            console.log("IMDB Rating: ", JSON.parse(body).imdbRating);
            
            console.log("Country: ", JSON.parse(body).Country);
            console.log("Language: ", JSON.parse(body).Language);
            console.log("Plot: ", JSON.parse(body).Plot);
            console.log("Actors: ", JSON.parse(body).Actors);
            // console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
            // for (var i=0; i< JSON.parse(body).Ratings.length; i++){
            if (JSON.parse(body).Ratings.Source === "Rotten Tomatoes" )
            {
                console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings.Value);
                }
            else{
                console.log("Rotten Tomatoes Rating: N/A");
            }
            // }// else
        }
    });
}

function twitterfunction() {
    
    var client = new twitterrequire(keysINeed.twitter);
    
    var params = {q: '@AnantPatel123', count:20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets);
      
        for (var i = 0; i <tweets.length; i++){
            console.log("My tweets: ", tweets[i].text);
            console.log("Tweets created at: ",tweets[i].created_at);
            // console.log(tweets[i].user.screen_name);
            // console.log(JSON.parse(tweets[i].text);
        }
    }

    });
}

function spotifyfunction() {

    if (userInput === undefined) {
        userInput = "The Sign Ace of Base";
    }
       
    var spotify = new spotifyrequire(keysINeed.spotify);

    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songdetails = data.tracks.items[0];
        // console.log(data.tracks.items[0].album);
       
        console.log("Name of the song: ", songdetails.name);        
        console.log("Artist(s): ", songdetails.album.artists[0].name);          
        console.log("Name of the album: ", songdetails.album.name);       
        console.log("A preview link of the song from Spotify: ", songdetails.album.external_urls.spotify);        
    });

}

function randomfile() {

    //random.txt orig had spotify-this-song,"I Want it That Way"
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        }
        else {
            var dataArr = data.split(",");
                command = dataArr[0];
                userInput = dataArr[1];

                if (command === "movie-this") {    
                    moviefunction();
                }
                else if(command === "my-tweets") {
                    twitterfunction();
                }
                else if(command === "spotify-this-song") {
                    spotifyfunction();
                }
                else if(command === "do-what-it-says") {
                    randomfile();
                }
                else {
                    console.log ("That is not a valid command.");
                }

            }
        
    })

}