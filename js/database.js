/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var databaseInstance = null;

function getDatabase() {

    if (databaseInstance === null) {

        databaseInstance = new Database();

        for (var i = 5; i <= 21; i++) {

            var eventDay = new EventDay();
            eventDay.name = "August " + i;
            databaseInstance.addEventDay(eventDay);

        }
        
        var gu = new GenericUser();
        gu.userName = "user";
        gu.password = "pw";
        
        var mu = new Manager();
        mu.userName = "admin";
        mu.password = "pw";
        
        var au = new Athlete();
        au.userName = "athlete";
        au.password = "pw";
        au.name = "Michael Phelps";
        au.profilePicUrl = "https://lgoogoogaga.files.wordpress.com/2012/07/michael-phelps2.jpg";
        au.bio = "Michael Fred Phelps II (born June 30, 1985) is an American competition swimmer and the most decorated Olympian of all time, with a total of 22 medals. Phelps also holds the all-time records for Olympic gold medals (18, double the second highest record holders), Olympic gold medals in individual events (11), and Olympic medals in individual events for a male (13). In winning eight gold medals at the 2008 Beijing Games, Phelps took the record for the most first-place finishes at any single Olympic Games. Five of those victories were in individual events, tying the single Games record. In the 2012 Summer Olympics in London, Phelps won four golds and two silver medals, making him the most successful athlete of the Games for the third Olympics in a row.";
        au.dateOfBirth = "1985-06-30";
        
        databaseInstance.users = [gu, mu, au];

    }

    return databaseInstance;
}

/*
 * Database object that keeps up with all information needed to run the 
 * application.  Acts as Util with methods such as finding users by username
 * and other nifty functions
 * 
 * @returns {Database}
 */
function Database() {

    var self = this;

    self.eventDays = [];

    self.getEventDays = function () {
        return self.eventDays;
    };

    self.addEventDay = function (eventDay) {
        self.eventDays.push(eventDay);
    };


    /**
     * Array of all users
     */
    self.users = [];


    /**
     * All users listed in the database
     * @returns {Window.users|Array}
     */
    self.getUsers = function () {
        return self.users;
    };

    /**
     * All notifications created currentely stored in the database
     */
    self.notifications = [];


    /**
     * Searches the database and gets all the notifications relating to a 
     * specific user.
     * 
     * @param {type} user
     * @returns {Database.getNotificationsForUser.foundNotifications|Array}
     */
    self.getNotificationsForUser = function (user) {

        var foundNotifications = [];

        for (var i = 0; i < self.notifications.length; i++) {

            if (self.notifications[i].toID === user.id) {
                foundNotifications.push(self.notifications[i]);
            }

        }

        return foundNotifications;

    };

    /**
     * Searches through the database and finds a user with a matching username
     * and password.
     * 
     * @param {string} username
     * @param {string} password
     * @returns {Window.AbstractUser}
     */
    self.getUserWithNameAndPassword = function (username, password) {

        var user = self.getUserByUsername(username);

        //We couldn't find a user with a matching username
        if(user === null){
            return null;
        }

        //Return user if password matches
        if(user.password === password){
            return user;
        }

        //We couldn't find ourselves a user
        return null;

    };

    /**
     * Adds a generic user to the database.
     * Returns user if succesful.
     * Returns null if an error
     * 
     * @param {string} username
     * @param {string} password
     * @returns {GenericUser}
     */
    self.addNewUserToDataBase = function(username, password){
        
        //If we found a user already with the same user name return error
        if(self.getUserByUsername(username) !== null){
            return null;
        }
        
        var user = new GenericUser();
        
        user.userName = username;
        user.password = password;
        self.users.push(user);
        
        return user;
        
    };
    
    
    /*
     * Finds a user by it's username, returns null if it can't find a user
     * with the matching username
     * 
     * @param {string} username
     * @returns {AbstractUser}
     */
    self.getUserByUsername = function(username){
        
        //Iterate through all users
        for(var i = 0; i < self.getUsers().length; i ++){
            
            //if we found the user that matches username and password
            if(self.getUsers()[i].userName === username ){
                
                return self.getUsers()[i];
                
            }
            
        }
        
        return null;
    };
    
    /*
     * Sends a request to a manager in the database.
     * 
     * @param {AbstractUser} sender
     * @param {String} requestMessage
     * @returns {undefined}
     */
    self.requestToManager = function(sender, requestMessage){
        
        var notification = new Notification();
        
        notification.fromID = sender.id;
        notification.message(requestMessage);
        
        for(var i = 0; i < self.getUsers().length; i ++){
            
            if(self.getUsers()[i].constructor.name === "Manager"){
                
                notification.toID = self.getUsers()[i].id;
                break;
                
            }
            
        }
        
        self.notifications.push(notification);
        
    };

}

function EventDay() {

    var self = this;

    self.name = "";

    self.events = [];

}

function Event() {

    var self = this;

    self.id = generateUUID();

    self.startTime = "";

    self.sport = "";

}

/*
 * 
 * @returns {Notification}
 */
function Notification() {

    var self = this;

    self.id = generateUUID();

    /**
     * The person who created the notification. 
     * If an athlete requested autographing, then the notification is from them
     */
    self.fromID;

    /*
     * The person who actually receives the notifcation and is able to read it
     */
    self.toID;

    /**
     * Text of the notification
     */
    self.message = ko.observable("Balls");

    /**
     * Whether or not the user has read the notification
     */
    self.read = false;

    /**
     * Marks the notification as read.
     * 
     * @returns {undefined}
     */
    self.markAsRead = function(){
        self.read = true;
    };

}


/**
 * @abstract
 * @returns {undefined}
 */
function AbstractUser() {

    var self = this;

    /**
     * Username the user uses to log into our system
     */
    self.userName = "";
    
    
    /**
     * Password to the user account
     */
    self.password = "";


    /**
     * Name of the user
     */
    self.name = "Bob";

    /*
     * ID of the user, format of a uuid
     */
    self.id = generateUUID();

}


/**
 * Class meant to represent the Generic user.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function GenericUser() {

    AbstractUser.apply(this, arguments);

    var self = this;

    /**
     * Array of uuid's that corresponds an event's uuid.
     */
    self.ticketsBought = [];

}

//Applys inheritance
GenericUser.prototype = Object.create(AbstractUser.prototype);
GenericUser.prototype.constructor = GenericUser;


/**
 * Class meant to represent the Athlete.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function Athlete() {
    
    AbstractUser.apply(this, arguments);

    var self = this;

    /**
     * Array of uuid's that corresponds to an event's uuid
     */
    self.eventsParticipatingIn = [];


    /**
     * Array of uuid's that corresponds to an event's uuid
     */
    self.ticketsOwned = [];


    /**
     * What the personal info the athlete has entered about themselves that they 
     * want the world to know about
     */
    self.bio = "";


    /**
     * Date of birth set by date input.
     */
    self.dateOfBirth = "";


    /**
     * If we want to get fancy and have pictures for each athlete, here's 
     * where you would store the url
     */
    self.profilePicUrl = "";


    /**
     * Gender of the athlete
     * Values either "Male" or "Female"
     */
    self.gender = "";


    /**
     * Country the Athlete is competing for.
     */
    self.country = "";

}

//Applys inheritance
Athlete.prototype = Object.create(AbstractUser.prototype);
Athlete.prototype.constructor = Athlete;


/**
 * Class meant to represent the Guard.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function Guard() {

    AbstractUser.apply(this, arguments);

    var self = this;

    self.ticketsOwned = [];

    self.eventsAssignedTo = [];

    self.assignGuardNewEvent = function (event) {
        self.eventsAssignedTo.push(event);
    };

    /**
     * Searches through all guards events and removes the first instance
     * of event that matches the event's passed in uuid.
     * 
     * MIGHT NEED TESTING!!!
     * 
     * @param {Window.event} event
     * @returns {undefined}
     */
    self.removeEventFromGuard = function (event) {

        //go through and try finding an event who's id matches the one passed in
        for (var i = 0; i < self.eventsAssignedTo.length; i++) {

            if (self.eventsAssignedTo[i].id === event.id) {
                self.eventsAssignedTo.splice(i, 1);
                return;
            }

        }

    };

}

//Applys inheritance
Guard.prototype = Object.create(AbstractUser.prototype);
Guard.prototype.constructor = Guard;


/**
 * Class meant to represent the Security Manager.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function SecurityManager() {
    
    AbstractUser.apply(this, arguments);

    var self = this;

}

//Applys inheritance
SecurityManager.prototype = Object.create(AbstractUser.prototype);
SecurityManager.prototype.constructor = SecurityManager;


/**
 * Class meant to represent the Manager.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function Manager() {
    
    AbstractUser.apply(this, arguments);

    var self = this;

}

//Applys inheritance
Manager.prototype = Object.create(AbstractUser.prototype);
Manager.prototype.constructor = Manager;


/**
 * @stof 105034
 * @returns {String}
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

////////////// Tests from here under (Idk exactly what's going on) ///////////
var gUser = new GenericUser();

gUser.name = "Jim";
gUser.ticketsBought = ["Hell", "On", "Earth"];

console.log(gUser.constructor.name);

console.log(gUser.ticketsBought);
console.log(gUser.id);