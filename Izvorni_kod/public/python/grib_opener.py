import pygrib, json, sys, os

datetime = sys.argv[1]

directory = "public/python/Grib_files"
for root, dirs, files in os.walk(directory):
    for file in files:
        if datetime in file:
            filepath = os.path.join(root, file)

file = pygrib.open(filepath)
file.seek(0)

lats, lons = file[1].latlons()
data = file[1].values
counter = {}
for i in range(len(data)):
	for j in range(len(data[i])):
		if lats[i][j] > -90 and lats[i][j] < 90 and data[i][j] < 3:
			lat = round(lats[i][j] * 3) / 3
			lon = round(lons[i][j] * 3) / 3
			if str(lat) + "," + str(lon) not in counter:
				counter[str(lat) + "," + str(lon)] = {}
			value = round(data[i][j])
			if value not in counter[str(lat) + "," + str(lon)]:
				counter[str(lat) + "," + str(lon)][value] = 0
			else:
				counter[str(lat) + "," + str(lon)][value] += 1
data = []
for key, d in counter.items():
	value = max(d, key=d.get)
	if value == 2:
		lat, lon = key.split(",")
		lat, lon = float(lat), float(lon)
		data_entry = {}
		data_entry["Latitude"] = lat
		data_entry["Longitude"] = lon
		data.append(data_entry)
with open("public/python/Json_files/" + datetime + ".json", "w") as f:
	json.dump(data, f)

print("Script finished!")
exit(0)