const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
var modalWindows = [];

//Hanle all fetch requests 
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }

}
async function getUsers(url) {
    const usersJSON = await getJSON(url);
    
    return usersJSON.results;
    
}

console.log(getUsers(url)); //test ok


//We need to build the HTML to display the photos on our page
//loop through the data with the foreach method. Assign html elements and insert info to each user.
function displayUsers(data) {
    data.forEach((user, index) => {
           
        const card = document.createElement('div');
        card.className = 'card';

          var  userHTML = '<div class="card-img-container">';
             userHTML += '<img class="card-img"';
             userHTML += 'src = "' + user.picture.large + '" alt="profile picture">'
            userHTML+='</div>';
        
        //additional info
            userHTML += '<div class="card-info-container">';
            userHTML += '<h3 id="name" class="card-name cap">';
            userHTML += user.name.first + ' ' + user.name.last;
            userHTML += '</h3>';
            userHTML += '<p class="card-text">';
            userHTML += user.email;
            userHTML += '</p>';
            userHTML += '<p class="card-text cap">';
            userHTML += user.location.city;

        
        card.innerHTML = userHTML;
        gallery.append(card);      

//Create modal window elements and insert user info
        const modal = document.createElement('div');
        modal.className = 'modal-container';
        
        var modalHTML = '<div class="modal">';
        modalHTML += '<button type="button" id="modal-close-btn" class="modal-close-btn">';
        modalHTML += '<strong>';
        modalHTML += 'X';
        modalHTML += '</strong>';
        modalHTML += '</button>';
        modalHTML += '<div class="modal-info-container">';
        modalHTML += '<img class="modal-img" src="' + user.picture.large + '" alt="profile picture">';
        modalHTML += '<h3 id="name" class="modal-name cap">';
        modalHTML += user.name.first + ' ';
        modalHTML += user.name.last;     
        modalHTML += '</h3>'; 
        modalHTML += '<p class="modal-text">';
        modalHTML += user.email + '</p>';  
        modalHTML += '<p class="modal-text cap">';
        modalHTML += user.location.city + '</p>';  
        modalHTML += '<hr>';  
        modalHTML += '<p class="modal-text">';
        modalHTML += user.phone;
        modalHTML += '</p>';   
        modalHTML += '<p class="modal-text">';
        modalHTML += user.nat + ', ';
        modalHTML += user.location.postcode;
        modalHTML += '</p>';     
        modalHTML += '<p class="modal-text">';
        modalHTML += 'Birthday: ';
        modalHTML += regexBirtday(user.dob.date);
  
        modal.innerHTML = modalHTML;
        modalWindows.push(modal);
        
        //When clickevent on a userprofile
        card.addEventListener('click', function() {
            //Show modal window
            gallery.appendChild(modalWindows[index]);
            
            //user clicks 'X' -> call controller, remove the modal window
            controller(index);
            
            });



    }); //end of forEach (displayUsers)
    
} //end of displayUsers


function controller(index) {
    const closeButton = document.getElementById('modal-close-btn');
    const modalContainer = document.querySelector('.modal-container');
    
    closeButton.addEventListener('click', function() {
        
    modalContainer.remove();
        
    });
}

//Transform from YYYY-MM-DD to MM/DD/YYYY
//https://omaticsoftware.freshdesk.com/support/discussions/topics/28000007756
// .*  ->  any number of any characters
function regexBirtday(date) {
    const regex =  /(\d{4})-(\d{2})-(\d{2}).*/;
    return date.replace(regex, '$2/$3/$1');
}


getUsers(url)
    .then(data => displayUsers(data))
    .catch( e => {
    gallery.innerHTML = "<h3>error!</h3>";
    console.error(e);
    });
    

