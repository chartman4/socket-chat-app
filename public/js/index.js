var socket = io();
var user;

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');

var template = jQuery('#message-template').html();
var html = Mustache.render(template, {
  text: message.text,
  from: message.from,
  createdAt: formattedTime});

jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime});
    
  jQuery('#messages').append(html);

});

jQuery('#login-form').on('submit', function (e) {
  // prevent window refresh
  e.preventDefault();
  //show messages
  jQuery(".messages").css("display", "block");
  //save user name
  user = jQuery('[name=user]').val();
  //display user name
  jQuery('#welcome').append(`  Logged in as ${user}`);
  // make cursor at message text
  jQuery("#message-text").focus();
  // hide the login form once logged in
  jQuery("#login-form").css("display", "none");
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = jQuery("#message-text");
  socket.emit('createMessage', {
    from: user,
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });

  jQuery("#message-text").val("").focus();
});

var locationBtn = $('#send-location');
locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationBtn.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
      locationBtn.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        user,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function () {
      locationBtn.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
    })
});