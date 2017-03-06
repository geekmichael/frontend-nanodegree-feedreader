/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        // Two variables for marking whether specific attribute is defined and filled
        var attributeDefined, attributeFilled;

        beforeEach(function(){
            attributeDefined = true;
            attributeFilled = true;
        });

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have attribute "URL" defined and filled for each feed', function(){
             allFeeds.forEach(function(feed){
                 if (attributeDefined && (typeof feed.url === 'undefined')) {
                     attributeDefined = false;
                 };
                 if (attributeFilled && (!feed.url)){
                    attributeFilled = false;
                 };
             });
             expect(attributeDefined).toBe(true);
             expect(attributeFilled).toBe(true);
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have attribute "name" defined and filled for each feed', function(){
             allFeeds.forEach(function(feed){
                 if (attributeDefined && (typeof feed.name === 'undefined')) {
                     attributeDefined = false;
                 };
                 if (attributeFilled && (!feed.name)){
                    attributeFilled = false;
                 };
             });
             expect(attributeDefined).toBe(true);
             expect(attributeFilled).toBe(true);
         });
    });


    /* This is a new test suite named "The menu" */
    describe('The menu', function(){
        // A variable to store the menu icon element
        var menuIcon;
        /* This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default because of the menu-hidden class', function(){
            // Use jQuery function hasclass to determine whether "body" is assigned the menu-hidden class
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when the menu icon is clicked', function(){
             menuIcon = $('.menu-icon-link');
             // Trigger the click event
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
          });

      });
    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0, done);
        });
        /* This a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have loaded with at least one .entry element', function(done){
            expect($('.feed-list').length).not.toBe(0);
            done();
        });
     });
    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var firstFeed = '',
            secondFeed = '';

        beforeEach(function(done){
            loadFeed(0, function(){
                // Save the current content into firstFeed
                firstFeed = $('.feed').html();
                loadFeed(1, function(){
                    // Get the new feed and save into secondFeed
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('is loaded by the loadFeed function that the content actually changes', function(done){
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
     });
}());
