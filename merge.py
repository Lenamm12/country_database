import json
import os
import tempfile

def merge_json_files(input_folder):
    merged_data = {}

    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.json'):
            file_path = os.path.join(input_folder, filename)
            with open(file_path, 'r') as f:
                data = json.load(f)
                # Extract the data for each country
                for country_data in data:
                    country_name = None
                    if 'name' in country_data:
                        country_name = country_data['name']['common']
                    elif 'country' in country_data:
                        country_name = country_data['country']
                    if country_name:
                        # Merge data for the country
                        if country_name not in merged_data:
                            merged_data[country_name] = {}
                        merge_country_data(merged_data[country_name], country_data)

    return merged_data

def merge_country_data(merged_country_data, new_country_data):
    for key, value in new_country_data.items():
        if key not in merged_country_data:
            # If the key does not exist in the merged data, add it directly
            merged_country_data[key] = value
        elif merged_country_data[key] != value:
            # If the key exists and the value is different, append a rising number to the key
            i = 1
            while f"{key}_{i}" in merged_country_data:
                i += 1
            merged_country_data[f"{key}_{i}"] = value

# Replace 'input_folder' with the path to the folder containing your JSON files
input_folder = 'filesForData'

merged_data = merge_json_files(input_folder)

# Write the merged data to a temporary file
with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
    json.dump(merged_data, temp_file, indent=2)

# Print the path to the temporary file
print(f'Merged data written to temporary file: {temp_file.name}')


