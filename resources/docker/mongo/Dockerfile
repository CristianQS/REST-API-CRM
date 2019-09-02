FROM mongo

COPY usersSeed.json /usersSeed.json
COPY customersSeed.json /customerSeed.json
CMD mongoimport --host db --db api --collection users --type json --file /usersSeed.json --jsonArray ; mongoimport --host db --db api --collection customers --type json --file /customerSeed.json --jsonArray