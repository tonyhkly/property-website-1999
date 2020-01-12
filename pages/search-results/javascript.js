console.log('Search Results Page JavaScript');

$("body").mousemove(function (event) {
    var eye = $(".eye");
    var x = (eye.offset().left) + (eye.width() / 2);
    var y = (eye.offset().top) + (eye.height() / 2);
    var rad = Math.atan2(event.pageX - x, event.pageY - y);
    var rot = (rad * (180 / Math.PI) * -1) + 180;
    eye.css({
        '-webkit-transform': 'rotate(' + rot + 'deg)',
        '-moz-transform': 'rotate(' + rot + 'deg)',
        '-ms-transform': 'rotate(' + rot + 'deg)',
        'transform': 'rotate(' + rot + 'deg)'

    });
});

async function search() {
    console.log('search....');
    const searchLocation = document.querySelector('.searchLocation');

    console.log(searchLocation.value);

    const response = await fetch(`/api/_search?channel=BUY&locationIdentifier=REGION^${searchLocation.value}`);
    console.log(response);
    const result = await response.json();

    console.log(result);
    
    console.log('doing property content');
    const propertyList = document.querySelector('.content');
    propertyList.innerHTML = `<h1 class='resultTitle'>${result.searchParametersDescription}</h1>`;
    const propertyCardTemplate = document.querySelector('#propertyCardTemplate');

    result.properties.map(property => {
        console.log(property.propertyTypeFullDescription);

        const propertyCard = propertyCardTemplate.cloneNode(true);
        propertyCard.style.display = "block";
        
        console.log('doing property image');
        const propertyImage = propertyCard.querySelector('.propertyImage');
        propertyImage.src = property.propertyImages.mainImageSrc;

        console.log('doing property price');
        const propertyPrice = propertyCard.querySelector('.propertyPrice');
        propertyPrice.innerHTML = property.price.displayPrices[0].displayPrice;

        console.log('doing property address');
        const propertyAddress = propertyCard.querySelector('.propertyAddress');
        propertyAddress.innerHTML = property.displayAddress;

        console.log('doing property summary');
        const propertySummary = propertyCard.querySelector('.propertySummary');
        propertySummary.innerHTML = property.summary;

        propertyList.appendChild(propertyCard);
    });
};



