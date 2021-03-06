/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function PageViewmodel(){

    var self = this;
    
    self.eventTypes = ko.observableArray(getDatabase().eventTypes);
    
    self.eventLocations = ko.observableArray(databaseStore.locations);
    
    /*
     * This should never change
     */
    self.athleteDirectory = ko.observableArray(getDatabase().getAllAvailableAthlete());
    
    /*
     * This changes based on the event we're building
     */
    self.allAthletes = ko.observableArray(getDatabase().getAllAvailableAthlete());
    
    self.userSignedIn = ko.observable(null);
    
    /**
     * The type of view that is being displayed in the side bar currentely
     * 
     * Can be type:
     * Home, Callender, Athletes
     */
    self.mainViewType = ko.observable("Home");
    
    
    /**
     * The type of view that is being displayed in the side bar currentely
     * 
     * Can be type:
     * Login, Notifications, EventCreation, AthleteBioEdit, AthleteBio, 
     * RequestAutoSession, ViewEvent, AssignGuards
     */
    self.sideViewType = ko.observable("Login");
    
    
    /*
     * Notifications the user has received
     */
    self.notifications = ko.observableArray();
    
    
    /**
     * Attempts to log in the user by looking at what they've entered in on the
     * page for credentials
     * 
     * @returns {undefined}
     */
    self.attemptLogin = function(){
        
        var enteredUsername = document.getElementById("inputLoginUsername").value;
        
        var enteredPassword = document.getElementById("inputLoginPassword").value;
        
        //Atempt to grab user w/ username and password
        var user = getDatabase().getUserWithNameAndPassword(enteredUsername, enteredPassword);
        
        //If we can't find user, display log in failure!
        if(user === null){
            document.getElementById("loginErrorMessage").style.display = "block";
            return;
        }
        
        self.login(user);
        
    };
    
    
    self.login = function(user){
        
        self.userSignedIn(user);
        
        self.displayHomeView();
        self.displayCallenderView();
        
        self.displayNotificationsScreen();
        
        // Show appropriate views for a Generic User
        if(user.constructor.name === "GenericUser"){
            self.displayNotificationsScreen();
        }
        
        // Show appropriate views for a Manager
        if(user.constructor.name === "Manager"){
            self.displayEventCreationScreen();
        }
        
        self.notifications(getDatabase().getNotificationsForUser(user));
        
    };
    
    
    self.attemptAccountCreation = function(){
        
        if(document.getElementById("inputACName").value === "" || 
                document.getElementById("inputACUsername").value === "" || 
                document.getElementById("inputACPassword").value === ""){
            
            alert("Please fill in all the blanks!");
            
            return;
        }
        
        var enteredUsername = document.getElementById("inputACUsername").value;
        
        //Atempt to grab user w/ username 
        var user = getDatabase().getUserByUsername(enteredUsername);
        
        // If we found a user with the same username then we need to choose a 
        // different username
        if(user !== null){
            alert("that username is already taken! Pick another one please :)");
            return;
        }
        
        var newUserAccount = new GenericUser();
        newUserAccount.name = document.getElementById("inputACName").value;
        newUserAccount.userName = enteredUsername;
        newUserAccount.password = document.getElementById("inputACPassword").value;
        
        getDatabase().users.push(newUserAccount);
        
        self.login(newUserAccount);
        
    };
    
    
    self.displayHomeView = function(){
        self.mainViewType("Home");
    };
    
    self.displayCallenderView = function(){
        
        if(self.mainViewType() === "Callender"){
            return;
        }
        
        self.mainViewType("Callender");
        initialize();
    };
    
    self.displayAthleteDirectory = function(){
        self.mainViewType("Athlete");
    };
    
    /**
     * Displays the view for creating a user account.
     * 
     * @returns {undefined}
     */
    self.displayAccountCreation = function(){
        self.sideViewType("AccountCreation");
    };
    
    
    //--------------------------GuardAssigning Shit-------------------------
    self.eventToAssignGuardsTo = ko.observable(null);
    
    self.availableGuards = ko.observableArray();
    
    self.assignedGuards = ko.observableArray();
    
    self.displayAssignGuardsScreen = function(eventID){
        self.sideViewType("AssignGuards");
        
        
        var event = getDatabase().grabEventByID(eventID);
        
        self.assignedGuards([]);
        for(var i = 0; i < event.guards.length; i ++){
            self.assignedGuards.push(  getDatabase().getUserByID(event.guards[i]) );
        }
        
        self.eventToAssignGuardsTo(event);
        self.availableGuards( 
            getDatabase().getAvailableGuardsAtTimeAndDay(event.startTime(), event.eventDay)
        );
    };
    
    self.addGuardToEvent = function(guard){
        self.assignedGuards.push(guard);
        self.availableGuards.remove(guard);
        
        self.eventToAssignGuardsTo().guards.push(guard.id);
        guard.eventsAssignedTo.push(self.eventToAssignGuardsTo().id);
        
        self.displayHomeView();
        self.displayCallenderView();
        
        var notification = new Notification();
        notification.message("You have been assigned to the event of "+
                self.eventToAssignGuardsTo().sport()+" in the "+
                self.eventToAssignGuardsTo().location()+" at "+
                self.eventToAssignGuardsTo().startTime());
        notification.fromID = self.userSignedIn().id;
        notification.toID = guard.id;
        getDatabase().notifications.push(notification);
        
    };
    
    self.removeGuardFromEvent = function(guard){
        self.assignedGuards.remove(guard);
        self.availableGuards.push(guard);
        
        guard.removeEventFromGuard(self.eventToAssignGuardsTo().id);
        self.eventToAssignGuardsTo().removeGuard(guard.id);
        
        self.displayHomeView();
        self.displayCallenderView();
        var notification = new Notification();
        notification.message("You have been removed from the event of "+
                self.eventToAssignGuardsTo().sport()+" in the "+
                self.eventToAssignGuardsTo().location()+" at "+
                self.eventToAssignGuardsTo().startTime());
        notification.fromID = self.userSignedIn().id;
        notification.toID = guard.id;
        getDatabase().notifications.push(notification);
    };
    
    //-----------------------------------------------------------------------
    
    
    /**
     * Set's the  user signed in to null and display the log in screen.
     * 
     * @returns {undefined}
     */
    self.logOut = function(){
        self.displayHomeView();
        self.userSignedIn(null);
        self.displayLoginScreen();
    };
    
    
    /**
     * Displays the log in screen
     * 
     * @returns {undefined}
     */
    self.displayLoginScreen = function(){
        self.sideViewType("Login");
    };
    
    /**
     * Displays the Notifications Screen
     * 
     * @returns {undefined}
     */
    self.displayNotificationsScreen = function(){
        self.sideViewType("Notifications");
    };
    
    
    self.athletesAddedToEventCreation = ko.observableArray();
    
    self.addAthleteToEventCreation = function(athlete){
        self.athletesAddedToEventCreation.push(athlete);
        self.allAthletes.remove(athlete);
    };
    
    self.removeAthleteFromEventCreation = function(athlete){
        self.athletesAddedToEventCreation.remove(athlete);
        self.allAthletes.push(athlete);
    };
    
    /**
     * Displays the Event Creation Screen
     * 
     * @returns {undefined}
     */
    self.displayEventCreationScreen = function(){
        
        //reset this.
        self.allAthletes(getDatabase().getAllAvailableAthlete());
        self.athletesAddedToEventCreation([]);
        
        //display it
        self.sideViewType("EventCreation");
        
        //Add container to dragula for dragging.
        drake.containers.push(document.getElementById('createdEvents'));

    };
    
    self.displayAthleteBioEdit = function(){
        
        self.sideViewType("AthleteBioEdit");
        
        // Loads all athlete data on the page.
        document.getElementById("athleteBiotEdit").value = self.userSignedIn().bio;
        document.getElementById("athleteNameEdit").value = self.userSignedIn().name;
        document.getElementById("athletePicEdit").value = self.userSignedIn().profilePicUrl;
        document.getElementById("athleteBdayEdit").value = self.userSignedIn().dateOfBirth;
        
    };
    
    /*
     * 
     * @returns {undefined}
     */
    self.displayOwnAthleteBio = function(){
        
        self.sideViewType("AthleteBio");
        
        document.getElementById("athleteBioBio").innerHTML = self.userSignedIn().bio;
        document.getElementById("athleteBioName").innerHTML = self.userSignedIn().name;
        document.getElementById("athleteBioCountry").innerHTML = self.userSignedIn().country;
        document.getElementById("athleteBioSport").innerHTML = self.userSignedIn().sport;
        document.getElementById("athleteBioAge").innerHTML = _calculateAge( new Date(self.userSignedIn().dateOfBirth) );
        document.getElementById("athleteBioPic").src = self.userSignedIn().profilePicUrl;
        
    };
    
    self.displayAthleteBio = function(athlete){
        
        self.sideViewType("AthleteBio");
        
        document.getElementById("athleteBioBio").innerHTML = athlete.bio;
        document.getElementById("athleteBioName").innerHTML = athlete.name;
        document.getElementById("athleteBioCountry").innerHTML = athlete.country;
        document.getElementById("athleteBioSport").innerHTML = athlete.sport;
        document.getElementById("athleteBioAge").innerHTML = _calculateAge( new Date(athlete.dateOfBirth) );
        document.getElementById("athleteBioPic").src = athlete.profilePicUrl;
        
    };
    
    self.displayRequestAutoSession = function(){
        
        self.sideViewType("RequestAutoSession");
    
    };
    
    /**
     * Ko computed function that returns true if the user currentely signed in
     * is a manager
     */
    self.isManager = ko.computed(function(){
        
        if(self.userSignedIn() !== null && self.userSignedIn().constructor.name === "Manager"){
            return true;
        }
        
        return false;
        
    });
    
    
    /**
     * Ko computed function that returns true if the user currentely signed in
     * is a Athlete
     */
    self.isAthlete = ko.computed(function(){
        
        if(self.userSignedIn() !== null && 
                self.userSignedIn().constructor.name === "Athlete"){
            
            return true;
        
        }
        
        return false;
        
    });
    
    /**
     * Ko computed function that returns true if the user currentely signed in
     * is a generic user
     * 
     */
    self.isGeneric = ko.computed(function(){
        
        if(self.userSignedIn() !== null && self.userSignedIn().constructor.name === "GenericUser"){
            return true;
        }
        
        return false;
        
    });
    
    /**
     * Ko computed function that returns true if the user currentely signed in
     * is a SecurityManager
     */
    self.isSecurityManager = ko.computed(function(){
        if(self.userSignedIn() !== null && self.userSignedIn().constructor.name === "SecurityManager"){
            return true;
        }
        
        return false;
    });
    
    /**
     * Ko computed function that returns true if the user currentely signed in
     * is a Guard
     */
    self.isGuard = ko.computed(function(){
        if(self.userSignedIn() !== null && self.userSignedIn().constructor.name === "Guard"){
            return true;
        }
        
        return false;
    });
    
    
    self.saveAthleteBioInfo = function(){
        
        if(self.userSignedIn() !== null){
            
            alert("Your profile has been updated");
            
            self.userSignedIn().bio = document.getElementById("athleteBiotEdit").value;
            self.userSignedIn().name = document.getElementById("athleteNameEdit").value;
            self.userSignedIn().profilePicUrl = document.getElementById("athletePicEdit").value;
            self.userSignedIn().dateOfBirth = document.getElementById("athleteBdayEdit").value;
            console.log(document.getElementById("athleteBdayEdit").value);
            
        }
        
    };
    
    
    /**
     * Requests the athlete makes when they've filled out a autograph session
     * request
     * 
     * @returns {undefined}
     */
    self.requestAutoSession = function(){
        
        var loc = document.getElementById("requestAutoSessionLoc").value;
        var date = document.getElementById("reqAutoSessionDate").value;
        var time = document.getElementById("reqAutoSessionTime").value;
        
        // If any of these variables where not filled in then we can't create
        // a request
        if(loc === null || date === null || time === null){
            alert("Fill out the form before clicking request!");
            return;
        }
        
        var requestMessage = (self.userSignedIn().name+" has requested an autographing session at "+time+" on "+date+" in the "+loc+"!");
        
        getDatabase().requestToManager(self.userSignedIn(), requestMessage);
        
    };
    
    
    self.eventBeingDisplayed = ko.observable(null);
    
    
    self.athletesInEventView = ko.observableArray();
    
    
    self.displayEvent = function(eventID){
        
        self.athletesInEventView([]);
        
        for(var i = 0; i < getDatabase().events.length; i ++){
            if(getDatabase().events[i].id === eventID){
                self.eventBeingDisplayed(getDatabase().events[i]);
            }
        }
        
        for(var i = 0; i < self.eventBeingDisplayed().athletes.length; i ++){
            self.athletesInEventView.push(getDatabase().getUserByID(self.eventBeingDisplayed().athletes[i]));
        }
        
        
        self.sideViewType("ViewEvent");
    };
    
    
    self.purchaseEventTicket = function(event){

        console.log(event);
        
        self.userSignedIn().ticketsBought.push(event.id);


        self.displayEvent(event.id);

        //refresh the view, quick and easy way :3
        self.displayHomeView();
        self.displayCallenderView();
        
    };
    
    self.ableToPurchaseTicket = ko.computed(function(){
        
        if(self.isGeneric() || self.isAthlete() || self.isGuard()){
            
            if(self.eventBeingDisplayed() === null){
                return false;
            }
            
            if(self.isGuard()){
                
                for(var i = 0; i < self.userSignedIn().eventsAssignedTo.length; i ++){
                    if(self.userSignedIn().eventsAssignedTo[i] === self.eventBeingDisplayed().id){
                        return false;
                    }
                }
                
            }
            
            if(self.userSignedIn().hasTicketToEvent(self.eventBeingDisplayed().id) === false){
                return true;
            }
            
        }
        
        return false;
        
    });
    
}

var pageView = new PageViewmodel();

ko.applyBindings(pageView);
