# MERN Stack Recipe Book
Recipe tracking CMS built with MongoDB, Express, React, and Node.js. Images are hosted on ImgBB using its API. You can get an ImgBB API key here: https://api.imgbb.com/

## Running the app
To deploy the app you'll need to make a .env file in the root directory with the following content:

    DB="<YOUR MONGO_DB URI>"
    IMGBB_API="<YOUR IMGBB API KEY>"


You'll then need to run this command in the root directory if you want to test the app on localhost:
    
    npm run dev
