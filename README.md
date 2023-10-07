READ ME
# App deployed with Cyclic: https://easy-ruby-viper-cape.cyclic.cloud
# B2B Grocery Store POS System

A Point of Sale (POS) system tailored for B2B use, primarily targeting grocery stores. This system provides a user-friendly interface for managing products, shopping carts, and payment processing.

## Features

1. **Display Categories and Products:**
   - Categories are presented in a horizontal scrollable section.
   - Products are dynamically displayed based on the selected category.

2. **Shopping Cart:**
   - Easily manage the shopping cart by adding/removing items and updating quantities.
   - The cart is conveniently displayed in a popup with an option to proceed to checkout.

3. **Checkout:**
   - Seamlessly navigate the checkout process, including the application of discounts.
   - A success popup confirms the successful completion of the transaction.
   - Allows for discount codes (in this case, you can try the code WELCOME10!)

4. **Payment Processing:**
   - Support for various payment methods, including card and cash.
   - Dedicated popups for card and cash payments, each with distinct functionalities.
   - Options to print receipts and close orders in the cash payment popup.

5. **Search Functionality:**
   - A search form and input are provided for user convenience, though the handling of the search functionality is not included in this snippet.

6. **Event Listeners:**
   - Comprehensive event listeners are set up for buttons, forms, and popups to ensure smooth user interactions.

7. **Initialization:**
   - The script concludes with an initialization section that showcases categories and products for an intuitive user experience.

## Installation

To get started with the B2B Grocery Store POS System, follow these steps:

1. Fork the Repository:
Click the "Fork" button at the top right corner of this repository's page. This will create a copy of the project in your GitHub account.

2. Clone the Repository:
Open your terminal and navigate to the directory where you want to store the project.
Use the following command to clone the repository to your local machine, replacing <your-username> with your GitHub username:
$ git clone https://github.com/seetha1730/B2B-Grocery-POS-System.git

3. Navigate to the Project Directory:
Enter the project directory using the following command:
$ cd B2B-Grocery-POS-System

4. Install Dependencies:
To install the necessary dependencies for the project, run:
$ npm install

Start the Application:
After the installation is complete, start the application with the following command:
$ npm start

5. Access the Application:
Open your web browser and navigate to http://localhost:3000 to access the B2B Grocery Store POS System.

Now you have the project up and running locally, ready to manage your grocery store's point of sale system. Enjoy using the system, and feel free to customize it according to your specific needs.
 
## Usage

The B2B Grocery Store POS System provides three user profiles, each with distinct privileges:

1. Admin:
Admins have full control over the system.
They can create product and category cards, modify them as needed, manage inventory, and access all system functionalities.
Use the following access credentials to log in as an Admin:
Email: admin@admin.com
Password: admin123

2. Cashier:
Cashiers have limited access and can only add products to the shopping cart and process transactions.
They cannot create or modify product/category cards.
Use the following access credentials to log in as a Cashier:
Email: seetharaj1990@gmail.com
Password: 3JUfZLfThF

4. Customer:
Customers have the most limited access, primarily for security purposes.
They cannot access any administrative or cashier functionalities.
Use the following access credentials to log in as a Customer:
Email: customer1@gmail.com
Password: Customer123

Logging In:
Visit the application by opening your web browser and navigating to http://localhost:3000 after starting the application as described in the Installation section.
You will be presented with a login screen.
Choose the appropriate user profile you'd like to test (Admin, Cashier, or Customer).
Enter the corresponding email and password based on the user profile you selected.
Click the "Login" button to access the system with the specified role.

Feel free to explore the system using the provided user profiles and credentials to understand how each role interacts with the B2B Grocery Store POS System. 

## License

This project is licensed under the [Your License Here] License - see the [LICENSE.md](LICENSE.md) file for details.

## Credits

Contributors: Seetha Lakshmi, Lea Monsenego. 
Special thanks to Diogo Barros and Maik Schmidt.

## Contact Information

For any question or queries, please contact: seetharaj1990@gmail.com or lea.monsenego@gmail.com

