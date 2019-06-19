import pandas as pd
import requests
import pymongo
from sqlalchemy import create_engine
import os


def refresh():
    location=str(os.getcwd())
    file="ChicagoRestaurants.sqlite"
    folder = "db"
    new = f'{location}\{folder}\{file}'
    if os.path.exists(new):
        os.remove(new)
        print("removed")
    else:
        print("The file does not exist")    

    url = 'https://data.cityofchicago.org/api/views/5udb-dr6f/rows.json?accessType=DOWNLOAD'
    r= requests.get(url).json()

    df = pd.DataFrame(r['data'])
    #df = df.drop(df.columns[[0, 1, 2, 3, 5, 7]], axis=1, inplace=False)
    df = df.drop(df.columns[[0, 1, 2, 3, 5, 7,23,24,25,26,27,28]], axis=1, inplace=False)
    df =df.dropna(axis=1, how='all', thresh=None, subset=None, inplace=False)
    df.rename(columns={8:'Name',9:'DBA',10:'identifier', 11:'Type',12:'Risk', 13:'Street',14:'City', 15:'State', 16:'Zip', 17:'Date',18:'Inspection',19:'Success',20:'Description', 21:'lat', 22:'lng'}, inplace=True)
    df['Date'] = pd.to_datetime(df['Date']).apply(lambda x:x.strftime('%m/%d/%Y'))
    df['Year'] = pd.to_datetime(df['Date']).apply(lambda x:x.strftime('%Y'))
    df = df[df.Year != '2011']
    df = df[df.Year != '2012']
    df = df[df.Year != '2013']
    df = df[df.Year != '2014']
    df = df[df.Year != '2015']

    
    df.head(5)

    #sqlite
    connection_string = "sqlite:///db/ChicagoRestaurants.sqlite"
    engine = create_engine(connection_string)
    #list tables names- if you want
    #engine.table_names()

    ####Create the database to match our columns in our dataframe####
    #Name	DBA	ID	Type	Risk	Street	City	State	Zip	Date	Inspection	Success	Description	lat	lng


    ##############IMPORTANT###############################
    ########### hash out this after creating as it will give an error stating the DB already exists after running the first time ####
    ####apparently the line below is not needed to create the sql lite.. if unhash it creates another table in the db
    engine.execute("CREATE TABLE RestaurantData(id INT PRIMARY KEY, Name TEXT, DBA TEXT, identifier TEXT, Type TEXT, Risk TEXT, Street TEXT, City TEXT, State TEXT, Zip TEXT, Date TEXT, Inspection TEXT, Success TEXT, Description TEXT, Lat Int, Lng Int, Year TEXT);")
#engine.execute("CREATE TABLE RestaurantData(Name TEXT, DBA TEXT, identifier TEXT, Type TEXT, Risk TEXT, Street TEXT, City TEXT, State TEXT, Zip TEXT, Date TEXT, Inspection TEXT, Success TEXT, Description TEXT, Lat Int, Lng Int);")

################################################################################################################

####### PLUG that data into SQLITE#####
    df.to_sql(name="RestaurantData", con=engine, if_exists="append", index=False)
#####SHOW ME THE MONEY#####
    pd.read_sql_query("SELECT * FROM RestaurantData",con=engine).head()

refresh()
