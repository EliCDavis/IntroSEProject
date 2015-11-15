/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * http://www.rio2016.com/sites/default/files/users/rio2016_files/guia_ingressoing_2015_daily_0.pdf
 * 
 * Everything stored in our database in Json format, to be loaded into databse 
 * object upon start
 */
var databaseStore = {
    
    users: [
        {
            id: "b0deafb8-a3fc-4135-83d2-5c17b4427b53",
            type: "Generic",
            userName: "dude",
            password: "pw",
            name: "Eli Davis",
            ticketsOwned : [
                "5347bd1e-f62f-4e02-9b54-80a9f6861648"
            ]
        },
        {
            id: "e44dee1f-e079-4351-b3cf-651885225a92",
            type: "Athlete",
            userName: "athlete",
            password: "pw",
            name: "Michael Phelps",
            ticketsOwned : [],
            bio: "Michael Fred Phelps II (born June 30, 1985) is an American competition swimmer and the most decorated Olympian of all time, with a total of 22 medals. Phelps also holds the all-time records for Olympic gold medals (18, double the second highest record holders), Olympic gold medals in individual events (11), and Olympic medals in individual events for a male (13). In winning eight gold medals at the 2008 Beijing Games, Phelps took the record for the most first-place finishes at any single Olympic Games. Five of those victories were in individual events, tying the single Games record. In the 2012 Summer Olympics in London, Phelps won four golds and two silver medals, making him the most successful athlete of the Games for the third Olympics in a row.",
            picUrl: "https://lgoogoogaga.files.wordpress.com/2012/07/michael-phelps2.jpg",
            dateOfBirth: "1985-06-30",
            gender: "Male",
            country: "USA",
            sport: "Swimming"
        },
        {
            id: "d560edaf-8b7b-4413-a332-d951fccd9f56",
            type: "Athlete",
            userName: "athlete",
            password: "pw",
            name: "Anti Phelps",
            ticketsOwned : [],
            bio: "Not Micheal Phelps",
            picUrl: "https://lgoogoogaga.files.wordpress.com/2012/07/michael-phelps2.jpg",
            dateOfBirth: "1985-06-30",
            gender: "Male",
            country: "Anti-USA",
            sport: "Weightlifting"
        },
        {
            id: "4e0c71a0-9fc1-4e29-8306-444faf3407f8",
            type: "Manager",
            userName: "admin",
            password: "pw",
            name: "Manager Dude"
        },
        {
            id: "31ee35d3-e1e2-4083-922a-7d005d82f210",
            type: "Security",
            userName: "sec",
            password: "pw",
            name: "Security Dude 1",
            assigned: ["952cb810-d41c-4c30-9768-b2ff80017e6a"]
        },
        {
            id: "8534e352-3388-4cd5-a4be-611295f01909",
            type: "Security",
            userName: "sec2",
            password: "pw",
            name: "Security Dude 2",
            assigned: []
        },
        {
            id: "2f685cd1-c97e-40d1-a9be-1c3861c09b4f",
            type: "Security",
            userName: "sec3",
            password: "pw",
            name: "Security Dude 3",
            assigned: []
        },
        {
            id: "9eb71fa3-d7f3-446b-96e7-0f445b995032",
            type: "SecurityManager",
            userName: "secadmin",
            password: "pw",
            name: "Security Manager Dude"
        }
    ],
    eventDays: [
        {
            id: "f877aa68-fa6d-4423-842a-4e6e89fc4dd6",
            name: "Start Day",
            events: [
                {
                    id: "05f73175-de2f-4a48-ba78-409857fbeae9",
                    location: "Olympic Stadium",
                    time: "9",
                    type: "Swimming",
                    athletes: ["e44dee1f-e079-4351-b3cf-651885225a92"],
                    guards: []
                },
                {
                    id: "6554e7ab-a704-4399-a8df-34b323e0e863",
                    location: "Olympic Stadium",
                    time: "9",
                    type: "Swimming",
                    athletes: ["e44dee1f-e079-4351-b3cf-651885225a92"],
                    guards: []
                },
                {
                    id: "952cb810-d41c-4c30-9768-b2ff80017e6a",
                    location: "Olympic Stadium",
                    time: "10",
                    type: "Swimming",
                    athletes: ["e44dee1f-e079-4351-b3cf-651885225a92"],
                    guards: ["31ee35d3-e1e2-4083-922a-7d005d82f210"]
                },
                {
                    id: "5347bd1e-f62f-4e02-9b54-80a9f6861648",
                    location: "Olympic Stadium",
                    time: "10",
                    type: "Swimming",
                    athletes: ["e44dee1f-e079-4351-b3cf-651885225a92"],
                    guards: []
                }
            ]
        },
        {
            id: "46262218-1061-4f9a-903d-327d1aa52841",
            name: "August 6" ,
            events: []
        },
        {
            id: "da29b1e2-d588-4894-a5d0-559fbd373769",
            name: "August 7" ,
            events: [] 
        },
        {
            id: "d8f7d608-d0ce-4a69-9b0c-e0b9feae2878",
            name: "August 8" ,
            events: [] 
        },
        {
            id: "4ae8023c-2fc6-4b83-ac8c-24ee18cd3b7c",
            name: "August 9"  ,
            events: []
        },
        {
            id: "80877917-ea7b-417f-b70f-72f41d5d72cf",
            name: "August 10"  ,
            events: []
        },
        {
            id: "a4e5ad87-9996-423c-a7fc-3ac8b5a5ed1a",
            name: "August 11"  ,
            events: []
        },
        {
            id: "1ede224a-8dd3-411a-b933-34c6e46336a7",
            name: "August 12"  ,
            events: []
        },
        {
            id: "8970c61b-a851-4eea-8fb8-a66c0f938c47",
            name: "August 13"  ,
            events: []
        },
        {
            id: "9facbaab-b617-433e-bad7-e5ce72493450",
            name: "August 14"  ,
            events: []
        },
        {
            id: "a1947c22-f34e-45aa-bfa4-1cbed42e8394",
            name: "August 15"  ,
            events: []
        },
        {
            id: "732977e5-4aec-43c1-b802-01382328ddbd",
            name: "August 16"  ,
            events: []
        },
        {
            id: "90d7d06e-6ca9-4dc6-b8cd-e8453f86eb2d",
            name: "August 17"  ,
            events: []
        },
        {
            id: "8edd0947-9cd7-48fa-a7c2-a81b3979cfc5",
            name: "August 18"  ,
            events: []
        },
        {
            id: "edde8eae-4ca5-4f5b-9ad0-52f113c4f27b",
            name: "August 19"  ,
            events: []
        },
        {
            id: "a8fee7fe-f7c4-46ce-8936-0b934d52d0cc",
            name: "August 20"  ,
            events: []
        },
        {
            id: "95188bfa-7583-46c3-ad67-26f9522e422a",
            name: "Final Day"  ,
            events: []
        }
    ],
    eventTypes: [
        "Awards",
        "Autographing",
        "Archery",
        "Basketball",
        "Beach Volleyball",
        "Cycling",
        'Diving',
        "Equestrian",
        "Fencing",
        "Football",
        "Gymnastics",
        "Hockey",
        "Swimming",
        "Tennis",
        "Triathlon",
        "Weightlifting"
    ],
    locations: [
        "Olympic Stadium",
        "Sambódromo",
        "Pontal",
        "Beach Volleyball Arena",
        "Rio Olympic Velodrome",
        "Maria Lenk Aquatics Centre",
        "Olympic Equestrian Centre"
    ],
    countriesParticipating: [
        "USA",
        "Anti-USA",
        "Rio",
        "Not Paris"
    ]
};

function loadAllEventDays(){
    
    var days = [];
    var events = [];
    
    for(var i = 0; i < databaseStore.eventDays.length; i ++){
        
        var eventDay = new EventDay();
        eventDay.name = databaseStore.eventDays[i].name;
        
        for(var e = 0; e < databaseStore.eventDays[i].events.length; e ++){
            var event = loadEvent(databaseStore.eventDays[i].events[e]);
            eventDay.events.push(event.id);
            event.eventDay = eventDay.id;
            
            events.push(event);
        }
        
        days.push(eventDay);
        
    }
    
    return [days, events];
    
}

function loadEvent(json){
    
    var event = new Event();
    
    event.id = json.id;
    event.athletes = json.athletes;
    event.guards = json.guards;
    event.location(json.location);
    event.startTime(json.time);
    event.sport(json.type);
    
    event.price = 80;
                
    if(event.sport() === "Awards" || event.sport() === "Autographing"){
        event.price = 0;
    }
    
    return event;
    
}


function loadAllUsers(){
    
    var users = [];
    
    for(var i = 0; i < databaseStore.users.length; i ++){
        
        var user = null;
        
        if(databaseStore.users[i].type === "Generic"){
            user = new GenericUser();
            user.ticketsBought = databaseStore.users[i].ticketsOwned;
        }
        
        if(databaseStore.users[i].type === "Athlete"){
            user = new Athlete();
            user.ticketsBought = databaseStore.users[i].ticketsOwned;
            user.bio = databaseStore.users[i].bio;
            user.dateOfBirth = databaseStore.users[i].dateOfBirth;
            user.profilePicUrl = databaseStore.users[i].picUrl;
            user.gender = databaseStore.users[i].gender;
            user.country = databaseStore.users[i].country;
            user.sport = databaseStore.users[i].sport;
        }
        
        if(databaseStore.users[i].type === "Manager"){
            user = new Manager();
        }
        
        if(databaseStore.users[i].type === "Security"){
            user = new Guard();
            user.eventsAssignedTo = databaseStore.users[i].assigned;
        }
        
        if(databaseStore.users[i].type === "SecurityManager"){
            user = new SecurityManager();
        }
        
        // All of users basic info.
        user.password = databaseStore.users[i].password;
        user.userName = databaseStore.users[i].userName;
        user.id = databaseStore.users[i].id;
        user.name = databaseStore.users[i].name;
        
        users.push(user);
        
    }
    
    return users;
    
}