import marqo


#function that get recommendations from marqo database
def getRecommendations(input_string):
    mq = marqo.Client("http://localhost:8882")
    results = mq.index("books_index").search(q=input_string,searchable_attributes=["title", "authors", "categories", "description"])

    output_results = []

    for res in results['hits']:
        title = res['title']
        try:
            author = res['authors']
        except:
            author = ""
        try:
            category = res['categories']
        except:
            category = ""
        try:
            description = res['description']
        except:
            description = ""
        try:
            image =res['image']
        except:
            image = ""
        score = res['_score']

        output_results.append({
            "title":title,
            "author":author,
            "category":category,
            "description":description,
            "image":image,
            "score":score
        })

    return output_results


