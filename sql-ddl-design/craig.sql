-- Design a schema for Craigslist! Your schema should keep track of the following

-- - The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
-- - Users and preferred region
-- - Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
-- - Categories that each post belongs to

-- ###

drop database if exists craigslist;

create database craigslist;

\c craigslist

create table regions
(
    id serial primary key,
    region text not null;
)

create table users
(
    id serial primary key,
    first_name text not null,
    last_name text not null,
    preferred_region integer references regions (id);
)

create table categories
(
    id serial primary key,
    category text not null;
)

create table posts
(
    id serial primary key,
    title text not null,
    content text not null,
    owner_id integer references users (id),
    region_id integer references regions (id);
)

create table post_category
(
    id serial primary key,
    post_id integer references posts (id),
    category_id integer references categories (id);
)


insert into regions (region)
values
('Tokyo'),
('New York City'),
('London'),
('Beijing'),
('Mumbai'),
('Paris'),
('Istanbul'),
('Rio de Janeiro'),
('Moscow'),
('Cairo'),
('Sydney'),
('Cape Town'),
('Mexico City'),
('Seoul'),
('Berlin'),
('Buenos Aires'),
('Toronto'),
('Dubai'),
('Bangkok'),
('Nairobi'),
('Los Angeles'),
('Shanghai'),
('Rome'),
('Delhi'),
('Amsterdam'),
('Jakarta'),
('Singapore'),
('San Francisco'),
('Dublin'),
('Copenhagen'),
('Lisbon'),
('Barcelona'),
('Munich'),
('Cape Town'),
('Stockholm'),
('Vienna'),
('Hanoi'),
('Wellington'),
('Bogotá'),
('Oslo'),
('Johannesburg'),
('Helsinki'),
('Montreal'),
('Panama City'),
('Prague'),
('Warsaw'),
('Budapest'),
('Athens'),
('Vancouver'),
('Kyoto'),
('Lima'),
('Kuala Lumpur'),
('Zurich'),
('Casablanca'),
('Reykjavik');

insert into users (first_name, last_name, preferred_region)
values
('Emily, Johnson, 32'),
('David, Smith, 38'),
('Samantha, Martinez, 22'),
('Daniel, Anderson, 48'),
('Olivia, Taylor, 2'),
('Matthew, Brown, 8'),
('Sophia, Hernandez, 21'),
('William, Davis, 16'),
('Ava, Wilson, 16'),
('Christopher, Lee, 27'),
('Emma, Miller, 35'),
('Michael, Thompson, 47'),
('Isabella, White, 1'),
('Ethan, Hall, 38'),
('Mia, Robinson, 53'),
('Alexander, Garcia, 35'),
('Abigail, Thomas, 11'),
('Ryan, Martin, 7'),
('Madison, Clark, 16'),
('Nathan, Lewis, 44'),
('Chloe, Turner, 11'),
('Jacob, Walker, 24'),
('Grace, Adams, 14'),
('Benjamin, Carter, 49'),
('Lily, Baker, 2'),
('Samuel, Green, 26'),
('Aria, Hill, 39'),
('Jayden, Foster, 43'),
('Zoey, Allen, 17'),
('Isaac, Mitchell, 48');

insert into categories (category)
values
('Electronics'),
('Furniture'),
('Clothing & Accessories'),
('Home Appliances'),
('Sporting Goods'),
('Apartments/Houses for Rent'),
('Real Estate for Sale'),
('Roommates'),
('Local Artisan Market'),
('Bike for Sale'),
('Book Club'),
('Housing Wanted'),
('Community Event'),
('Roommate Wanted'),
('Volunteer Opportunity'),
('Guitar Lessons'),
('Job Opportunity'),
('Car for Sale'),
('Language Exchange'),
('Apartment Rental'),
('Fitness Equipment'),
('Furniture Sale'),
('Photography Services'),
('Tech Support Services'),
('Free Stuff'),
('Lost Pet'),
('Local Band Gig'),
('Missed Connections'),
('Dating'),
('Pet Adoption'),
('Pet Services'),
('Lost & Found Pets'),
('Cars & Trucks'),
('Motorcycles'),
('RVs & Campers'),
('Boats'),
('Parts & Accessories'),
('Free Items'),
('Garage Sales'),
('Giveaways'),
('General Discussion'),
('Rants & Raves'),
('Politics'),
('Technology');

insert into posts (title, content, owner_id, region_id)
('**Furniture Sale: Elegant Leather Sofa - $500**', 'Moving sale! Selling a beautiful, gently used leather sofa in excellent condition. Dimensions: 80" x 36". Must pick up.', 16, 5),
('**Job Opportunity: Part-time Barista**', 'Local coffee shop seeking a friendly and experienced barista for weekend shifts. Competitive pay. Send resume and availability.', 7, 20),
('**Apartment Rental: Cozy 1BR Downtown - $1200/month**', 'Charming 1-bedroom apartment available for rent in the heart of downtown. Close to shops and public transportation. No pets. Utilities included.', 5, 39),
('**Free Stuff: Moving Out, Everything Must Go!**', 'Giving away furniture, kitchenware, and more for free. First come, first served. Pickup only. Check the list in the ad.', 7, 39),
('**Guitar Lessons: Experienced Instructor**', 'Learn to play the guitar with a patient and skilled instructor. All levels welcome. Flexible scheduling. First lesson free!', 12, 32),
('**Community Event: Charity 5K Run This Saturday**', 'Join us for a charity run to support a local cause. Registration starts at 8 AM. All fitness levels welcome. Family-friendly event.', 2, 11),
('**Electronics: 55" Smart TV - Like New - $400**', 'Selling a high-quality smart TV with built-in streaming apps. Perfect condition. Comes with remote. Cash only. Pickup required.', 16, 32),
('**Lost Pet: Missing Cat - Reward Offered**', 'Our beloved cat, Whiskers, went missing yesterday. She is grey with green eyes. If found, please contact us. Reward offered.', 2, 20),
('**Housing Wanted: Responsible Couple Seeking 2BR Apartment**', 'Young professionals looking for a 2-bedroom apartment. Clean, non-smokers, and pet-free. Budget up to $1500/month. References available.', 18, 43),
('**Car for Sale: 2018 Honda Civic - Low Mileage - $15,000**', 'Well-maintained Honda Civic for sale. Low mileage, one owner. Clean title. Contact for more details and to schedule a test drive.', 14, 30),
('**Local Artisan Market: Handmade Crafts and Gifts**', 'Visit our weekend market featuring local artisans and their handmade crafts. Unique gifts, jewelry, and home decor. Open from 10 AM to 4 PM.', 18, 2),
('**Language Exchange: English Speaker Seeking Spanish Practice**', 'Looking for a language exchange partner to practice Spanish. In exchange, I can help you improve your English. Coffee meetups preferred.', 11, 3),
('**Fitness Equipment: Treadmill for Sale - $300**', 'Selling a gently used treadmill in excellent condition. Multiple speed settings and incline options. Foldable for easy storage. Pickup required.', 8, 38),
('**Volunteer Opportunity: Community Clean-up Day**', 'Join us in making our community cleaner and greener! Volunteer for a clean-up day on Saturday. Gloves and trash bags provided.', 7, 22),
('**Tech Support Services: Computer Repair and Troubleshooting**', 'Experienced IT professional offering computer repair and troubleshooting services. Fast and reliable. Contact for a free consultation.', 10, 24),
('**Book Club: Monthly Meetings for Literature Lovers**', 'Join our book club for lively discussions about a variety of genres. Meetings held every third Thursday of the month at the local library.', 19, 33),
('**Roommate Wanted: Spacious 2BR Apartment - $800/month**', 'Seeking a responsible and friendly roommate to share a 2-bedroom apartment. Clean and quiet living space. Utilities split evenly.', 3, 6),
('**Bike for Sale: Mountain Bike - Excellent Condition - $350**', 'Selling a well-maintained mountain bike with front suspension. Great for trails or commuting. Helmet included. Cash only.', 17, 3),
('**Local Band Gig: Live Performance This Friday Night**', 'Come enjoy live music by a local band at the Greenfield Pub this Friday night. No cover charge. Support local talent!', 9, 16),
('**Photography Services: Professional Portraits and Events**', 'Capture your special moments with our professional photography services. Specializing in portraits, events, and family photography. Contact for rates and availability.', 13, 37);

insert into post_category (post_id, category_id)
values
('11, 9'),
('18, 10'),
('16, 11'),
('9, 12'),
('6, 13'),
('7, 1'),
('17, 14'),
('14, 15'),
('5, 16'),
('2, 17'),
('10, 18'),
('12, 19'),
('3, 20'),
('13, 21'),
('1, 22'),
('20, 23'),
('15, 24'),
('4, 25'),
('8, 26'),
('19, 27');
