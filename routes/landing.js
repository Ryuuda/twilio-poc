var express = require('express');
var router = express.Router();
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
const config = require('../config/env/' + express().get('env'));

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
router.get('/token', function(request, response) {
	var identity = randomName();

	// Create an access token which we will sign and return to the client,
	// containing the grant we just created.
	var token = new AccessToken(
		config.TWILIO.TWILIO_ACCOUNT_SID,
		config.TWILIO.TWILIO_API_KEY,
		config.TWILIO.TWILIO_API_SECRET
	);

	// Assign the generated identity to the token.
	token.identity = identity;

	// Grant the access token Twilio Video capabilities.
	var grant = new VideoGrant();
	token.addGrant(grant);

	// Serialize the token to a JWT string and include it in a JSON response.
	response.send({
		identity: identity,
		token: token.toJwt()
	});
});

var ADJECTIVES = [
	'Abrasive', 'Brash', 'Callous', 'Daft', 'Eccentric', 'Fiesty', 'Golden',
	'Holy', 'Ignominious', 'Joltin', 'Killer', 'Luscious', 'Mushy', 'Nasty',
	'OldSchool', 'Pompous', 'Quiet', 'Rowdy', 'Sneaky', 'Tawdry',
	'Unique', 'Vivacious', 'Wicked', 'Xenophobic', 'Yawning', 'Zesty'
];

var FIRST_NAMES = [
	'Anna', 'Bobby', 'Cameron', 'Danny', 'Emmett', 'Frida', 'Gracie', 'Hannah',
	'Isaac', 'Jenova', 'Kendra', 'Lando', 'Mufasa', 'Nate', 'Owen', 'Penny',
	'Quincy', 'Roddy', 'Samantha', 'Tammy', 'Ulysses', 'Victoria', 'Wendy',
	'Xander', 'Yolanda', 'Zelda'
];

var LAST_NAMES = [
	'Anchorage', 'Berlin', 'Cucamonga', 'Davenport', 'Essex', 'Fresno',
	'Gunsight', 'Hanover', 'Indianapolis', 'Jamestown', 'Kane', 'Liberty',
	'Minneapolis', 'Nevis', 'Oakland', 'Portland', 'Quantico', 'Raleigh',
	'SaintPaul', 'Tulsa', 'Utica', 'Vail', 'Warsaw', 'XiaoJin', 'Yale',
	'Zimmerman'
];

function randomItem(array) {
	var randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

const randomName = function() {
	return randomItem(ADJECTIVES) +
		randomItem(FIRST_NAMES) +
		randomItem(LAST_NAMES);
};

/* GET home page. */
router.get('/:id', function(req, res, next) {
	res.render('landing', { title: 'landing' });
});

module.exports = router;
