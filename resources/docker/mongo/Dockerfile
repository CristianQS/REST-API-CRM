FROM mongo

COPY seed.json /seed.json
CMD mongoimport --host db --db api --collection users --type json --file /seed.json --jsonArray