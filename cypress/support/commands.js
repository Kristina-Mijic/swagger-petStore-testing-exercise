/**
 * @method postRequest  Send a post request
 * @param url - endpoint url
 * @param body - json url
 */
Cypress.Commands.add('postRequest', (urlParam, bodyParam) => { 
  return cy.request({
    method: 'POST',
    url: urlParam,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: bodyParam
  })
})

//'postRequest' - ime komande
//Mozemo da napravimo komandu koja salje post requeste,
//mozemo da napravimo komandu koja se specificno bavi slanjem post req.za pet store(sve to zavisi sta zapravo zelimo da radimo u projektu)
//Posto testiramo api, mozemo da napravimo neki generalni req koji mozemo da koristimo i za neke druge endpointe a ne samo za petstore ili pet endpoint,
//sam pet ima vise ovih requestova razlicitih.

//Posto se url menja, njega stavljamo kao parametar, takodje mozemo i ceo body da stavimo kao jedan parametar
// return cy.request...-> hocemo da vratimo response od tog requesta
//sta to znaci, kad pozivemo komandu 'postRequest', rezultat pozivanja te komande bice to da dobijamo taj response koji mozemo da koristimo negde drugde.