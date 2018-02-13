var searchResult = [];
$(document).ready(function(){
    /*page functionality for user interaction */
/*Tooltip out*/
        // $('.tooltipped').tooltip({delay: 50});

    //    $.ajax({
    //         type: "GET",
    //         url: "https://developer.nrel.gov/api/windexchange/schoolprojects?api_key=sjNilsJ1IndltYVv1YF1UZpXgHvLRFzg5N7SGm1P&format=JSON",
    //         dataType: "json",
    //         crossDomain: true,
    //         success: function(results){
    //             results.forEach(function(item, index){
    //                 searchResult.push({
    //                     City: $.trim(item.City), 
    //                     Latitude: item.Latitude, 
    //                     Longitude: item.Longitude,
    //                     Projects: $.trim(item.ProjectName),
    //                     Address: $.trim(item.Address),
    //                     Country: $.trim(item.CountryName),
    //                     ProjectType: item.WfSType
    //                 });  
    //             })
    //             console.log(results);
    //         }    
    //     }); //end of ajax call for data from education and training api  
        

        myMap();
    }); /*End of document*/
    
    function myMap() {
        var searchLoc;
        var searchLat;
        var searchLon;
        var markers;  
        
        var mapProp= {
            center:new google.maps.LatLng(51.508742,-0.120850),
            zoom:5,
        };

        var map=new google.maps.Map($("#googleMap")[0],mapProp);
        var contentString = "stuff";
        var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
  
          var marker = new google.maps.Marker({
            position: searchLoc,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });
        //   marker.addListener('click', function() {
        //     infowindow.open(map, marker);
        //   });
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });
        
  
                
            
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();
                            places.forEach(function(item, index){
                                searchLat = item.Latitude;
                                searchLon = item.Longitude;
                                searchLoc = new google.maps.LatLng(searchLat, searchLon);
                                markers = new google.maps.Marker({
                                    position : searchLoc,
                                    map : map 
                                });
                                markers.setPosition(searchLoc);
                        });
                        console.log(places);
                        
                        if (places.length == 0) {
                            return;
                        }
                        
                        // Clear out the old markers.
                        searchResult.forEach(function(marker) {
                                marker.setMap(null);
                            });
                            markers = [];
            
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var image = 'https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w170';
                var icon = {
                    url: image,
                    map: map,
                };
            
                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        animation: google.maps.Animation.DROP,
                        position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            map.fitBounds(bounds);

        });
        
    }; 
