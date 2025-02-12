async function getLocation(){
    let lat,long;
    if(navigator.geolocation){
    var data=new Promise((accept,reject)=>{
    navigator.geolocation.getCurrentPosition((data)=>{
         lat=data.coords.latitude
         long=data.coords.longitude
         accept([lat,long]);
        
    },(err)=>(console.log(err)));});
    return await data;
    }
}
async function loadMap(){
    var data= await getLocation();
    var lat=data[0];
    var long= data[1];

    var map = L.map('map').setView([lat,long], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        closePopupOnClick : false,
    maxZoom: 19,
    minZoom:3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var new_marker;

map.on('click', (e)=>{
    
    if(!new_marker){
    new_marker=L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
    new_marker.bindPopup('<form action="/post" method="get" id="newpost"><h4>Post an update</h4><image src="assets/photo.png" alt="Insert Image here" class="unset-image"> <label for="image" class="image-input primary form-label"><i class="fa-regular fa-image"></i> Add Images</label><input type="file" name="image" id="image" accept="image/*" class="form-control"><input type="text" name="title" placeholder="Your Title" class="form-control"><textarea name="description" placeholder="Post Description" class="form-control" cols="30" rows="5"></textarea><input type="submit" class="form-control btn btn-primary"></form>').openPopup();
var form=document.getElementById('newpost');

    }
    else{
        new_marker.openPopup()

        new_marker.setLatLng(e.latlng);
    }
});

}
 
document.addEventListener('load',loadMap());
