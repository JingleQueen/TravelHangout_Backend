# TravelHangout_Backend
Travel Hangout website backend

### Add New Collection

**API Endpoint**: `localhost:1999/api/collection/add`

**Form Data**: 
   
   - [x] 



### Add New Package

**API Endpoint**: `localhost:1999/api/packages/add`

**Body**:

   ```
      {
         "name": "family small",          // PackageName
         "destination": "kerala",         // Destination 
         "region": "south",               // Region      Enum <north | south | east | west>
         "interest": "",                  //
         "duration": {                    // Duration of the tour
            "days": 4,
            "nights": 5
         },
         "covers": ["Kuchipuram", "Tiruchirapalli", "Tiruvananthpuram"],   // An array of cities this package will cover
         "description": "Some special outing with your loved ones...",     // Small Description
         "price": 55000,                                                   // Price   
         "destinationType": "domestic",                                    // Enum <international | domestic>
         "destinationName": "kerala",                                      // Seems duplicate of the destination will remove in future
         "packageTypeName": "family",                                      // Package Type Name      
         "packageTypeFeaturedImage": "imageOne"                            // Package Type featured image
      }
   ```