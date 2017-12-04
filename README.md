# PragmaBrewery Code Challenge


## Getting started with source code
If you are contributing to this project, please pay close attention on the sub topics below.

If you are only interested in understanding the purpose of this purpose and the details of its solutions,
jump straight to the [Solution Overview](#solution-overview) section.


### Architecture
This solution is built on top of a JavaScript stack, with a NodeJS app simulating the sensors' controller and
the frontend with Angular 5 framework.

The decision to make it a containerised application is to leverage its benefit of being able to quickly launch
the application in any environment. No hassle to install a bunch of dependencies only to see it running.
 

#### Temperature Sensors Controller
* NodeJS + Express
* Karma + Chai
* Istanbul (coverage) 


#### Frontend
* Angular 5
* Karma + Jasmine (unit tests)
* Protractor (e2e)
* Istanbul (coverage) 
 

### Prerequisites - Developers (MacOS)
* Brew:
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
* Git
    ```
    brew install git
    ```
* Yarn
    ```
    brew install yarn
    ```
* Node 9.2.0
    ```
    brew install n
    n 9.2.0
    ```
* Angular CLI
    ```
        yarn global add @angular/cli
    ```
* [Docker](https://www.docker.com/docker-mac)
* (Optional) [Kitematic](https://kitematic.com/)


### Spinning up application (Docker)
Make sure you have [Docker](https://www.docker.com/docker-mac).

If you have installed Kitematic, run the command below and check the logs for each container separately.
```
docker-compose up -d
```

### General Guidelines when contributing


#### 1. Write tests then code
Writing the unit tests first will help you think through your problem and how to solve it better.


#### 2. Think through the integration tests
Write new integration tests or extend the existing ones to accommodate your work.
 

#### 3. Follow the code style
Have a good IDE that will enforce the code style. If you don't, frequently check the ES/TS linter.


#### 4. All tests green? Make your code shine - Refactoring time!
Make sure you are proud of your work:
* Look for commented out code and get rid of it
* Add comments in complex areas (can you make it simpler?)
* Update documentation when needed, specially this very same document here.


#### 5. Repeat
 


## Solution Overview
The solution will be thoroughly described in the topics below.

In summary, it will emulate temperature sensors that will be monitored in a dashboard mobile application.
The sensors have been emulated to create a chaotic scenario, otherwise the dashboard would seldom change.

It is possible to specify the likelihood of temperature variance and also the range of where it can vary to.
An an example, the sensor that monitors the Pilsner has been set to have a variance likelihood of 60%.
It means that all the time a new measurament is taken, there is a 60% that it will very.

When it happens and the temperature do change, it will be vary up/down to 10% from its current value. 

Finally, the frontend will poll the new measurements every 5 seconds,
which may lead the temperatures to change with the same frequency.

The dashboard will present 3 possible status for each beer:
   * OK: The temperature is under control.
   * Alert: The temperature is close to fall out of range.
   * Endangered: The temperature is out of range;

### Assumptions


#### User Experience / Interaction
Given that the application will be used almost 100% of the cases when Shane is driving,
the user experience must cather for that, avoiding whenever possible the need of physical
interaction with the user (click, drag, inputs, etc.).

The application must provide clear and simple visual information.

The application must be mobile friendly.


#### Limited Connectivity
Shane lives in a rural area, and will be driving all over Sydney while using the application.
It means that he won't have reliable internet connection at all times.
  
Therefore, the application must not depend on internet connectivity in order to monitor the sensors. Additionally, 
the sensors must have sizable self-storage capacity to store the measurement logs for at least one week.


### Questions and Answers
Shane has provided further details of the scope of the application, clarified hardware specifications and also 
his expectations on what needs to be achieved with this solution. The questions and answers are recorded below:

* Question 1 - What are the sensor specifications?

    Sensors are not very precise (0.5 degrees variance), however they are scalable and have their own 
    connectivity infrastructure. They work with a master/slave system, with a controller managing and
    recording the logs of all sensors connected to it. Each beer container will have a slave sensor in it
    and the master (controller) can be anywhere in the truck.

* Question 2 - How does the controller transmit the measurements?
    The controller has a bluetooth connectivity.
    It's only needed to connect with a mobile device to have access to the logs.

* Question 3 - Is there a system where the orders and inventory are managed?
    Is there an API available to retrieve such information?

    Yes, there is a inventory and orders management system.
    However, it won't be necessary for the first version of the application as it must be made 
    available as soon as possible. Our clients have complained of product spoilage due the temperature variance
    and it needs to be solved immediately.

* Question 4 - Among the main factors that cause the beer temperatures fall out of range,
    is there one that causes the most impact?
    
    Absolutely. The elevated amount of time spent to unload the truck is our major problem.
    It is slowing down our deliveries as well, as for each customers the beers need to be picked up from each container.
    The delivery slowness is a blocker for our plans to expand the brand.



## Solution Highlights
* The solution has been thoroughly designed to tackle real problems - such as: limited user interactivity and unreliable connection -
  and hence come up with an optimal solution.
* It has been planned in phases: at first, it accomplishes its purpose by solving the problem in question.
  Furthermore, it proposes a ground breaking change in the process (check [Future release](#future-release)).
  The solution is not limited to tackle solely what has been requested.
  The problem faced was thoroughly analysed in order to come up with 


## Coming soon (v2.0)
The following are the main requirements of the version 2 of the application:


### Turn it into a Progressive Web Application
The reason is to leverage what a PWA has to offer:
  * Notifications: It will be able to notify if any beer falls out of range even if the application
  is not current in use.
  * Offline Support: Create capability to temporarily store generated information that can be synchronised 
  will back office once internet is available again.
  * Add to Home Screen: This way it won't be necessary to keep a tab open in the browser anymore.
  It is also easier to access it and creates a better user experience.   


### Redesign UI
* Create an UI that will better reflect the brand.
* Make sure it is compatible for all screen resolutions (mobile, tablet, desktop and even wearables).


### Increase Test Automation Coverage
Create integration tests with sensor controller.
Create end to end tests for the dashboard.


### Create CI/CD Strategy
Create Continuous delivery strategy that will enforce quality (hooks with linter, tests, etc.).
Create environments and respective deployment strategies.

### Integration with back office
Being able to integrate with the back office system will create a myriad of possible new features.
However, the initial integration will only retrieve order and respective product information.


## Future Release
A new process has been proposed to Shane in order to solve the current logistic issues
(it has been previously detailed in question 4 of the Q and A section of this document).

In the current catalog of beers offered by PragmaBrewery,
there is only the Stout that don't have 5 degrees within the ideal temperature range.

Shane has confirmed that Stout are sold only during the winter months and represent only 2% ot the total sales.

The suggestion is to redesign the truck container in order to have only one division for all beers apart
from the Stout that will have its own small container.
 
 With the new layout, it is possible to pack and organise the beers by order/customer,
 which will eliminate the time spent to pick each type of beers for each delivery.
 Moreover, it will reduce the time spent to load/unload the truck, mitigating the temperature variance.
 
 Shane is delighted with the suggested process and has already calculated that he will
 have the return of investment of re-designing the truck within 4 months. 
