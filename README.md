# Growing database for countries

## How to use it as an source

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


## Current Workflow

- Add data files to /filesForData
- run merge.py with `python merge.py`
- Copy new data from the generated temporary file to country_data.json