import json
import os
import tempfile

def merge_json_files(input_folder):
    merged_data = []

    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.json'):
            file_path = os.path.join(input_folder, filename)
            with open(file_path, 'r') as f:
                data = json.load(f)
                merged_data.extend(data)

    # Write the merged data to a temporary file
    with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
        temp_file.write(json.dumps(merged_data, indent=2))

    # Print the path to the temporary file
    print(f'Merged data written to temporary file: {temp_file.name}')


# Replace 'input_folder' with the path to the folder containing your JSON files
input_folder = 'filesForData'

merge_json_files(input_folder)
