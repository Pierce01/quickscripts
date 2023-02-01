const cmsURL = "https://cms.seattleu.edu/terminalfour" // Replace with your terminal4 cms url

const columnNames = ["Username", "Name", "Email", "\"User Type\"", "ID"]
const userTypes = {
    0: "Administrator",
    40: "Power User",
    1: "Moderator",
    2: "Contributor",
    50: "Visitor",
    100: "All Users"
}
const csvResult = [columnNames.join(",")];
(await (await fetch(cmsURL + "/rs/userSearch?authLevel=100&allUsers=true", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer " + JSON.parse(window.sessionStorage.__oauth2).accessToken,
  },
  "method": "GET"
})).json()).userList.forEach(async element => {
    csvResult.push(`${element.username},"${element.firstName} ${element.lastName}","${element.emailAddress}",${element.id},${userTypes[element.authLevel] || element.authLevel}`)
})
console.log(csvResult.join('\n'))