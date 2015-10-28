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
    
}

function EventDay(){
    
    var self = this;
    
    self.name = "";
    
    self.events = [];
    
}

function Event(){
    
    var self = this;
    
    self.startTime = "";
    
    self.sport = "";
    
}