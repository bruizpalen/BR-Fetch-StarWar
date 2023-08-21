import React from "react";
import { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [people, setPeople] = useState([]);
  const [property, setProperty] = useState([]);

  // const getProperties = (index, selectedProperty) => {
  //   fetch(`https://www.swapi.tech/api/people/${index}`)
  //     .then((res) => {
  //       if (!res.ok) throw Error(res.statusText);
  //       return res.json();
  //     })
  //     .then((prop) => prop.result.properties[selectedProperty]) // -- ?? setProperty(prop.result.properties[selectedProperty])
  //     .catch((error) => console.log("error", error));
  // };

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((response) => {
        setPeople(response.results);

        const listPromises = response.results.map((person) => {
          return fetch(`https://www.swapi.tech/api/people/${person.uid}`)
            .then((res) => {
              if (!res.ok) throw Error(res.statusText);
              return res.json();
            })
            .then((prop) => {
              console.log(prop);
              return prop.result.properties;
            })
            .catch((error) => console.log("error", error));
        });
        return Promise.all(listPromises)
      })
	  .then((listPro) => console.log(listPro))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <ul>
        {people.map((element) => (
          <li key={element.uid}>{element.name}</li>
        ))}
      </ul>
      {/* <ul>
        {property.map((proper, index) => (
          <li key={index}>{proper}</li>
        ))}
      </ul> */}
    </div>
  );
};
export default Home;

{
  /* <p>
              {getProperties(element.uid, "eye_color")
                .then((propertyEye) => propertyEye)
                .catch((error) => console.log("error", error))}
            </p> */
}
{
  /* {console.log(typeof getProperties(element.uid, "eye_color"))} */
}
