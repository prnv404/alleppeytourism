export interface BlogPost {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    slug: string;
    image: string;
    content: string;
}

export const blogs: BlogPost[] = [
    {
        title: 'Top 10 Things to Do in Alleppey Backwaters',
        excerpt: 'Discover the best activities and attractions in Alleppey, from cruising on a traditional houseboat to kayaking through narrow canals.',
        category: 'Travel Guide',
        date: 'February 15, 2026',
        slug: 'top-10-things-to-do-in-alleppey-backwaters',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
        content: `
      <h2>1. Cruise in a Traditional Houseboat (Kettuvallam)</h2>
      <p>The quintessential Alleppey experience involves renting a houseboat. Once used as cargo boats, these Kettuvallams are now luxurious floating hotels complete with bedrooms, dining areas, and viewing decks. Drift along the serene backwaters, completely immersed in the peaceful surroundings of palm-fringed canals, small villages, and expansive paddy fields.</p>

      <h2>2. Explore Narrow Canals on a Shikara</h2>
      <p>While houseboats stick to wider channels, a Shikara (traditional wooden boat) can navigate the narrower, more intimate canals. This offers a closer look at village life, local fishing techniques, and beautiful small bridges.</p>

      <h2>3. Sunset Kayaking</h2>
      <p>For the active traveler, kayaking is a fantastic way to explore the backwaters at your own pace. A sunset kayaking session allows you to witness the sky change colors accompanied by the chorus of birds settling down for the night.</p>

      <h2>4. Taste Local Delicacies</h2>
      <p>No trip to Alleppey is complete without trying the local Kerala cuisine, particularly the fresh seafood. Karimeen Pollichathu (pearl spot fish roasted in banana leaves) and Kappa (tapioca) with fish curry are absolute must-tries.</p>
    `,
    },
    {
        title: 'Choosing the Right Houseboat: A Comprehensive Guide',
        excerpt: 'Find out how to choose the perfect houseboat for your Alleppey trip, understanding the differences between deluxe, premium, and luxury options.',
        category: 'Houseboats',
        date: 'January 28, 2026',
        slug: 'choosing-the-right-houseboat',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666cf4?q=80&w=2000&auto=format&fit=crop',
        content: `
      <h2>Understanding Houseboat Categories</h2>
      <p>When booking a houseboat in Alleppey, you'll generally find three main categories. Understanding the difference is key to having the best experience possible that matches your budget and expectations.</p>

      <h3>Deluxe Houseboats</h3>
      <p>These are the standard houseboats. They come with basic amenities, air conditioning usually operating only during nighttime (9 PM to 6 AM), and standard food menus. Excellent for budget travelers who want to experience the backwaters without burning a hole in their pockets.</p>

      <h3>Premium Houseboats</h3>
      <p>Premium boats offer better interiors, higher quality furnishings, and better service. The air conditioning is usually available full-time (whenever you are in the room), and the food menus are often more varied and customizable.</p>

      <h3>Luxury / Super Luxury Houseboats</h3>
      <p>For those looking for the ultimate pampering, luxury boats offer glass-covered upper decks, 24/7 central air conditioning, top-tier professional chefs out of premium hotels, and sometimes even a jacuzzi. These resemble 5-star hotel suites floating on water.</p>

      <h2>Tips for Booking</h2>
      <p>Always ask for actual photos of the boat before booking. Check if it's a private boat or a sharing one, and ensure you clear up any dietary requirements beforehand.</p>
    `,
    },
    {
        title: 'The Best Time to Visit Kerala Backwaters',
        excerpt: 'Learn about the best seasons to visit Alleppey and experience the beauty of the backwaters without weather disruptions.',
        category: 'Travel Tips',
        date: 'December 10, 2025',
        slug: 'best-time-to-visit-kerala-backwaters',
        image: 'https://images.unsplash.com/photo-1549479350-f8f4a13f64ff?q=80&w=2000&auto=format&fit=crop',
        content: `
      <h2>Peak Season: Winter (October to February)</h2>
      <p>This is universally considered the best time to visit Alleppey. The weather is cool, dry, and pleasant. The temperature ranges between 17°C and 32°C. It’s perfect for exploring the canals, enjoying houseboat rides, and walking around the villages.</p>

      <h2>Shoulder Season: Summer (March to May)</h2>
      <p>Summers in Kerala can be quite hot and humid, with temperatures easily reaching up to 37°C. While daytime cruises might be a bit uncomfortable, the evenings are still pleasant. The advantage? You'll find fewer crowds and significant discounts on houseboat rentals.</p>

      <h2>Off-Season (But Magical!): Monsoon (June to September)</h2>
      <p>The monsoon transforms the backwaters into a lush, vibrant green paradise. Heavy rainfall is common, which might restrict some outdoor activities like kayaking or shikara rides. However, staying on a covered houseboat while the rain pours over the backwaters is an incredibly romantic and serene experience. Plus, this is the prime time for Ayurvedic treatments, which are said to be most effective during the monsoons.</p>
    `,
    },
];
