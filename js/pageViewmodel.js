/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function PageViewModel(){

    var self = this;
    
    self.userSignedIn = ko.observable(null);
    
    self.mainViewType = "";
    
    self.sideViewType = "";
    
}


ko.applyBindings(new PageViewModel());