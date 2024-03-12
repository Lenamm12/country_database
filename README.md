# Growing database for countries

This Python script merges multiple JSON files containing data for different countries into a single JSON file. It ensures that each country has only one object, handles duplicate attributes by appending a rising number to the attribute name, and writes the merged data to a temporary file.

## Usage

Fetch from https://lenamm12.github.io/country_database/country_data.json

For example like this:

    export default async function getApiData(): Promise<any> {
        try {
            const response = (await fetch("https://lenamm12.github.io/country_database/country_data.json"));
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request with any improvements or additional features.

## Requirements

- Python 3.x
- JSON files containing country data

## Usage for contributing

1. **Clone the Repository:**
2. **Place JSON Files:**
Place the JSON files containing country data in the `filesForData` folder.

3. **Run the Script:**
Run the `merge.py` script:
python merge.py

4. **View Merged Data:**
The merged data will be written to a temporary file, and the path to the file will be printed to the console.

## License

This project is licensed under the [MIT License](LICENSE).
