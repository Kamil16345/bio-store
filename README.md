# Welcome to bio-store app. My e-commerce app.  
  
### Application is still in development process, for now available locally.  
The purpose of this project is to build fully maintainable application where user can create account, move desired products to shopping cart, watch summary of order and make an order. In payment process I want to include external API e.g. przelewy24.  
Screenshots below.
  
### For now application is half finished, but to sum up I'll list implemented functionalities and features that I want to itroduce  
# Done so far:  
☑️ API for creating/maintaining customers and users  
☑️ API for products with dividing them into categories  
☑️ UI for created functionalities, placed on screen below  
☑️ Logic for maintaining customer shopping cart  
☑️ Basic authentication  
☑️ Connection with MongoDB and storing data  
  
# To do / to improve:  
- [x] Authorization (want to divide users to customers and maintainers)  
- [x] Better handling errors  
- [x] Provide UI for maintainer (move action with creating products from postman to UI)  
- [x] Integrate payments with external API (przelewy24)  
- [x] Write tests for application  
- [x] Deploy  
  
# Tech stack:  
Application is basically based on MERN(Mongo,Express,React,Node) stack, however I used some additional tools, like  
* Moongoose  
* Axios  
* Bootstrap  
  
Of course as I mentioned you can download this app and run it locally. When you dowload this repository, run following commands:  
npm install (both in server and client directory)  
When you install dependencies, in server directory run node index.js  
In client directory: npm start  


# API documentation
Application API is still in development process, so far it contains endpoints for maintaining customers, their shopping carts, products etc.  
To maintain application you can work with it by calling following endpoints  
Customers: https://documenter.getpostman.com/view/25265864/2s93JzMg9P  
ShoppingCarts: https://documenter.getpostman.com/view/25265864/2s93JzMg9S  
Products: https://documenter.getpostman.com/view/25265864/2s93JzMg9Q  
Categories: https://documenter.getpostman.com/view/25265864/2s93JzMg9R  
Authentication: https://documenter.getpostman.com/view/25265864/2s93JzMg56  
Product-images: https://documenter.getpostman.com/view/25265864/2s93JzMg9U  
Users: https://documenter.getpostman.com/view/25265864/2s93JzMg9W  

## Main dashboard:<br/>
![Index page: ](https://github.com/Kamil16345/bio-store/blob/master/client/src/resources/screenshots/1.png)
## Selected category:<br/>
![Index page: ](https://github.com/Kamil16345/bio-store/blob/master/client/src/resources/screenshots/2.png)
## Shopping cart:<br/>
![Index page: ](https://github.com/Kamil16345/bio-store/blob/master/client/src/resources/screenshots/3.png)
## Sign up page:<br/>
![Index page: ](https://github.com/Kamil16345/bio-store/blob/master/client/src/resources/screenshots/4.png)
## Sign in page:<br/>
![Index page: ](https://github.com/Kamil16345/bio-store/blob/master/client/src/resources/screenshots/5.png)
