from django.shortcuts import render
from datetime import datetime, timedelta
from django.http import HttpResponse
from rest_framework.response import Response
from .models import Books
from .serializer import LeadSerializer
from rest_framework.decorators import api_view

import gzip
import json
import pandas as pd
import numpy as np
import re
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

vectorizer = TfidfVectorizer()

def parse_fields(line):
    data = json.loads(line)
    return {
        "book_id":data["book_id"],
        "title":data["title_without_series"],
        "ratings":data["ratings_count"],
        "url":data["url"],
        "cover_image":data["image_url"]
    }

books_titles = []
books_json = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Data\goodreads_books.json.gz')

with gzip.open(books_json, 'r') as f:
    i = 10000
    while (i):
        line = f.readline()
        if not line:
            break
        fields = parse_fields(line)

        try:
            ratings = int(fields["ratings"])
        except ValueError:
            continue

        if(ratings > 15) :
            books_titles.append(fields)
    i = i - 1
titles = pd.DataFrame.from_dict(books_titles)
titles["ratings"] = pd.to_numeric(titles["ratings"])
titles["mod_title"] = titles["title"].str.replace("[^a-zA-Z0-9 ]", "", regex=True)
titles["mod_title"] = titles["mod_title"].str.lower()
titles["mod_title"] = titles["mod_title"].str.replace("\s+", " ", regex=True)
titles = titles[titles["mod_title"].str.len() > 0]
#titles.to_json("books_titles.json")

tfidf = vectorizer.fit_transform(titles["mod_title"])

"""
csv_book_mapping = {}

with open("Data\\book_id_map.csv", 'r') as f:
    while True :
        line = f.readline()
        if not line:
            break
        csv_id, book_id = line.strip().split(",")
        csv_book_mapping[csv_id] = book_id

def rec_books (liked_books) :
    overlap_users = set()

    with open("Data\goodreads_interactions.csv", 'r') as f:
        i = 1000000
        while (i):
            line = f.readline()

            if not line:
                break

            user_id, csv_id, _, rating, _ = line.split(",")

            if user_id in overlap_users :
                continue

            try :
                rating = int(rating)
            except ValueError :
                 continue

            book_id = csv_book_mapping[csv_id]

            if book_id in liked_books and rating >= 4 :
                overlap_users.add(user_id)
        
            i = i - 1

    rec_lines = []

    with open("Data\goodreads_interactions.csv", 'r') as f:
        i = 1000000
        while (i):
            line = f.readline()

            if not line:
                break

            user_id, csv_id, _, rating, _ = line.split(",")

            if user_id in overlap_users :
                book_id = csv_book_mapping[csv_id]
                rec_lines.append([user_id, book_id, rating])
        
            i = i - 1

    recs = pd.DataFrame(rec_lines, columns=["user_id", "book_id", "rating"])
    recs["book_id"] = recs["book_id"].astype(str)

    top_recs = recs["book_id"].value_counts().head(10)
    top_recs = top_recs.index.values

    books_titles = pd.read_json("books_titles.json")
    books_titles["book_id"] = books_titles["book_id"].astype(str)
    books_titles[books_titles["book_id"].isin(top_recs)]  


    all_recs = recs["book_id"].value_counts()
    all_recs = all_recs.to_frame().reset_index()
    all_recs.columns = ["book_id", "book_count"]
    all_recs = all_recs.merge(books_titles, how="inner", on="book_id")
    all_recs["score"] = all_recs["book_count"] * (all_recs["book_count"] / all_recs["ratings"])
    all_recs.sort_values("score", ascending=False).head(10)
    popular_recs = all_recs[all_recs["book_count"] > 10].sort_values("score", ascending=False)
    print(popular_recs[~popular_recs["book_id"].isin(liked_books)].head(10))

my_books = ["4408", "3114", "2998", "9401", "8153", "204949"]
#my_books = ["4408", "31147619", "29983711", "9401317", "8153988", "20494944"]
rec_books(my_books)

"""
def set_cookies(request):
    response = HttpResponse("<h1>success</h1>")
    response.set_cookie('key', 'value', expires=datetime.utcnow()+timedelta(days=5))
    return response

@api_view()
def search_book (request, query='') :
        Books.objects.all().delete()
        processed = re.sub("[^a-zA-Z0-9 ]", "", query.lower())
        query_vec = vectorizer.transform([processed])
        similarity = cosine_similarity(query_vec, tfidf).flatten()
        indices = np.argpartition(similarity, -10)[-12:]
        results = titles.iloc[indices]
        results = results.sort_values("ratings", ascending=False)
        set_cookies(request)
        value = request.COOKIES.get('key')
        i = 0
        while(i < 12) :
            book_id = (results.iloc[i]['book_id'])
            title = (results.iloc[i]['title'])
            url = (results.iloc[i]['url'])
            cover_image = (results.iloc[i]['cover_image'])
            i = i + 1
            Books(id=i,title=title, book_id=book_id, url=url, cover_image=cover_image).save()
        books = Books.objects.all()
        serializer = LeadSerializer(books, many=True)
        return Response(serializer.data, template_name=None)
    
        

