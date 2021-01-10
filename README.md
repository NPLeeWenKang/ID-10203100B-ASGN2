# Personal Portfolio
Name: Lee Wen Kang<br />
Class: P03<br />
Website URL: https://npleewenkang.github.io/ID-10203100B-ASGN2/<br/>

## Todo
| Task        | Status           | Date finished  |
| ------------- |:-------------:| -----:|
| Finish README      | dne |  |
| Implement login page      | done | 9/1/2021 |
| Edit CSS tag names to be best practice      |      |    |
| Check compatibility |       |     |
| Finish badge and statistic system |       |     |
## Design Process
To ensure that my website is useful to my target audience, first I would need to determine who my intended audience and users are. This would allow me to imagein and understand their point of view /  reasons to use my website, allowing me to better design the website for them.</br>
1. As a runner, firstly, I would like to know how long my runs were. Secondly, I would like some know some basic statistics about my runs. Lastly, I would like to know the weather forecast, as this allows me to better plan when and where to run.

As my website is intended for mobile and PC view, I had to design and develop my website from a "Mobile First" perspective. This means that the mobile view is always developed first, and the PC view is developed later. To ensure the website is both mobile and PC friendly, I started developing my wireframe using Adobe Xd. This allows me to "plan" my website and ensure that the PC and mobile view were suitable and appropriate.</br>

* PC version of XD wireframe: 

* Mobile version of XD wireframe: 

As said in my last Assignment (https://github.com/NPLeeWenKang/ID_10203100B_LeeWenKang_Assg01), as a IT student, I have a personal "rule" I follow. That "rule" is to always develop bit size code and always check and ensure that they contain no errors. Same as my previous assignment, I continued to follow this "rule", allowing my to troubleshoot more easily and check errors faster. As a result, I have spent lesser time debugging, and more time writing actual code.

![development process](https://github.com/NPLeeWenKang/ID_10203100B_LeeWenKang_Assg01/blob/master/github-README-src/development-process.PNG?raw=true)
## Features
Since this is a website catered to running enthusiast, I had to develop several features that suited their use case.

### APIs and Technologies used
1. Google Maps Javascript API:</br>
https://developers.google.com/maps/documentation/javascript/overview
1. OpenWeather API:</br>
https://openweathermap.org/
1. Ipapi API:</br>
https://developers.google.com/maps/documentation/javascript/overview
4. ChartJS:</br>
https://www.chartjs.org/
5. Bootstrap:</br>
https://getbootstrap.com/

### Website
1. Tracking distance ran:</br>
This feature allows users to use Google Map to plot their route, displaying their route's total distance. After saving their route, users revisit and veiew their route.</br>
<
2. Weather forecast:</br>
By using Ipapi API to obtain the user's country, then inputing the location into the OpenWeatherMap API, the website is able to obtain the daily weather forecast and the hourly temperature.

3. Statistics:</br>
This feature allows users to view some basic information about their runs, showing them their total time spent running, average running time and total distance traveled.

4. Login using Firebase Auth:</br>
This allows users to login using their google account. Ensuring users are able to access their account from several devices.

## Testing
Testing is a vital part in progamming and website development. It ensures that what we are building works and is functional. Therefore, comprehensive testing methods has to be in place to help expose errors<br>
### Online validators
In addition to using W3School's CSS and Markup validator service, for this assignment, I also used JSHint's Javascript validator. This allows me to ensure that my codes has no errors.
1. W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/
2. W3C Markup Validation Service: https://validator.w3.org/
3. JSHint Javascript Validator:https://jshint.com/
### Screen size
To ensure that users will be able to use this website on different screen sizes, I have detailed several different methods I have used to enure that the navigation and viewability of the website is sound.
1. Resizing browser manually<br/>
By resizing the browser manually, I am able to quickly view my website in different view heights and widths. Although this may not be a full proof way to test screen sizes, it allows for quick and easy testing (testing while developing).
2. Using Chrome's mobile emulator<br/>
By inspecting the page, a button will appear. This button toggles Chrome's mobile emulator, allowing you to view the screen through different phones. This is a quick test to ensure that the contents in the screen are readable and properly aligned. However this method has several limitations, as it does not actually run the website on a mobile phone, but only simulates it. To read more about Chrome's mobile emulator: https://developers.google.com/web/tools/chrome-devtools/device-mode.
3. Using a physical phone<br/>
Apart from using the other methods to test my website in different screen size, I also used my Samsung J7 phone to view the website. This allows me to accurately experience how navigating and viewing the contents on a mobile phone feels like.
### Browsers
As HTML, CSS and JS may be compiled differently in different browsers, it is vital to test the website on different browsers. In addition to testing HTML, CSS and JS, I had to also test my APIs on different browsers to also ensure they are working perfectly.

As I developed my website on Chrome, I went and tested my website on FireFox and Microsoft Edge. This allowed me to ensure that my website was functional on different browsers. In addition, 

### APIs
As my website used Ipapi, an API that uses the user's data to obtain their location, I had to enure that the API was able to work in other countries besides Singapore. As a result, I used TunnelBear, a VPN service to simulate being in different parts of the world.

### Google API rules
As I have set Google API rules to my API keys, I had to ensure the API works even when I have pushed my code to Github.
### Firebase Database Rules
To ensure that my user's data is safe and secure, I had to implement some Database rules to ensure that only authenticated users are able to access the database. To test these rules, I had tried to access the database when I was not authenticated which successfully denied access to me.

## Credits
### Technologies Used
* HTML
* CSS
* Javascript
* Jquery
### APIs and Library
* Google Maps Javascript API: https://developers.google.com/maps/documentation/javascript/overview

* Ipapi API: https://ipapi.co/

* OpenWeatherMap API: https://openweathermap.org/

* Firebase API: https://firebase.google.com/docs/reference

* Chartjs: https://www.chartjs.org/

* Bootstrap: https://getbootstrap.com/

### Icons
* Medal Icon (flaticon): https://www.flaticon.com/free-icon/medal_2583344?term=medal&page=1&position=9&related_item_id=2583344

* Stopwatch Icon (flaticon): https://www.flaticon.com/free-icon/stopwatch_3983066?term=stopwatch&page=1&position=72&related_item_id=3983066

* Number 2 Icon (flaticon): https://www.flaticon.com/free-icon/number_179350?term=number&page=1&position=10&related_item_id=179350

* Number 3 Icon (flaticon): https://www.flaticon.com/free-icon/number_179350?term=number&page=1&position=10&related_item_id=179350

* Slot machine Icon (flaticon): https://www.flaticon.com/free-icon/losing-result-of-slot-machine_55528?term=slot%20machine%20number&page=1&position=2&related_item_id=55528

* Running man Icon (flaticon): https://www.pinterest.com/pin/312859505343736086/

* Add Icon (Bootstrap):https://icons.getbootstrap.com/icons/plus/

* View Icon (Bootstrap): https://icons.getbootstrap.com/icons/map/

* Map Icon (Bootstrap): https://icons.getbootstrap.com/icons/binoculars-fill/

* Arrow-Left Icon: https://icons.getbootstrap.com/icons/arrow-left-short/

* Arrow-Right Icon: https://icons.getbootstrap.com/icons/arrow-right-short/

* Arrow-Counterclockwise Icon: https://icons.getbootstrap.com/icons/arrow-counterclockwise/

### Guides / Tutorials

* https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api

* https://www.movable-type.co.uk/scripts/latlong.html
