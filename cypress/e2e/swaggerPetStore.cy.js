import petBody from '../fixtures/petBody.json';
import {petBodyTestData} from '../fixtures/petBodyTestData.json';
// import petBodyTestData2 from '../fixtures/petBodyTestData2.json';
const petBodyTestData2 = require('../fixtures/petBodyTestData2.json').postPetTests
import api from '../fixtures/endpoints.json';
const url = Cypress.env('url'); 

describe('POST request PetStore', () => {

  xit('Post request - Create Pet with valid name', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: {
        "id": 1234,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "Beny",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
    }).then(response => {
      expect(response.status).eq(200)
      expect(response.body.id).eq(1234)
      expect(response.body.name).eq("Beny")
      // console.log(response.body)
    })
  })
  xit('Post request - Create Pet with empty name', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: {
        "id": 1234,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
    }).then(response => {
      expect(response.status).eq(200)
      expect(response.body.errorMessage).eq("Name is required")
    })
  })

  //Novi optimizovaniji test1
  xit('Post request - Create Pet optimization1', () => {
    cy.postRequest(url+api.pet.postPet, petBody ).then(response => {
      expect(response.status).eq(200)
      expect(response.body.id).eq(1234)
      expect(response.body.name).eq("Beny")
    })
  })

  //Novi optimizovaniji test2
  xit('Post request - Create Pet optimization2', () => {
    petBody.id = '12345';
    cy.postRequest(url+api.pet.postPet, petBody ).then(response => {
      expect(response.status).eq(200)
      expect(response.body.id).eq(12345)
      expect(response.body.name).eq("Beny")
    })
  })


  //Primer gde koristimo i komande i env.variable ali i nacin da loop-ujemo:
  petBodyTestData.forEach((petBodyDataObject) => {
    xit('Post request - Create Pet different ID, forEach', () => {
      cy.postRequest(url+api.pet.postPet, petBodyDataObject )
        .then(response => {
          expect(response.status).eq(200)
          expect(response.body.id).eq(petBodyDataObject.id)
          expect(response.body.name).eq(petBodyDataObject.name)
      })
    })
  })



  Object.entries(petBodyTestData2).forEach(([key, bodyDataValue2]) => {
    it(key + 'Post request - Create Pet', () => {
      cy.postRequest(url+api.pet.postPet, bodyDataValue2 )
        .then(response => {
          expect(response.status).eq(200)
          expect(response.body.id).eq(bodyDataValue2.id)
          expect(response.body.name).eq(bodyDataValue2.name)
        })
    })
  })  

})





//Nacin kako mozemo da optimizujemo stvari kako ih ne bismo stalno kopirali iznova i iznova.
//Jedna stvar koju mozemo da optimizujemo je da mozemo da napravimo komandu za "cy.request, method, url, header"
//Udjemo u folder support -> commands.js
// -> // -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//cy.postRequest - pozivamo ime komande
//mozemo da napravimo novi file u fixtures folderu (petBody.json)
//kad koristimo fixtures stvari,moramo da importujemo --> import petBody from '../fixtures/petBody.json';


// //Novi optimizovaniji test2 --> mozemo da saljemo isti endpoint, ali mozda zelimo drugi petBody u potpunosti ili samo hocemo da izmenimo neki deo body-a,
//ako nas zanima samo da promenimo npr id ili name, mozemo pre nego sto uradimo cy.postRequest, da pristupimo petBody i da izmenimo neki podatak

//Takodje mozemo jos vise da uprostimo stvari nego sto su ova dva testa koja smo napisali 'optimization1/2':
  //-Hocemo da se postaramo da ovaj nas tes moze da radi na razlicitim envirment, jedina stvar koja je potrebna je da ne saljemo ceo url, vec samo deo za endpoint
  //-mozemo da posaljemo direktno u package.json iz komande iz koje ranujemo testove.
  //-dodavanjem --env (je neka komanda, ona omogucava da podesimo vrednost neke promenljive.) !!
  //-const url = Cyppres.env('url');  -> ovo uzimamo iz package.json file-a !!
  //-i kasnije ga samo spojimo sa (url+api)

//Sledeca stvar je da ne copy-paste testove, vec da ponavljamo test iznova i iznova.
//Kada importujemo niz objekata moramo da stavimo u viticaste zagrade {}


//ForEach() !!!
  //- forEach(to je ime koje mi dajemo promenljivoj)
  //promenljiva ce biti zapravio ceo jedan objekat (zato ga nazivamo petBody)
  //Za svaki (petBodyDataObject) unutar petBodyTestData hocu da uradim nesto
  //Kada smo stavili it() u forEach, on ce samo da ponovi onoliko puta koliko imamo body-a
  //Ono sto treba da uradimo je da zamenimo petBody koji saljemo
  //trenutno saljemo petBody koji smo procitali iz petBody.json file-a
  //Mi cemo staviti umesto petBody -> petBodyDataObject
  //Zatim moramo da proverimo sta ocekujemo u testu


//Test petBodyTestData2:
  //-umesto niza[ {..} ] pravimo objekat { {..} }
  //Dodali smo key TC001 - test case 001
  //Zatim moramo da importujemo
  //na pocetku it() stavljamo "value + .." - koja god bude bila vrednost tog imena pa + ovo ime, (pisace TC001 + pa ime testa)
  // Object.entries(petBodyTestData2).forEach(([key, bodyDataValue2])---> Prvi param bi trebao da bude KEY (TC001/2/3) , a drugi param, jeste vrednost tog KEY-a
