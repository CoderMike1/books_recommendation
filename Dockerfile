FROM marqoai/marqo:latest


WORKDIR /home/marqo

COPY ./saved_indexes/ /home/marqo/data/

EXPOSE 8882

CMD ["marqo"]