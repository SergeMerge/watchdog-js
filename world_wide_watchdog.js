/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * Illustrates how to display and pick Placemarks.
 *
 * @version $Id: PlacemarksAndPicking.js 3320 2015-07-15 20:53:05Z dcollins $
 */

var coordinates = [
    [37.439974, -80.859375],
    [38.788345, -86.088867],
    [40.580585, -101.469727],
    [43.992815, -116.938477],
    [41.046217, -114.301758],
    [42.682435, -103.227539],
    [42.261049, -85.561523],
    [49.724479, 30.014648],
    [49.75288, 24.477539],
    [50.34546, 28.674316],
    [48.922499, 33.376465],
    [47.739323, 35.57373],
    [48.136767, 33.134766],
    [48.850258, 29.904785],
    [49.75288, 24.675293],
    [50.680797, 27.092285],
    [50.861444, 31.618652],
    [49.482401, 34.035645],
    [47.842658, 37.001953],
    [47.724545, 34.541016],
    [48.618385, 30.454102],
    [48.136767, 37.628174],
    [48.79239, 37.595215],
    [48.980217, 38.726807],
    [49.016257, 36.518555],
    [49.05227, 33.530273],
    [48.835797, 30.695801],
    [49.418121, 30.948486],
    [50.183933, 30.234375],
    [50.057139, 29.926758],
    [50.541363, 29.73999],
    [51.013755, 32.277832],
    [51.041394, 34.453125],
    [49.993615, 34.771729],
    [48.936935, 36.117554],
    [48.334343, 35.90332],
];

requirejs(['./src/WorldWind',
        './LayerManager'],
    function (ww,
              LayerManager) {
        "use strict";

        // Tell World Wind to log only warnings.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the World Window.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        /**
         * Added imagery layers.
         */
        var layers = [
           
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            //{layer: new WorldWind.BMNGLandsatLayer(), enabled: true},
           
            //{layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
           // {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Define the images we'll use for the placemarks.
        var images = [
            "plain-black.png",
            "plain-blue.png",
            "plain-brown.png",
            "plain-gray.png",
            "plain-green.png",
            "plain-orange.png",
            "plain-purple.png",
            "plain-red.png",
            "plain-teal.png",
            "plain-white.png",
            "plain-yellow.png",
            "castshadow-black.png",
            "castshadow-blue.png",
            "castshadow-brown.png",
            "castshadow-gray.png",
            "castshadow-green.png",
            "castshadow-orange.png",
            "castshadow-purple.png",
            "castshadow-red.png",
            "castshadow-teal.png",
            "castshadow-white.png"
        ];

        var pinLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
            placemark,
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes,
            placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
            latitude = 47.684444,
            longitude = -121.129722;
        // Set up the common placemark attributes.
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
        
        // Create a layer to hold the surface shapes.
        var shapesLayer = new WorldWind.RenderableLayer("Surface Shapes");
        wwd.addLayer(shapesLayer);     
        
        // For each placemark image, create a placemark with a label.
        for (var i = 0, len = images.length; i < len; i++) {
            // Create the placemark and its label.
            placemark = new WorldWind.Placemark(new WorldWind.Position(coordinates[i][0], coordinates[i][1], 1e2), true, null);
            
            
            var attributes = new WorldWind.ShapeAttributes(null);
            attributes.outlineColor = WorldWind.Color.GREEN;
            attributes.interiorColor = new WorldWind.Color(0, 255, 0, 0.5);
            let shape1 = new WorldWind.SurfaceCircle(new WorldWind.Location(coordinates[i][0], coordinates[i][1]), getRandomInt(30000, 40000), attributes);           
            shapesLayer.addRenderable(shape1);
                        
            var attributes1 = new WorldWind.ShapeAttributes(null);                          
            attributes1.outlineColor = WorldWind.Color.YELLOW;
            attributes1.interiorColor = new WorldWind.Color(255, 255, 0, 0.5);
            let shape2 = new WorldWind.SurfaceCircle(new WorldWind.Location(coordinates[i][0], coordinates[i][1]), getRandomInt(20000, 30000), attributes1);           
            shapesLayer.addRenderable(shape2);
                          
            var attributes2 = new WorldWind.ShapeAttributes(null); 
            attributes2.outlineColor = WorldWind.Color.RED;
            attributes2.interiorColor = new WorldWind.Color(255, 0, 0, 0.5);
            let shape3 = new WorldWind.SurfaceCircle(new WorldWind.Location(coordinates[i][0], coordinates[i][1]), getRandomInt(10000, 20000), attributes2);           
            shapesLayer.addRenderable(shape3);
            
            placemark.label = "Placemark " + i.toString() + "\n"
                + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            placemarkAttributes.imageSource = pinLibrary + 'castshadow-red.png';
            placemark.attributes = placemarkAttributes;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            placemark.highlightAttributes = highlightAttributes;
            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);
        }

        // Add the placemarks layer to the World Window's layer list.
        wwd.addLayer(placemarkLayer);

        // Create a layer manager for controlling layer visibility.
        //var layerManger = new LayerManager(wwd);

        // Now set up to handle picking.

        var highlightedItems = [];

        // The common pick-handling function.
        var handlePick = function (o) {
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }

            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {
                    pickList.objects[p].userObject.highlighted = true;

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                    // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                    // If instead the user picked the placemark's image, the "labelPicked" property is false.
                    // Applications might use this information to determine whether the user wants to edit the label
                    // or is merely picking the placemark as a whole.
                    if (pickList.objects[p].labelPicked) {
                        console.log("Label picked");
                    }
                }
            }

            // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };

        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("mousemove", handlePick);

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log('Cant get location');
            }
        }

        function showPosition(position) {
            $('#latitudeInput').val(position.coords.latitude);
            $('#longitudeInput').val(position.coords.longitude);
        }

        getLocation();

        $('#location-submit').on('click', function (e) {
            e.preventDefault();
            console.log('keke');
            let currentLat = $('#latitudeInput').val();
            let currentLong = $('#longitudeInput').val();
            wwd.goTo(new WorldWind.Location(currentLat, currentLong));
            // Create the placemark and its label.
            placemark = new WorldWind.Placemark(new WorldWind.Position(Number(currentLat), Number(currentLong), 1e2), true, null);
            placemark.label = "Placemark " + i.toString() + "\n"
                + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            placemarkAttributes.imageSource = pinLibrary + 'plain-white.png';
            placemark.attributes = placemarkAttributes;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            placemark.highlightAttributes = highlightAttributes;
            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);
            wwd.addLayer(placemarkLayer);
            wwd.redraw();

            let sortedDisasters = sortDisasters(currentLat, currentLong);
            $('#table-top-disasters-body').html('');
            for (i = 0; i < 5; i++) {
                let date = new Date();
                $('#table-top-disasters-body').append(
                    '<tr>' +
                    '<td>' + date + '</td>' +
                    '<td>' + sortedDisasters[i].distance.toPrecision(4).toString() + ' km</td>' +
                    '<td>fire</td>' +
                    '<td>alert</td>' +
                    '</tr>'
                )
            }
        });
    });

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortDisasters(currentLatitude, currentLongitude) {
    let disasters = [];
    for (let j = 0; j < coordinates.length; j++) {
        let distance = getDistanceFromLatLonInKm(currentLatitude, currentLongitude, coordinates[j][0], coordinates[j][1]);
        let disaster = {
            'lat': coordinates[j][0],
            'long': coordinates[j][1],
            'distance': distance
        };
        disasters.push(disaster);
    }
    function compare(a, b) {
        if (a.distance < b.distance)
            return -1;
        if (a.distance > b.distance)
            return 1;
        return 0;
    }

    disasters.sort(compare);

    return disasters;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}