/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var databaseInstance = null;

function getDatabase(){
    
    if(databaseInstance === null){
        
        databaseInstance = new Database();
        
        for(var i = 5; i <= 21; i ++){
            
            var eventDay = new EventDay();
            eventDay.name = "August "+ i;
            databaseInstance.addEventDay(eventDay);
        
        }
        
    }
    
    return databaseInstance;
}

function Database(){
    
    var self = this;
    
    self.eventDays = [];
    
    self.getEventDays = function(){
        return self.eventDays;
    };
    
    self.addEventDay = function(eventDay){
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
    self.getUsers = function(){
        return self.users;
    };
    
}

function EventDay(){
    
    var self = this;
    
    self.name = "";
    
    self.events = [];
    
}

function Event(){
    
    var self = this;
    
    self.id = "";
    
    self.startTime = "";
    
    self.sport = "";
    
}

/**
 * @abstract
 * @returns {undefined}
 */
function AbstractUser(){
    
    var self = this;
   
    /**
     * Name of the user
     */
    self.name = "Bob";
    
    /*
     * ID of the user, format of a uuid
     */
    self.id = "";
    
    
}


/**
 * Class meant to represent the Generic user.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function GenericUser(){
    
    var self = this;
    
    /**
     * Array of uuid's that corresponds an event's uuid.
     */
    self.ticketsBought = [];
    
}

//Applys inheritance
GenericUser.prototype = Object.create(AbstractUser.prototype);


/**
 * Class meant to represent the Athlete.
 * Inherits from AbstractUser
 * @returns {undefined}
 */
function Athlete(){
    
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
    
    
    self.profilePicUrl = "";
    
    
    self.gender = "";
    
    
    /**
     * Country the Athlete is competing for.
     */
    self.country = "";
    
}

//Applys inheritance
Athlete.prototype = Object.create(AbstractUser.prototype);


/**
 * @stof 105034
 * @returns {String}
 */
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

////////////// Tests from here under (Idk exactly what's going on) ///////////
var gUser = new GenericUser();

gUser.name = "Jim";
gUser.ticketsBought = ["Hell","On","Earth"];

console.log(gUser.name);
console.log(gUser.ticketsBought);
