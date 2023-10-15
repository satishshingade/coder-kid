from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess

from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient

from fastapi.middleware.cors import CORSMiddleware

import json
import os
from bson import json_util


import pymongo


app = FastAPI()

origins = [
    "http://localhost:3000",  # The address of your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: list[str]


class Question(BaseModel):
    id:str
    text:str
    image_link:str
    points:int
    test_cases:list[str]
    answers:list[str]

class AdminDetail(BaseModel):
    username:str
    password:str

class UserDetail(BaseModel):
    username:str
    password:str
    points:int


mongo_connection_string = "mongodb+srv://satman:satman@cluster0.itfu3le.mongodb.net/?retryWrites=true&w=majority"
db_name = "coder_kid"

client = MongoClient(mongo_connection_string)
mongo_db = client[db_name]



@app.post("/AdminEnter")
async def AdminEnter(request:AdminDetail):
    user_collection = mongo_db["admin"]
    existing_user = user_collection.find_one({"username": request.username})
    print(existing_user)
    if existing_user:
        if existing_user["password"]==request.password:
            return {"Admin already exists"}
    
    new_user = {
        "username": request.username,
        "password": request.password,
    }
    inserted = user_collection.insert_one(new_user)
    return {"Admin created successfully"}

@app.post("/updatepoint")
async def UserDetail(request:UserDetail):
    user_collection = mongo_db["users"]
    existing_user = user_collection.find_one({"username": request.username})
    result = user_collection.update_one(
        {"username": request.username},
        {"$set": {"points": existing_user["points"]+request.points}}
    )



@app.post("/UserDetails")
async def UserDetail(request:AdminDetail):
    user_collection = mongo_db["users"]
    existing_user = user_collection.find_one({"username": request.username})
    print(existing_user)
    if existing_user:
        if existing_user["password"]==request.password:
            return json.loads(json_util.dumps(existing_user))
            
    
    else:
        return {"no user found"}

@app.post("/getquestion")
async def UserEnter(text):
    user_collection = mongo_db["Questions"]
    existing_user = user_collection.find_one({"id": text})
    print(existing_user)
    if existing_user:
        return json.loads(json_util.dumps(existing_user))
    else:
        return {"no question found"}

@app.get("/Questions")
async def UserDetail():

    data=[]
    user_collection = mongo_db["Questions"]
    for x in user_collection.find({},{}):
        data.append(x)


    return json.loads(json_util.dumps(data))


@app.post("/UserEnter")
async def UserEnter(request:AdminDetail):
    user_collection = mongo_db["users"]
    existing_user = user_collection.find_one({"username": request.username})
    print(existing_user)
    if existing_user:
        if existing_user["password"]==request.password:
            return {"User already exists"}
    
    new_user = {
        "username": request.username,
        "password": request.password,
        "points":0
    }
    inserted = user_collection.insert_one(new_user)
    return {"User created successfully"}



@app.post("/Question")
async def UploadQuestion(request:Question):
    collection = mongo_db["Questions"]
    item_dict = request.dict()
    inserted = collection.insert_one(item_dict)
    return {"message": "Item uploaded successfully", "inserted_id": str(inserted.inserted_id)}




@app.get("/")
async def root():
   return {"message": "Hello World"}


@app.post("/runtest")
async def runtestcase(request: CodeRequest):
    test_case_input = '\n'.join(request.code)
    print(test_case_input)
    
    try:
        # Run the external executable with input and capture output
        process = subprocess.Popen(["temp.exe"], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        stdout, stderr = process.communicate(input=test_case_input)

        if process.returncode == 0:
            return {stdout}
        else:
            return {stderr}
    except Exception as e:
        return {str(e)}
    



@app.post("/compile")  
async def compile_code(request: CodeRequest):
    cplusplus_code = '\n'.join(request.code)
    print("here i am")  
    print(cplusplus_code)
   
    try:
        # Compile the code
        compile_command = ["g++", "-x", "c++", "-", "-o", "temp"]
        compiled_process = subprocess.Popen(compile_command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        compiled_output, compile_errors = compiled_process.communicate(input=cplusplus_code)

        if compiled_process.returncode != 0:
            return {"bad":compile_errors}

        # Execute the compiled code

        print("bhenchod")
        
        os.remove("./temp")

        execution_command = ["./temp"]
        execution_process = subprocess.Popen(execution_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        # execution_output, execution_errors = execution_process.communicate()
       
        return {"done"}
        # return {"compiled_output": compiled_output, "execution_output": execution_output}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
