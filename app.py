import os
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func

from flask import Flask, jsonify, render_template
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
import refreshdb

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/ChicagoRestaurants.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Restaurants = Base.classes.RestaurantData

def create_app():
  app = Flask(__name__)
  Bootstrap(app)

  return app

@app.route("/")
def index():
    
    title = "Eat Well!"
    paragraph = ["Chicago, with it's many restaurants and turnover is a food hub. Do they serve good food? Check yelp reviews. Do they serve clean food? Check us!"]
# try:
    return render_template("index.html", title = title, paragraph=paragraph)
# except Exception, e:
#         return str(e)

@app.route("/plotA")
def plota():
    
    title = "Eat Well!"
    paragraph = ["Chicago, with it's many restaurants and turnover is a food hub. Do they serve good food? Check yelp reviews. Do they serve clean food? Check us!"]
# try:
    return render_template("page1a.html", title = title, paragraph=paragraph)

@app.route("/plotB")
def plotb():

    title = "Eat Well!"
    paragraph = ["Chicago, with it's many restaurants and turnover is a food hub. Do they serve good food? Check yelp reviews. Do they serve clean food? Check us!"]
# try:
    return render_template("page1b.html", title = title, paragraph=paragraph)


######################################################################
#############         SHOW ME ALL OF THE COLUMNS I CAN GET  ##########
######################################################################


@app.route("/AvailableColumns")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Restaurants).statement
        #stmt = db.session.query(Restaurants).statement

    df = pd.read_sql_query(stmt, db.session.bind)
    return jsonify(list(df))

######################################################################
####################            SHOW ME ALL OF THE DATA   ############
######################################################################

@app.route("/data")
def RestaurantList():

    #available columns:  ["id","Name","DBA","identifier","Type","Risk","Street","City",\
    # "State","Zip","Date","Inspection","Success","Description","Lat","Lng"]
    results = db.session.query(Restaurants.Name, Restaurants.DBA, Restaurants.Type, Restaurants.Street, Restaurants.City, \
        Restaurants.State, Restaurants.Date, Restaurants.Inspection, Restaurants.Success, Restaurants.Description, \
            Restaurants.Lat, Restaurants.Lng, Restaurants.Year).all() #change this to  ".all()" to retrive all the data
            #Note-- the year function returns Null when adding strftime. Need to FIX: func.strftime("%Y", Restaurants.Date)
        
    list = []
    for result in results:
        list.append({
            #"Name": result[0],
            "DBA": result[1],
            "Lat": result[11],
            "Lng":result[10],
            "Inspection":result[7],
            "success":result[8],
            "Date": result[6],
            "Year":result[12]
           
        })
    return jsonify(list)
######################################################################
####################FILTER BY INSPECTION DATE#########################
######################################################################

####NOTE: NEED TO FIC THIS TO TAKE IN A DATE VARIABLE

@app.route("/InspectionDate/<year>")
def inspectiondate(year):

    #available columns:  ["id","Name","DBA","identifier","Type","Risk","Street","City",\
    # "State","Zip","Date","Inspection","Success","Description","Lat","Lng"]
    years = db.session.query(Restaurants.Name, Restaurants.DBA, Restaurants.Type, Restaurants.Street, Restaurants.City, \
        Restaurants.State, Restaurants.Date, Restaurants.Inspection, Restaurants.Success, Restaurants.Description, \
            Restaurants.Lat, Restaurants.Lng, Restaurants.Year).filter(Restaurants.Year==year).all()
    list = []
    for result in years:
        list.append({
            "Name": result[0],
            "DBA": result[1],
            "something1": result[3],
            "something1": result[4],
            "something1": result[5],
            "Lat": result[11],
            "type": result[2],
            "Lng":result[10],
            "Inspection":result[7],
            "Success":result[8],
            "Description":result[9],
            "Date": result[6],
            "Year":result[12]


        })
    return jsonify(list)

@app.route("/refreshdb")
def getnewdata():
    refreshdb.refresh()
    return render_template("index.html")

if __name__ == "__main__":
    app.run()