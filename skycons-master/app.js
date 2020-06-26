window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSpan = document.querySelector(".temperature degree-section span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat, long)
            const proxy = "https://cors-anywhere.herokuapp.com";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            console.log(api)
            fetch(api)
                .then(res => { return res.json() })

                .then((data) => {
                    console.log(data)
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature
                    temperatureDescription.textContent = summary
                    locationTimeZone.textContent = data.timezone
                    let celsius = (temperature - 32) * (5 / 9);
                    setIcons(icon, document.querySelector(".icon"));
                    temperatureSpan.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius)
                        } else {
                            temperatureSpan.textContent = "F";
                        }
                    })
                })
        })
    }
    function setIcons(icon, iconID) {
        const Skycons = new Skycons({ color: white });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        Skycons.play()
        return Skycons.set(iconID, Skycons[currentIcon])
    }



})