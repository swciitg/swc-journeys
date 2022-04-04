import requests
from bs4 import BeautifulSoup
import re
import json
API_KEY = "KvFpSUoY5wKQr9S2HZ1HKGGfK1sDEqIQ"
API_KEY2 = "f8e6fd8e886541e783d160dc60faf44e"

header_content = {'Content-Type': 'text/raw',
'x-ag-access-token': API_KEY,
'outputFormat': 'application/json'}

def tag_content(content_string):
    tags_list = []
    content_string = content_string.encode('utf-8')
    response = requests.post('https://api-eit.refinitiv.com/permid/calais', headers=header_content, data=content_string)
    jsonResponse = response.json()
    print(jsonResponse)
    for obj in jsonResponse:
         try:
             tags_list += [jsonResponse[obj]['name']]
         except:
             tags_list += []
    return tags_list


class scraper:
    def __init__(self, URL):
        self.URL = URL
        self.page = requests.get(URL)
        self.soup = BeautifulSoup(self.page.content,'html.parser')
        #print("Page Recieved")
        try:
            self.title = self.soup.find('head').find('title').text
        except:
            self.title = re.findall('://www.([\w\-\.]+)', URL)
        self.imgscr = "https://swc.iitg.ac.in/stud/gymkhana/static/Home/swc-logo.svg"
        try:   
            self.imgsrc = self.soup.find('img')['src']
            if(self.imgsrc[0]!='h'):
                self.imgsrc = self.URL + self.imgsrc
        except:
            self.imgsrc = "https://swc.iitg.ac.in/stud/gymkhana/static/Home/swc-logo.svg"
        self.description = ""
        for meta in self.soup.find('head').find_all('meta'):
            try:
                if meta['name'] == 'description':
                    self.description = meta['content']
            except:
                self.description = ""
        for para in self.soup.find_all('p'):
            if(len(self.description)>500):
                break
            self.description += para.text
        self.description = re.sub(' +', ' ', self.description)
        self.description = self.description.replace("\n", "")
        print("Trying to tag content")
        self.tags = tag_content(self.description)
        print(self.tags)
        if(len(self.description)>500):
            self.description = self.description[0:499]
    def __str__(self):
        return "Title: " + self.title + "\nDescription: " + self.description + "\nimage: " + self.imgsrc


