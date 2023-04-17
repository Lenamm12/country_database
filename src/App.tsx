
import { useEffect, useState } from 'react';
import './style.css';

export interface UserData {firstName : string, lastName : string, email : string,  registeredAt: Date, phoneNumber : string, jobTitle : string, numberOfClients: Number, newsletterRegistration : Boolean}



function App() {

  const [data, setData] = useState<UserData[]>();
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })



  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:3003/users"
      );
      const parsed = await response.json();
      setData(parsed);
    })();
  }, []);

 // console.log(JSON.stringify(data, null, 2));

  if(data == undefined){
    return <div>No data</div>
  }


   const theadData : string[] =  Object.keys(data![0]).filter((datarow) => datarow != "jobType").filter((datarow)=> {return (datarow == "true") ? 'yes' : 'no' });
   const tbodyData : UserData[] = Object.values(data!);
 

  return (
    <div className="App">
      <h1>HR Frontend</h1>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre> */}
       <table>
            <thead>
                <tr>
                  {theadData.map((heading:string) => {
                       return <th key={heading}>{heading.toUpperCase()}</th>
                  })}
              </tr>
            </thead>
            <tbody>
            {tbodyData.map((row :any, index: number) => {
                return <tr key={row}>
                  {theadData.map((key: any, index: number) => {
                    if (key == "avatar") {
                      return <td key={key+index}><img src={row[key]}></img></td>;
                    }
                    else if (key == "phoneNumber") {
                      return <td key={key+index}><input type={'number'} contentEditable placeholder={row[key]}></input></td>;
                    }
                    else if(key == "newsletterRegistration"){
                      return <td key={key+index}>{tbodyData[index].newsletterRegistration? "yes" : "no"}</td>
                    }
                    return <td key={key+index}>{row[key]}</td>;
                    
                  })}
                </tr>
            })}
            </tbody>
        </table>
    </div>
  );
}

export default App;
