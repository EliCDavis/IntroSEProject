/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Everything stored in our database in Json format, to be loaded into databse 
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
            ticketsOwned : []
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
            country: "America",
            sport: "Swimming"
        },
        {
            id: "4e0c71a0-9fc1-4e29-8306-444faf3407f8",
            type: "Manager",
            userName: "admin",
            password: "pw",
            name: ""
        },
        {
            id: "31ee35d3-e1e2-4083-922a-7d005d82f210",
            type: "Security",
            userName: "sec",
            password: "pw",
            name: ""
        },
        {
            id: "9eb71fa3-d7f3-446b-96e7-0f445b995032",
            type: "SecurityManager",
            userName: "secadmin",
            password: "pw",
            name: ""
        }
    ],
    eventDays: [
        {
            id: "f877aa68-fa6d-4423-842a-4e6e89fc4dd6",
            name: "Start Day"  
        },
        {
            id: "46262218-1061-4f9a-903d-327d1aa52841",
            name: "August 6" 
        },
        {
            id: "da29b1e2-d588-4894-a5d0-559fbd373769",
            name: "August 7"  
        },
        {
            id: "d8f7d608-d0ce-4a69-9b0c-e0b9feae2878",
            name: "August 8"  
        },
        {
            id: "4ae8023c-2fc6-4b83-ac8c-24ee18cd3b7c",
            name: "August 9"  
        },
        {
            id: "80877917-ea7b-417f-b70f-72f41d5d72cf",
            name: "August 10"  
        },
        {
            id: "a4e5ad87-9996-423c-a7fc-3ac8b5a5ed1a",
            name: "August 11"  
        },
        {
            id: "1ede224a-8dd3-411a-b933-34c6e46336a7",
            name: "August 12"  
        },
        {
            id: "8970c61b-a851-4eea-8fb8-a66c0f938c47",
            name: "August 13"  
        },
        {
            id: "9facbaab-b617-433e-bad7-e5ce72493450",
            name: "August 14"  
        },
        {
            id: "a1947c22-f34e-45aa-bfa4-1cbed42e8394",
            name: "August 15"  
        },
        {
            id: "732977e5-4aec-43c1-b802-01382328ddbd",
            name: "August 16"  
        },
        {
            id: "90d7d06e-6ca9-4dc6-b8cd-e8453f86eb2d",
            name: "August 17"  
        },
        {
            id: "8edd0947-9cd7-48fa-a7c2-a81b3979cfc5",
            name: "August 18"  
        },
        {
            id: "edde8eae-4ca5-4f5b-9ad0-52f113c4f27b",
            name: "August 19"  
        },
        {
            id: "a8fee7fe-f7c4-46ce-8936-0b934d52d0cc",
            name: "August 20"  
        },
        {
            id: "95188bfa-7583-46c3-ad67-26f9522e422a",
            name: "Final Day"  
        }
    ],
    sports: [
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
        "Olympic Stadium"
    ]
};

function loadAllEventDays(){
    
    var days = [];
    
    for(var i = 0; i < databaseStore.eventDays.length; i ++){
        
        var eventDay = new EventDay();
        eventDay.name = databaseStore.eventDays[i].name;
        
        days.push(eventDay);
        
    }
    
    return days;
    
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