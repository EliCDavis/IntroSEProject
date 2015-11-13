/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function PageViewmodel(){

    var self = this;
    
    self.userSignedIn = ko.observable(null);
    
    /**
     * The type of view that is being displayed in the side bar currentely
     * 
     * Can be type:
     * Home, Callender
     */
    self.mainViewType = ko.observable("Home");
    
    
    /**
     * The type of view that is being displayed in the side bar currentely
     * 
     * Can be type:
     * Login, Notifications, EventCreation, AthleteBioEdit, AthleteBio, 
     * RequestAutoSession
     */
    self.sideViewType = ko.observable("Login");
    
    
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
        
        // Show appropriate views for a Generic User
        if(user.constructor.name === "GenericUser"){
            self.displayNotificationsScreen();
        }
        
        // Show appropriate views for a Manager
        if(user.constructor.name === "Manager"){
            self.displayEventCreationScreen();
        }
        
        self.notifications(getDatabase().getNotificationsForUser(user));
        console.log(self.notifications());
        
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
    
    
    /**
     * Displays the view for creating a user account.
     * 
     * @returns {undefined}
     */
    self.displayAccountCreation = function(){
        self.sideViewType("AccountCreation");
    };
    
    
    /**
     * Set's the  user signed in to null and display the log in screen.
     * 
     * @returns {undefined}
     */
    self.logOut = function(){
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
    
    /**
     * Displays the Event Creation Screen
     * 
     * @returns {undefined}
     */
    self.displayEventCreationScreen = function(){
        self.sideViewType("EventCreation");
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
        document.getElementById("athleteBioAge").innerHTML = _calculateAge( new Date(self.userSignedIn().dateOfBirth) );
        document.getElementById("athleteBioPic").src = self.userSignedIn().profilePicUrl;
        
    };
    
    self.displayRequestAutoSession = function(){
        
        self.sideViewType("RequestAutoSession");
    
    };
    
    /**
     * Ko computed function that returns true if the user currentely signed in
     * is a manager
     * 
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
     * 
     */
    self.isAthlete = ko.computed(function(){
        
        if(self.userSignedIn() !== null && 
                self.userSignedIn().constructor.name === "Athlete"){
            
            return true;
        
        }
        
        return false;
        
    });
    
    
    self.saveAthleteBioInfo = function(){
        
        if(self.userSignedIn() !== null){
            
            alert("This needs to be finnished!");
            
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
    
}


ko.applyBindings(new PageViewmodel());