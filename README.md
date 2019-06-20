# ChicagoRestaurantInspections

Steps: 
1) Run python refeshdb.py to make sure the folder structure and db files doesn not exist and then to download the database copy from the city of chicago website.

2) Run python app.py for the flask application to run

What we are doing?
- Chicago is known as the food hub for this country. The food scene here is pretty lit! There are number of restaurants operating in this country. The turnover is pretty high and so are the costs to run a restaurant. This keeps all restaurant owners at the edge of the seat. Apart from good food, they are also subject to regular inspections. This map identifies the locations and restaurants inspected, alongwith their statuses. 

Wishlist and trouble points:

- Integrate walkscore heatmap: This was running fine on our local but created issues with the flask app. Hopefully we will be able to do part 2 to explore that.

- Layer control for various years: We had data from year 2011 to 2019. We have filtered out 2018 to show the beahvaiour. However, we would have loved to include 2016 - 2019 data with control layers on leaflet to toggle on or off. That will give a good idea of the situation flow.

- Deploying on Heroku: Still struggling with this!

- Walkscore save on cache to overcome limit of free API code



Few reference links for "theory" part:
1) https://chicago.github.io/food-inspections-evaluation/
2) 

